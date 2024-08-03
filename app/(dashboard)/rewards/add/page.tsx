"use client";
import { Button, Form, UploadFile } from "antd";
import DragFile from "./components/DragFile";
import InputInfo from "./components/InputInfo";
import InputRequirement from "./components/InputRequirement";
import { useState } from "react";
import { useCreateReward } from "@/supabase/api/reward/services";
import { REWARDS_PATH } from "@/constants/links";
import { useRouter } from "next/navigation";

const formFields = ["image", "name", "quantity", "type", "description", "requirements", "is_shared"];

function RewardCreation() {
  const [form] = Form.useForm();
  const [validation, setValidation] = useState(0);
  const { mutate, isPending } = useCreateReward();
  const router = useRouter();

  return (
    <Form form={form} name="reward_creation" className="h-full flex flex-col justify-between">
      <div className="flex gap-x-3">
        <div className="w-[40%] flex flex-col gap-y-2">
          <DragFile form={form} validation={validation} />
          <InputRequirement form={form} validation={validation} />
        </div>
        <div className="w-[60%]">
          <InputInfo form={form} validation={validation} />
        </div>
      </div>
      <div className="flex gap-x-2 justify-end mt-4">
        <Button htmlType="submit" className="text-sm xl:text-base">
          Cancel
        </Button>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={isPending}
            className="text-sm xl:text-base"
            onClick={() => {
              setValidation(validation + 1);
              form
                .validateFields()
                .then(() => {
                  const values = form.getFieldsValue(formFields) as TRewardCreation<UploadFile>;
                  if (values.description === undefined || values.description === "" || values.requirements.length === 0) return;
                  values.quantity = Number(values.quantity);
                  mutate(values, {
                    onSuccess: (resp) => {
                      if (resp !== undefined) {
                        router.push(REWARDS_PATH);
                      }
                    },
                  });
                })
                .catch(() => {});
            }}
          >
            Create
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
}

export default RewardCreation;
