import { Select } from "antd";
import { useState } from "react";
import FloatButtons from "@/components/FloatButtons";
import { useUpdateReward } from "@/supabase/api/reward/services";
import { rewardType } from "@/constants/types";

interface IRewardTypeProps {
  type: string;
  rewardID: string;
  refetch: () => void;
}

function RewardType({ type, rewardID, refetch }: IRewardTypeProps) {
  const [value, setValue] = useState<string>(type);
  const [editMode, setEditMode] = useState<boolean>(false);
  const { mutate, isPending } = useUpdateReward();

  const onSave = () => {
    if (value === "") {
      onCancel();
      return;
    }

    mutate(
      {
        rewardID,
        updates: [{ key: "type", value }],
      },
      {
        onSuccess: () => {
          setEditMode(false);
          refetch();
        },
      }
    );
  };

  const onCancel = () => {
    setValue(type);
    setEditMode(false);
  };

  return (
    <div
      className="p-2 rounded-md transition-effect w-full hover:bg-primary-color/5 hover:shadow-md hover:cursor-pointer"
      style={{
        backgroundColor: editMode ? "transparent" : "",
        boxShadow: editMode ? "none" : "",
      }}
      onClick={() => {
        setEditMode(true);
      }}
    >
      {editMode ? (
        <div className="relative">
          <FloatButtons onSave={onSave} onCancel={onCancel} isLoading={isPending} />
          <Select
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
            value={value}
            onChange={(value) => {
              setValue(value);
            }}
          />
        </div>
      ) : (
        <div className="text-sm xl:text-base">
          <span className="text-primary-color font-bold">Type</span>: {value}
        </div>
      )}
    </div>
  );
}

export default RewardType;
