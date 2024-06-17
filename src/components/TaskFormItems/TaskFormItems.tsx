import { Checkbox, Form, FormInstance, Input, Select } from "antd";
import IntentGenerator from "./IntentGenerator";
import { intentLinkParamsStore } from "@/redux/slides/intentLinkParams";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/reduxHooks";
import { getIntentLink } from "@/utils/common";
import { socialMedia } from "@/constants/socialMedia";

interface TTaskFormItemsProps {
  form: FormInstance;
  isTwitter?: boolean;
  isManual?: boolean;
}

function TaskFormItems({ form, isManual: isManualDefault = false, isTwitter: isTwitterDefault = false }: TTaskFormItemsProps) {
  const [isTwitter, setIsTwitter] = useState(isTwitterDefault);
  const [isManual, setIsManual] = useState(isManualDefault);
  const intentState = useAppSelector(intentLinkParamsStore);
  const intentStateStr = JSON.stringify(intentState);

  useEffect(() => {
    if (isTwitter && !isManual) {
      form.setFieldValue("action", getIntentLink(intentState));
    }
  }, [intentStateStr, isTwitter, isManual, form, intentState]);

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
              value: socialMedia.discord,
              label: socialMedia.discord,
            },
            {
              value: socialMedia.twitter,
              label: socialMedia.twitter,
            },
          ]}
          onChange={(value) => {
            if (value.value === socialMedia.twitter) {
              form.setFieldValue("action", getIntentLink(intentState));
            } else {
              form.resetFields(["action"]);
            }
            setIsTwitter(value.value === socialMedia.twitter);
          }}
        />
      </Form.Item>
      {isTwitter && !isManual && <IntentGenerator />}
      <div className="flex items-center gap-x-3">
        <h4 className="text-base text-black font-bold my-1">Action link</h4>
        {isTwitter && (
          <Checkbox
            value={isManual}
            checked={isManual}
            onChange={(event) => {
              setIsManual(event.target.checked);
              form.resetFields(["action"]);
            }}
          >
            Input manually
          </Checkbox>
        )}
      </div>
      <Form.Item
        name="action"
        rules={[
          {
            required: true,
            message: "Please input action link",
          },
        ]}
      >
        <Input placeholder="Where can the user perform this task?" readOnly={isTwitter && !isManual} />
      </Form.Item>
      <h4 className="text-base text-black font-bold my-1">Description</h4>
      <Form.Item name="description">
        <Input.TextArea placeholder="How to complete the task?" rows={10} />
      </Form.Item>
    </>
  );
}

export default TaskFormItems;
