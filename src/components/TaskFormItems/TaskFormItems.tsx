import { Checkbox, Form, FormInstance, Input, Select } from "antd";
import IntentGenerator from "./IntentGenerator";
import { intentLinkParamsStore } from "@/redux/slides/intentLinkParams";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/reduxHooks";
import { getIntentLink } from "@/utils/common";
import { socialMedia } from "@/constants/socialMedia";
import Markdown from "../Markdown";

interface TTaskFormItemsProps {
  form: FormInstance;
  taskType?: string;
  isManual?: boolean;
}

const WORKSHOP_TYPE = "Workshop";

function TaskFormItems({ form, isManual: isManualDefault = false, taskType: taskTypeDefault }: TTaskFormItemsProps) {
  const [taskType, setTaskType] = useState<string>(taskTypeDefault || "");
  const isTwitter = taskType === socialMedia.twitter;
  const [isManual, setIsManual] = useState(isManualDefault);
  const intentState = useAppSelector(intentLinkParamsStore);
  const intentStateStr = JSON.stringify(intentState);
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    if (isTwitter && !isManual) {
      form.setFieldValue("action", getIntentLink(intentState));
    }
  }, [intentStateStr, isTwitter, isManual, form, intentState]);

  useEffect(() => {
    setDescription(form.getFieldValue("description") as string);
  }, [description, form]);

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
              value: WORKSHOP_TYPE,
              label: WORKSHOP_TYPE,
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

      {taskType !== WORKSHOP_TYPE && (
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
        <Input.TextArea
          placeholder="How to complete the task?"
          rows={10}
          className="text-sm xl:text-base"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </Form.Item>
      <h4 className="text-sm xl:text-base text-black font-bold my-1">Description Preview</h4>
      <Markdown className="bg-neutral-100 rounded-[6px] p-2 max-h-[280px] min-h-[32px] overflow-y-scroll">{description}</Markdown>
    </>
  );
}

export default TaskFormItems;
