import { Button, Form, FormInstance, Steps } from "antd";
import DragFile from "./components/DragFile";
import InputInfo from "./components/InputInfo";
import { useState } from "react";
import CreateTask from "./components/CreateTask";
import { useCreateMission } from "@/supabase/api/mission/services";
import { useNavigate } from "react-router-dom";
import { MISSIONS_PATH } from "@/constants/links";

const formFields = ["banner", "title", "duration", "description", "tasks"];

const steps = [
  {
    title: "Mission banner",
    getContent: (form: FormInstance) => <DragFile form={form} />,
  },
  {
    title: "Mission information",
    getContent: () => <InputInfo />,
  },
  {
    title: "Mission tasks",
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
      <div>
        <Steps direction="vertical" current={current} items={steps.map((item) => ({ title: item.title }))} className="w-[280px]" />
        <div className="flex gap-x-2 mt-4">
          <Button disabled={current === 0} onClick={() => prev()}>
            Back
          </Button>
          <Button
            type="primary"
            loading={isPending}
            onClick={() => {
              form
                .validateFields()
                .then(() => {
                  if (current === steps.length - 1) {
                    const values = form.getFieldsValue(formFields);
                    const startDate = new Date(values.duration[0]);
                    const endDate = new Date(values.duration[1]);
                    console.log(values);
                    mutate(
                      {
                        banner: values.banner,
                        title: values.title,
                        description: values.description,
                        start_date: getDateString(startDate),
                        end_date: getDateString(endDate),
                        tasks: values.tasks,
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
      <div className="flex-1 border-l border-neutral-300 pl-3">{steps[current].getContent(form)}</div>
    </Form>
  );
}

export default MissionCreation;