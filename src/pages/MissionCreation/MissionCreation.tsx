import { Button, Form, FormInstance, Steps } from "antd";
import DragFile from "./components/DragFile";
import InputInfo from "./components/InputInfo";
import { useState } from "react";
import CreateTask from "./components/CreateTask";
import { useCreateMission } from "@/supabase/api/mission/services";
import { useNavigate } from "react-router-dom";
import { MISSIONS_PATH } from "@/constants/links";

const formFields = ["banner", "title", "duration", "description", "tasks", "mission_category_id"];

const steps = [
  {
    title: <span className="text-sm xl:text-base">Mission banner</span>,
    getContent: (form: FormInstance) => <DragFile form={form} />,
  },
  {
    title: <span className="text-sm xl:text-base">Mission information</span>,
    getContent: (form: FormInstance) => <InputInfo form={form} />,
  },
  {
    title: <span className="text-sm xl:text-base">Mission tasks</span>,
    getContent: (form: FormInstance) => <CreateTask form={form} />,
  },
];

const getDateString = (date: Date) => {
  return date.toISOString().split("T")[0];
};

function MissionCreation() {
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  const { mutate, isPending } = useCreateMission();
  const navigate = useNavigate();
  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <Form form={form} name="mission_creation" className="h-full flex">
      <div className="pl-1 pt-1">
        <Steps direction="vertical" current={current} items={steps.map((item) => ({ title: item.title }))} className="w-[280px]" />
        <div className="flex gap-x-2 mt-4">
          <Button disabled={current === 0} onClick={() => prev()} className="text-sm xl:text-base">
            Back
          </Button>
          <Button
            type="primary"
            loading={isPending}
            className="text-sm xl:text-base"
            onClick={() => {
              form
                .validateFields()
                .then(() => {
                  if (current === steps.length - 1) {
                    const values = form.getFieldsValue(formFields);
                    const startDate = new Date(values.duration[0]);
                    const endDate = new Date(values.duration[1]);
                    mutate(
                      {
                        banner: values.banner,
                        title: values.title,
                        description: values.description,
                        start_date: getDateString(startDate),
                        end_date: getDateString(endDate),
                        tasks: values.tasks,
                        mission_category_id: values.mission_category_id,
                      },
                      {
                        onSuccess: (resp) => {
                          if (resp !== undefined) {
                            navigate(MISSIONS_PATH);
                          }
                        },
                      }
                    );
                  } else {
                    next();
                  }
                })
                .catch(() => {});
            }}
          >
            {current === steps.length - 1 ? "Done" : "Next"}
          </Button>
        </div>
      </div>
      <div className="flex-1 border-l border-neutral-300 pl-3 pr-1 pt-1 overflow-hidden">{steps[current].getContent(form)}</div>
    </Form>
  );
}

export default MissionCreation;
