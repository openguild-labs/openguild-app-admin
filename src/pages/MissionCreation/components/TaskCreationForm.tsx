import TaskFormItems from "@/components/TaskFormItems";
import { Button, Form } from "antd";
import { useEffect } from "react";

interface ITaskCreationFormProps {
  onFinish: (values: TTask) => void;
  editTask?: TTask;
}

function TaskCreationForm({ onFinish, editTask }: ITaskCreationFormProps) {
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
    } else {
      form.resetFields();
    }
  }, [form, editTask]);

  return (
    <Form
      name="task_creation"
      form={form}
      onFinish={(values) => {
        onFinish({
          ...values,
          type: values.type.value,
        });
        form.resetFields();
      }}
    >
      <TaskFormItems />
      <div className="flex justify-end mt-4">
        <Form.Item>
          <Button type="primary" htmlType="submit" className="mt-2">
            {editTask !== undefined ? "Change" : "Create"}
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
}

export default TaskCreationForm;
