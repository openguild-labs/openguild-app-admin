import { Button, Drawer, Form, Popconfirm } from "antd";
import TaskItem from "./TaskItem";
import { useEffect, useState } from "react";
import TaskFormItems from "@/components/TaskFormItems";
import { useDeleteTask, useUpdateTask } from "@/supabase/api/mission/services";
import { useAppDispatch } from "@/redux/reduxHooks";
import { resetIntentLinkState, setParamsValue, setType } from "@/redux/slides/intentLinkParams";
import { isIntentLink, parseIntentLink } from "@/utils/common";
import { socialMedia } from "@/constants/socialMedia";

interface ITaskListProps {
  tasks: TTaskModel[];
  refetch: () => void;
}

function TaskList({ tasks, refetch }: ITaskListProps) {
  const { mutate: editTaskMutate, isPending: isPendingEditTask } = useUpdateTask();
  const { mutate: deleteTaskMutate, isPending: isPendingDeleteTask } = useDeleteTask();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [editTask, setEditTask] = useState<TTaskModel>();
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
    <div className="flex flex-col gap-y-4 p-2">
      {tasks.map((task) => {
        return (
          <TaskItem
            key={task.id}
            title={task.name}
            description={task.description}
            onClickMenu={() => {
              setEditTask(task);
              setOpenDrawer(true);
            }}
          />
        );
      })}
      <Drawer
        title="Task Information"
        placement="right"
        open={openDrawer}
        onClose={() => {
          setEditTask(undefined);
          setOpenDrawer(false);
          form.resetFields();
          dispatch(resetIntentLinkState());
        }}
        width={500}
      >
        {openDrawer && (
          <Form form={form} name="mission_editing">
            <TaskFormItems form={form} isTwitter={isTwitter} isManual={isManual} />
            <div className="flex justify-end gap-x-3 mt-4">
              <Popconfirm
                title="Delete the task"
                description="Are you sure to delete this task?"
                onConfirm={() => {
                  if (editTask === undefined) {
                    return;
                  }
                  deleteTaskMutate(editTask.id, {
                    onSuccess,
                  });
                }}
                okText="Yes"
                cancelText="No"
              >
                <Button danger htmlType="submit" className="mt-2" loading={isPendingDeleteTask}>
                  Remove
                </Button>
              </Popconfirm>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="mt-2"
                  loading={isPendingEditTask}
                  onClick={() => {
                    form.validateFields().then((values) => {
                      editTaskMutate(
                        { ...editTask, ...values, type: values.type.value },
                        {
                          onSuccess,
                        }
                      );
                    });
                  }}
                >
                  Save
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
