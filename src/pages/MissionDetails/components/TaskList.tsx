import { Button, Drawer, Form, Popconfirm } from "antd";
import TaskItem from "./TaskItem";
import { useEffect, useState } from "react";
import TaskFormItems from "@/components/TaskFormItems";
import { useCreateTask, useDeleteTask, useUpdateTask } from "@/supabase/api/mission/services";
import { useAppDispatch } from "@/redux/reduxHooks";
import { resetIntentLinkState, setParamsValue, setType } from "@/redux/slides/intentLinkParams";
import { isIntentLink, parseIntentLink } from "@/utils/common";
import { socialMedia } from "@/constants/socialMedia";
import { GoPlusCircle } from "react-icons/go";
import { useParams } from "react-router-dom";

interface ITaskListProps {
  tasks: TTaskModel[];
  refetch: () => void;
}

function TaskList({ tasks, refetch }: ITaskListProps) {
  const { id } = useParams<{ id: string }>();
  const { mutate: editTaskMutate, isPending: isPendingEditTask } = useUpdateTask();
  const { mutate: deleteTaskMutate, isPending: isPendingDeleteTask } = useDeleteTask();
  const { mutate: createTaskMutate, isPending: isPendingCreateTask } = useCreateTask(id as string);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [editTask, setEditTask] = useState<TTaskModel>();
  const [addNewTask, setAddNewTask] = useState(false);

  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const isTwitter = editTask !== undefined && editTask.type === socialMedia.twitter;
  const isManual = isTwitter && !isIntentLink(editTask.action);

  useEffect(() => {
    if (editTask !== undefined) {
      if (editTask.type === socialMedia.twitter) {
        if (!isManual) {
          const { type, params } = parseIntentLink(editTask.action);
          dispatch(setType(type));
          dispatch(setParamsValue(params));
        }
      }

      form.setFieldsValue({
        name: editTask.name,
        type: {
          value: editTask.type,
          label: editTask.type,
        },
        action: editTask.action,
        description: editTask.description,
        xp: editTask.xp,
        button_placeholder: editTask.button_placeholder,
      });
    }
  }, [form, editTask, isManual, dispatch]);

  const onSuccess = () => {
    refetch();
    setOpenDrawer(false);
    setEditTask(undefined);
    form.resetFields();
    dispatch(resetIntentLinkState());
  };

  return (
    <div className="flex flex-col gap-y-4">
      {tasks.map((task) => {
        return (
          <TaskItem
            key={task.id}
            title={task.name}
            description={task.description}
            onClickMenu={() => {
              setEditTask(task);
              setOpenDrawer(true);
              setAddNewTask(false);
            }}
          />
        );
      })}
      <Button
        type="dashed"
        block
        icon={<GoPlusCircle />}
        onClick={() => {
          setOpenDrawer(true);
          setAddNewTask(true);
        }}
        className="transition-effect w-full text-sm xl:text-base h-12"
      >
        Add task
      </Button>
      <Drawer
        title={<span className="text-base xl:text-lg">{addNewTask ? "Task creation form" : "Task Information"}</span>}
        placement="right"
        open={openDrawer}
        onClose={() => {
          setEditTask(undefined);
          setOpenDrawer(false);
          setAddNewTask(false);
          form.resetFields();
          dispatch(resetIntentLinkState());
        }}
        width={500}
      >
        {openDrawer && (
          <Form form={form} name="mission_editing">
            <TaskFormItems form={form} taskType={editTask?.type} isManual={isManual} />
            <div className="flex justify-end gap-x-3 mt-4">
              {!addNewTask && (
                <Popconfirm
                  title={<span className="text-xs xl:text-sm">Delete the task</span>}
                  description={<span className="text-xs xl:text-sm">Are you sure to delete this task?</span>}
                  onConfirm={() => {
                    if (editTask === undefined) {
                      return;
                    }
                    deleteTaskMutate(editTask.id, {
                      onSuccess,
                    });
                  }}
                  okText={<span className="text-xs xl:text-sm">Yes</span>}
                  cancelText={<span className="text-xs xl:text-sm">No</span>}
                >
                  <Button danger htmlType="submit" className="mt-2 text-sm xl:text-base" loading={isPendingDeleteTask}>
                    Remove
                  </Button>
                </Popconfirm>
              )}
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="mt-2 text-sm xl:text-base"
                  loading={isPendingEditTask || isPendingCreateTask}
                  onClick={() => {
                    if (!addNewTask && editTask !== undefined) {
                      form.validateFields().then((values) => {
                        editTaskMutate(
                          { ...editTask, ...values, type: values.type.value },
                          {
                            onSuccess,
                          }
                        );
                      });
                    }

                    if (addNewTask) {
                      form.validateFields().then((values) => {
                        createTaskMutate(
                          {
                            ...values,
                            type: values.type.value,
                          },
                          {
                            onSuccess,
                          }
                        );
                      });
                    }
                  }}
                >
                  {!addNewTask ? "Save" : "Create"}
                </Button>
              </Form.Item>
            </div>
          </Form>
        )}
      </Drawer>
    </div>
  );
}

export default TaskList;
