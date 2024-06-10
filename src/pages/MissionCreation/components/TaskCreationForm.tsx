import { Button, Form, Input, Select } from "antd";
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
      <h4 className="text-base text-black font-bold mb-1">Name</h4>
      <Form.Item
        name="name"
        rules={[
          {
            required: true,
            message: "Please input task name",
          },
        ]}
      >
        <Input placeholder="What do you want users to do?" />
      </Form.Item>
      <h4 className="text-base text-black font-bold my-1">Type</h4>
      <Form.Item
        name="type"
        rules={[
          {
            required: true,
            message: "Please select task type",
          },
        ]}
      >
        <Select
          labelInValue
          className="w-full"
          placeholder="Select task type"
          options={[
            {
              value: "Discord",
              label: "Discord",
            },
            {
              value: "X",
              label: "X",
            },
          ]}
        />
      </Form.Item>
      <h4 className="text-base text-black font-bold my-1">Action link</h4>
      <Form.Item
        name="action"
        rules={[
          {
            required: true,
            message: "Please input action link",
          },
        ]}
      >
        <Input placeholder="Where can the user perform this task?" />
      </Form.Item>
      <h4 className="text-base text-black font-bold my-1">Description</h4>
      <Form.Item name="description">
        <Input.TextArea placeholder="How to complete the task?" rows={10} />
      </Form.Item>
      <div className="flex justify-end">
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
