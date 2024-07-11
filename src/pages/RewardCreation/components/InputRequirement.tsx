import MissionListModal from "@/components/MissionListModal";
import { Button, Form, FormInstance } from "antd";
import { useEffect, useState } from "react";
import { GoPlusCircle } from "react-icons/go";
import { MdOutlineDelete } from "react-icons/md";

interface IInputRequirementProps {
  form: FormInstance;
  validation: number;
}

function InputRequirement({ form, validation }: IInputRequirementProps) {
  const [openModal, setOpenModal] = useState(false);
  const [requirements, setRequirements] = useState<TMissionModel[]>([]);
  const [isError, setIsError] = useState(false);
  const error = isError ? [<span className="text-error text-sm xl:text-base">Please add at least one requirement</span>] : undefined;

  useEffect(() => {
    if (validation > 0 && requirements.length === 0) {
      setIsError(true);
    }

    form.setFieldValue("requirements", requirements.map((item) => item.id).join(","));
  }, [validation, requirements.length, form, requirements]);

  return (
    <div>
      <h4 className="text-base xl:text-lg text-black font-bold">Requirements</h4>
      <div className="mt-[2px]">
        {requirements.map((requirement) => {
          return (
            <div key={requirement.id} className="flex items-center justify-between mb-1">
              <span className="line-clamp-1 text-ellipsis text-sm xl:text-base">{requirement.title}</span>
              <div
                className="transition-effect p-1 rounded-full hover:cursor-pointer hover:bg-red-500/20"
                onClick={() => {
                  setRequirements(requirements.filter((item) => item.id !== requirement.id));
                }}
              >
                <MdOutlineDelete className="text-red-500" />
              </div>
            </div>
          );
        })}
      </div>
      <Form.Item name="requirements">
        <Button
          type="dashed"
          danger={isError}
          block
          icon={<GoPlusCircle />}
          onClick={() => {
            setOpenModal(true);
          }}
          className="w-full text-xs xl:text-sm overflow-hidden"
        >
          add Missions to be completed to get this reward
        </Button>
      </Form.Item>

      <Form.ErrorList errors={error} />

      <MissionListModal
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onClose={() => setOpenModal(false)}
        onClickItem={(mission) => {
          setRequirements((prev) => {
            if (prev.find((item) => item.id === mission.id)) {
              return prev;
            }
            return [...prev, mission];
          });
          setOpenModal(false);
          setIsError(false);
        }}
        existedMissions={requirements}
      />
    </div>
  );
}

export default InputRequirement;
