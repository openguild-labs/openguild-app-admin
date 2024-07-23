import { Input } from "antd";
import { useState } from "react";
import FloatButtons from "@/components/FloatButtons";
import { useUpdateReward } from "@/supabase/api/reward/services";

interface IRewardQuantityProps {
  quantity: number;
  rewardID: string;
  refetch: () => void;
}

function RewardQuantity({ quantity, rewardID, refetch }: IRewardQuantityProps) {
  const [value, setValue] = useState<number>(quantity);
  const [editMode, setEditMode] = useState<boolean>(false);
  const { mutate, isPending } = useUpdateReward();

  const onSave = () => {
    if (value < 1) {
      onCancel();
      return;
    }

    mutate(
      {
        rewardID,
        updates: [{ key: "quantity", value }],
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
    setValue(quantity);
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
          <Input
            value={value}
            onChange={(e) => {
              setValue(Number(e.target.value));
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onSave();
              } else if (e.key === "Escape") {
                onCancel();
              }
            }}
            className="text-sm xl:text-base"
            type="number"
          />
        </div>
      ) : (
        <div className="text-sm xl:text-base">
          <span className="text-primary-color font-bold">Quantity</span>: {value}
        </div>
      )}
    </div>
  );
}

export default RewardQuantity;
