import { useUpdateMission } from "@/supabase/api/mission/services";
import { Input } from "antd";
import { useState } from "react";
import FloatButtons from "./FloatButtons";
import Markdown from "@/components/Markdown";

interface IMissionDescriptionProps {
  description: string;
  missionID: string;
  refetch: () => void;
}

function MissionDescription({ description, missionID, refetch }: IMissionDescriptionProps) {
  const [value, setValue] = useState<string>(description);
  const [editMode, setEditMode] = useState<boolean>(false);
  const { mutate, isPending } = useUpdateMission();

  const onSave = () => {
    if (value === "") {
      onCancel();
      return;
    }

    mutate(
      {
        missionID,
        updates: [{ key: "description", value }],
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
    setValue(description);
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
      <p className="text-base xl:text-lg font-bold text-primary-color my-2">Description</p>
      {editMode ? (
        <div className="relative">
          <FloatButtons onSave={onSave} onCancel={onCancel} isLoading={isPending} />
          <Input.TextArea
            rows={10}
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
            className="text-sm xl:text-base"
          />
        </div>
      ) : (
        <Markdown className="w-full bg-transparent border-t border-neutral-400 pt-2">{description}</Markdown>
      )}
    </div>
  );
}

export default MissionDescription;
