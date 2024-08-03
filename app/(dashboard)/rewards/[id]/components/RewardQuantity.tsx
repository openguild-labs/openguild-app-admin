import { Checkbox, Input, InputNumber } from "antd";
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
  const [isInfinity, setIsInfinity] = useState<boolean>(quantity === 0);
  const [editMode, setEditMode] = useState<boolean>(false);
  const { mutate, isPending } = useUpdateReward();

  const onSave = () => {
    if ((value < 1 && !isInfinity) || (value !== 0 && isInfinity)) {
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
    setIsInfinity(quantity === 0);
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
        <div className="relative flex items-center">
          <FloatButtons onSave={onSave} onCancel={onCancel} isLoading={isPending} />
          <Checkbox
            checked={isInfinity}
            onChange={(e) => {
              const val = e.target.checked;
              setIsInfinity(val);
              setValue(val ? 0 : 1);
            }}
            className="flex items-center"
          >
            infinity
          </Checkbox>
          <InputNumber
            value={value}
            disabled={isInfinity}
            onChange={(value) => {
              if (value !== null) setValue(value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onSave();
              } else if (e.key === "Escape") {
                onCancel();
              }
            }}
            className="text-sm xl:text-base w-full"
            type="number"
          />
        </div>
      ) : (
        <div className="text-sm xl:text-base flex items-end gap-x-2">
          <span className="text-primary-color font-bold">Quantity:</span>
          {value === 0 ? <span className="text-xl leading-4 xl:leading-5 flex items-center">∞</span> : value}
        </div>
      )}
    </div>
  );
}

export default RewardQuantity;
