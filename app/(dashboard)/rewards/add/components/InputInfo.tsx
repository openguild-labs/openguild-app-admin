import TipTap from "@/components/TipTap";
import { TIPTAP_EMPTY_STRING } from "@/components/TipTap/TipTap";
import colors from "@/config/colors";
import { rewardType } from "@/constants/types";
import { Form, FormInstance, Input, Select } from "antd";
import { useEffect, useState } from "react";

interface IInputInfoProps {
  form: FormInstance;
  validation: number;
}

function InputInfo({ form, validation }: IInputInfoProps) {
  const [description, setDescription] = useState("");
  const [isError, setIsError] = useState(false);
  const error = isError ? [<span className="text-error text-sm xl:text-base">Please input description</span>] : undefined;

  useEffect(() => {
    if (validation > 0 && description === "") {
      setIsError(true);
    }
  }, [validation, description]);

  return (
    <div className="flex flex-col gap-y-2">
      <div>
        <h4 className="text-base xl:text-lg text-black font-bold">Name</h4>
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: "Please input reward name",
            },
          ]}
        >
          <Input placeholder="Input reward name" className="text-sm xl:text-base" />
        </Form.Item>
      </div>

      <div>
        <h4 className="text-base xl:text-lg text-black font-bold mb-1">Quantity</h4>
        <Form.Item
          name="quantity"
          rules={[
            {
              required: true,
              message: "Please input quantity",
            },
          ]}
        >
          <Input placeholder="Input reward quantity" className="text-sm xl:text-base" type="number" />
        </Form.Item>
      </div>

      <div>
        <h4 className="text-base xl:text-lg text-black font-bold my-1">Type</h4>
        <Form.Item
          name="type"
          rules={[
            {
              required: true,
              message: "Please select reward type",
            },
          ]}
        >
          <Select
            labelInValue
            className="w-full text-sm xl:text-base"
            placeholder="Select task type"
            options={[
              {
                label: rewardType.thirdPartyGifts,
                value: rewardType.thirdPartyGifts,
              },
              {
                label: rewardType.physicalGoods,
                value: rewardType.physicalGoods,
              },
            ]}
            onChange={(item) => {
              form.setFieldValue("type", item.value);
            }}
          />
        </Form.Item>
      </div>

      <div>
        <h4 className="text-base xl:text-lg text-black font-bold">Description</h4>
        <Form.Item name="description">
          <TipTap
            placeholder="Describe reward that you want to create"
            content={description}
            setContent={(value) => {
              if (value === TIPTAP_EMPTY_STRING) {
                setDescription("");
                form.setFieldValue("description", "");
              } else {
                setDescription(value);
                form.setFieldValue("description", value);
              }
              setIsError(false);
            }}
            className="h-[288px] overflow-y-scroll"
            style={{
              borderColor: isError ? colors["error"] : "",
            }}
          />
        </Form.Item>
        <Form.ErrorList errors={error} />
      </div>
    </div>
  );
}

export default InputInfo;
