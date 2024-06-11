import { Button, Drawer, Form, FormInstance, Input } from "antd";
import { useEffect, useState } from "react";
import { GoPlusCircle } from "react-icons/go";
import TaskCreationForm from "./TaskCreationForm";

import TaskItem from "./TaskItem";

interface ICreateTaskProps {
  form: FormInstance;
}

function CreateTask({ form }: ICreateTaskProps) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [tasks, setTasks] = useState<TTask[]>([]);
  const [editTask, setEditTask] = useState<{ index: number; task: TTask | undefined }>({ index: -1, task: undefined });

  useEffect(() => {
    const formTasks = form.getFieldValue("tasks") as TTask[] | undefined;
    if (formTasks !== undefined && formTasks.length > 0) {
      setTasks(formTasks);
    }
  }, [form]);

  const updateTasks = (newTasks: TTask[]) => {
    setTasks(newTasks);
    form.setFieldsValue({
      tasks: newTasks,
    });
  };

  return (
    <div className="w-full h-full">
      <div
        className="w-full overflow-hidden"
        style={{
          marginBottom: tasks.length > 0 ? "1rem" : "0",
        }}
      >
        {tasks.map((task, index) => {
          return (
            <TaskItem
              key={index}
              taskName={task.name}
              onDelete={() => {
                const newTasks = tasks.filter((_, i) => i !== index);
                updateTasks(newTasks);
              }}
              onClick={() => {
                setEditTask({
                  index,
                  task,
                });
                setOpenDrawer(true);
              }}
            />
          );
        })}
      </div>
      <Button
        type="dashed"
        block
        icon={<GoPlusCircle />}
        onClick={() => {
          setOpenDrawer(true);
        }}
        className="w-full"
      >
        Add task
      </Button>
      <Form.Item
        name="tasks"
        rules={[
          {
            required: true,
            message: "Mission must have at least one task",
          },
        ]}
        className="form-item-hidden"
      >
        <Input type="hidden" />
      </Form.Item>
      <Drawer
        title="Task creation form"
        placement="right"
        open={openDrawer}
        onClose={() => {
          setEditTask({ index: -1, task: undefined });
          setOpenDrawer(false);
        }}
        width={500}
      >
        <TaskCreationForm
          onFinish={(value) => {
            if (editTask.index !== -1) {
              const newTasks = tasks.map((task, index) => {
                if (index === editTask.index) {
                  return value;
                }
                return task;
              });
              updateTasks(newTasks);
              setEditTask({ index: -1, task: undefined });
            } else {
              updateTasks([...tasks, value]);
            }
            setOpenDrawer(false);
          }}
          editTask={editTask.task}
        />
      </Drawer>
    </div>
  );
}

export default CreateTask;