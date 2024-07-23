import { Input, Typography } from "antd";
import { useState } from "react";
import FloatButtons from "@/components/FloatButtons";
import { useUpdateReward } from "@/supabase/api/reward/services";

interface IRewardNameProps {
  name: string;
  rewardID: string;
  refetch: () => void;
}

function RewardName({ name, rewardID, refetch }: IRewardNameProps) {
  const [value, setValue] = useState<string>(name);
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
        updates: [{ key: "name", value }],
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
    setValue(name);
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
              setValue(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onSave();
              } else if (e.key === "Escape") {
                onCancel();
              }
            }}
            className="text-base xl:text-lg"
          />
        </div>
      ) : (
        <Typography.Paragraph
          ellipsis={{
            rows: 2,
            tooltip: value,
          }}
          className="text-xl xl:text-2xl ant-typo-mb-0 font-bold text-primary-color"
        >
          {value}
        </Typography.Paragraph>
      )}
    </div>
  );
}

export default RewardName;
