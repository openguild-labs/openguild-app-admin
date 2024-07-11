import FloatButtons from "@/components/FloatButtons";
import MissionListModal from "@/components/MissionListModal";
import { useUpdateReward } from "@/supabase/api/reward/services";
import { Button } from "antd";
import { useState } from "react";
import { GoPlusCircle } from "react-icons/go";
import { MdOutlineDelete } from "react-icons/md";

interface IRequirementsProps {
  requirements: TMissionModel[];
  rewardID: string;
  refetch: () => void;
}

// check 2 array that is different
const isDifferent = (arr1: number[], arr2: number[]) => {
  return arr1.length !== arr2.length || arr1.some((item) => !arr2.includes(item)) || arr2.some((item) => !arr1.includes(item));
};

function Requirements({ requirements, rewardID, refetch }: IRequirementsProps) {
  const [missions, setMissions] = useState<TMissionModel[]>(requirements);
  const [openModal, setOpenModal] = useState(false);
  const { mutate, isPending } = useUpdateReward();

  return (
    <div>
      <div className="flex mb-1 items-end justify-between gap-x-2 h-8">
        <span className="text-base xl:text-lg font-bold text-primary-color text-end">Requirements</span>
        {isDifferent(
          requirements.map((item) => item.id),
          missions.map((item) => item.id)
        ) && (
          <FloatButtons
            relative
            isLoading={isPending}
            onSave={() => {
              mutate(
                {
                  rewardID,
                  updates: [{ key: "requirements", value: missions.map((item) => item.id).join(",") }],
                },
                {
                  onSuccess: () => {
                    refetch();
                  },
                }
              );
            }}
            onCancel={() => {
              setMissions(requirements);
            }}
          />
        )}
      </div>
      <div>
        {missions.map((mission) => {
          return (
            <div
              key={mission.id}
              className="group transition-effect flex items-center justify-between mb-2 border border-neutral-300 py-1 px-2 rounded-md"
            >
              <span className="line-clamp-1 text-ellipsis text-sm xl:text-base">{mission.title}</span>
              <div
                className="group-hover:opacity-100 opacity-0 transition-effect p-1 rounded-full hover:cursor-pointer hover:bg-red-500/20"
                onClick={() => {
                  setMissions(missions.filter((item) => item.id !== mission.id));
                }}
              >
                <MdOutlineDelete className="text-red-500" />
              </div>
            </div>
          );
        })}
        <Button
          type="dashed"
          block
          icon={<GoPlusCircle />}
          onClick={() => {
            setOpenModal(true);
          }}
          className="w-full text-xs xl:text-sm overflow-hidden"
        >
          add Missions to be completed to get this reward
        </Button>
        <MissionListModal
          open={openModal}
          onCancel={() => setOpenModal(false)}
          onClose={() => setOpenModal(false)}
          onClickItem={(mission) => {
            setMissions((prev) => {
              if (prev.find((item) => item.id === mission.id)) {
                return prev;
              }
              return [...prev, mission];
            });
            setOpenModal(false);
          }}
          existedMissions={missions}
        />
      </div>
    </div>
  );
}

export default Requirements;
