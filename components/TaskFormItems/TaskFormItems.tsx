import { Checkbox, Form, FormInstance, Input, Select } from "antd";
import IntentGenerator from "./IntentGenerator";
import { intentLinkParamsStore } from "@/redux/slides/intentLinkParams";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/reduxHooks";
import { getIntentLink } from "@/utils/common";
import { socialMedia } from "@/constants/socialMedia";
import TipTap from "../TipTap";

interface TTaskFormItemsProps {
  form: FormInstance;
  taskType?: string;
  isManual?: boolean;
  descriptionDefault?: string;
}

const POW_TYPE = "PoW";

function TaskFormItems({
  form,
  isManual: isManualDefault = false,
  taskType: taskTypeDefault,
  descriptionDefault = "",
}: TTaskFormItemsProps) {
  const [taskType, setTaskType] = useState<string>(taskTypeDefault || "");
  const isTwitter = taskType === socialMedia.twitter;
  const [isManual, setIsManual] = useState(isManualDefault);
  const intentState = useAppSelector(intentLinkParamsStore);
  const intentStateStr = JSON.stringify(intentState);
  const [description, setDescription] = useState<string>(descriptionDefault);

  useEffect(() => {
    if (isTwitter && !isManual) {
      form.setFieldValue("action", getIntentLink(intentState));
    }
  }, [intentStateStr, isTwitter, isManual, form, intentState]);

  return (
    <>
      <h4 className="text-sm xl:text-base text-black font-bold mb-1">Name</h4>
      <Form.Item
        name="name"
        rules={[
          {
            required: true,
            message: "Please input task name",
          },
        ]}
      >
        <Input placeholder="What do you want users to do?" className="text-sm xl:text-base" />
      </Form.Item>
      <h4 className="text-sm xl:text-base text-black font-bold my-1">Type</h4>
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
          className="w-full text-sm xl:text-base"
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
            {
              value: POW_TYPE,
              label: POW_TYPE,
            },
          ]}
          onChange={(value) => {
            if (value.value === socialMedia.twitter) {
              form.setFieldValue("action", getIntentLink(intentState));
            } else {
              form.resetFields(["action"]);
            }
            setTaskType(value.value);
          }}
        />
      </Form.Item>

      <h4 className="text-sm xl:text-base text-black font-bold mb-1">XP</h4>
      <Form.Item
        name="xp"
        rules={[
          {
            required: true,
            message: "Please input XP",
          },
        ]}
      >
        <Input placeholder="Input XP" className="text-sm xl:text-base" type="number" />
      </Form.Item>

      {taskType !== POW_TYPE && (
        <>
          {isTwitter && !isManual && <IntentGenerator />}
          <div className="flex items-center gap-x-3">
            <h4 className="text-sm xl:text-base text-black font-bold my-1">Action link</h4>
            {isTwitter && (
              <Checkbox
                value={isManual}
                checked={isManual}
                onChange={(event) => {
                  setIsManual(event.target.checked);
                  form.resetFields(["action"]);
                }}
                className="text-sm xl:text-base"
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
            <Input placeholder="Where can the user perform this task?" readOnly={isTwitter && !isManual} className="text-sm xl:text-base" />
          </Form.Item>
        </>
      )}
      <h4 className="text-sm xl:text-base text-black font-bold mb-1">Button placeholder</h4>
      <Form.Item name="button_placeholder">
        <Input placeholder="Input the button placeholder" className="text-sm xl:text-base" />
      </Form.Item>
      <h4 className="text-sm xl:text-base text-black font-bold my-1">Description</h4>
      <Form.Item name="description">
        <TipTap
          placeholder="How to complete the task?"
          content={description}
          setContent={(value) => {
            setDescription(value);
            form.setFieldValue("description", value);
          }}
          className="h-[288px] overflow-y-scroll"
        />
      </Form.Item>
    </>
  );
}

export default TaskFormItems;
