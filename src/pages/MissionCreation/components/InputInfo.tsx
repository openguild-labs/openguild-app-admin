import { DatePicker, Form, Input } from "antd";

const { RangePicker } = DatePicker;

function InputInfo() {
  return (
    <div>
      <div className="flex items-start">
        <h3 className="text-base xl:text-lg font-bold my-1 w-1/4">Mission title</h3>
        <Form.Item
          name="title"
          rules={[
            {
              required: true,
              message: "Mission title is required",
            },
          ]}
          className="w-3/4"
        >
          <Input placeholder="Input mission title" className="text-sm xl:text-base" />
        </Form.Item>
      </div>
      <div className="flex mt-4 items-start">
        <h3 className="text-base xl:text-lg font-bold my-1 w-1/4">Duration</h3>
        <Form.Item
          name="duration"
          rules={[
            {
              required: true,
              message: "Mission duration is required",
            },
          ]}
          className="w-3/4"
        >
          <RangePicker className="w-full text-sm xl:text-base" />
        </Form.Item>
      </div>
      <div className="flex mt-4 items-start">
        <h3 className="text-base xl:text-lg font-bold my-1 w-1/4">Mission description</h3>
        <Form.Item
          name="description"
          rules={[
            {
              required: true,
              message: "Mission description is required",
            },
          ]}
          className="w-3/4"
        >
          <Input.TextArea placeholder="Describe the mission here" rows={14} className="text-sm xl:text-base" />
        </Form.Item>
      </div>
    </div>
  );
}

export default InputInfo;
