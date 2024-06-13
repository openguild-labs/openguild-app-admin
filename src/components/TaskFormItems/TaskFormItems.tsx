import { Form, Input, Select } from "antd";

function TaskFormItems() {
  return (
    <>
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
    </>
  );
}

export default TaskFormItems;
