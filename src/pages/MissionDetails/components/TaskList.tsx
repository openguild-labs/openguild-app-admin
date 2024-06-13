import { Button, Drawer, Form, Popconfirm } from "antd";
import TaskItem from "./TaskItem";
import { useEffect, useState } from "react";
import TaskFormItems from "@/components/TaskFormItems";
import { useDeleteTask, useUpdateTask } from "@/supabase/api/mission/services";

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

  useEffect(() => {
    if (editTask !== undefined) {
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
  }, [form, editTask]);

  const onSuccess = () => {
    refetch();
    setOpenDrawer(false);
    setEditTask(undefined);
  };

  return (
    <Form form={form} name="mission_editing" className="flex flex-col gap-y-4 p-2">
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
        }}
        width={500}
      >
        <TaskFormItems />
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
      </Drawer>
    </Form>
  );
}

export default TaskList;
