import TipTap from "@/components/TipTap";
import { MISSIONS_CATEGORIES_PATH } from "@/constants/links";
import { useListAllMissionCategories } from "@/supabase/api/missionCategory/service";
import { Button, DatePicker, Empty, Form, FormInstance, Input, Select } from "antd";
import { useEffect, useState } from "react";
const { RangePicker } = DatePicker;

interface IInputInfoProps {
  form: FormInstance;
}

function InputInfo({ form }: IInputInfoProps) {
  const { data } = useListAllMissionCategories();
  const options = data !== undefined ? data.map((category) => ({ label: category.name, value: category.id })) : [];
  const [description, setDescription] = useState("");

  useEffect(() => {
    setDescription(form.getFieldValue("description") as string);
  }, [description, form]);

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
      <div className="flex items-start mt-4">
        <h3 className="text-base xl:text-lg font-bold my-1 w-1/4">Category</h3>
        <Form.Item
          name="mission_category_id"
          rules={[
            {
              required: true,
              message: "Mission category is required",
            },
          ]}
          className="w-3/4"
        >
          <Select
            className="w-full text-sm xl:text-base"
            placeholder="Select mission category"
            notFoundContent={
              <div className="flex flex-col items-center gap-y-2 pb-2">
                <Empty description="No category found" />
                <Button type="primary" href={MISSIONS_CATEGORIES_PATH}>
                  Create new
                </Button>
              </div>
            }
            options={options}
          />
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
        <Form.Item name="description" className="w-3/4">
          {description !== "" && (
            <TipTap
              placeholder="How to complete the task?"
              content={description}
              setContent={(value) => {
                setDescription(value);
                form.setFieldValue("description", value);
              }}
              editable={true}
              className="h-[288px] overflow-y-scroll"
            />
          )}
        </Form.Item>
      </div>
    </div>
  );
}

export default InputInfo;
