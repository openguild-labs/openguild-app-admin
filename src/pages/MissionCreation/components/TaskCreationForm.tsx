import TaskFormItems from "@/components/TaskFormItems";
import { socialMedia } from "@/constants/socialMedia";
import { useAppDispatch } from "@/redux/reduxHooks";
import { resetIntentLinkState, setParamsValue, setType } from "@/redux/slides/intentLinkParams";
import { isIntentLink, parseIntentLink } from "@/utils/common";
import { Button, Form } from "antd";
import { useEffect } from "react";

interface ITaskCreationFormProps {
  onFinish: (values: TTaskCreation) => void;
  editTask?: TTaskCreation;
}

function TaskCreationForm({ onFinish, editTask }: ITaskCreationFormProps) {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const isTwitter = editTask !== undefined && editTask.type === socialMedia.twitter;
  const isManual = isTwitter && !isIntentLink(editTask.action);

  useEffect(() => {
    if (editTask !== undefined) {
      if (editTask.type === socialMedia.twitter) {
        if (!isManual) {
          const { type, params } = parseIntentLink(editTask.action);
          dispatch(setType(type));
          dispatch(setParamsValue(params));
        }
      }

      form.setFieldsValue({
        name: editTask.name,
        type: {
          value: editTask.type,
          label: editTask.type,
        },
        action: editTask.action,
        description: editTask.description,
        xp: editTask.xp,
        button_placeholder: editTask.button_placeholder,
      });
    } else {
      form.resetFields();
    }
  }, [form, editTask, isManual, dispatch]);

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
        dispatch(resetIntentLinkState());
      }}
    >
      <TaskFormItems form={form} taskType={editTask?.type} isManual={isManual} />
      <div className="flex justify-end mt-4">
        <Form.Item>
          <Button type="primary" htmlType="submit" className="mt-2 text-sm xl:text-base">
            {editTask !== undefined ? "Change" : "Create"}
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
}

export default TaskCreationForm;
