import { useUpdateMission } from "@/supabase/api/mission/services";
import { useRef, useState } from "react";
import FloatButtons from "@/components/FloatButtons";
import TipTap from "@/components/TipTap";
import { TTipTap } from "@/components/TipTap/TipTap";

interface IMissionDescriptionProps {
  description: string;
  missionID: string;
  refetch: () => void;
}

function MissionDescription({ description, missionID, refetch }: IMissionDescriptionProps) {
  const [value, setValue] = useState<string>(description);
  const [editMode, setEditMode] = useState<boolean>(false);
  const tiptapRef = useRef<TTipTap>(null);
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
    tiptapRef.current?.cancel(description);
    setEditMode(false);
  };

  return (
    <div className="p-2">
      <p
        className="text-base xl:text-lg font-bold text-primary-color my-2 pb-1 border-b border-neutral-400"
        style={{
          borderColor: !editMode ? "#a3a3a3" : "transparent",
        }}
      >
        Description
      </p>
      <div
        className="relative rounded-md transition-effect w-full hover:bg-primary-color/5 hover:shadow-md hover:cursor-pointer"
        style={{
          backgroundColor: editMode ? "transparent" : "",
          boxShadow: editMode ? "none" : "",
        }}
        onClick={() => {
          setEditMode(true);
        }}
      >
        {editMode && <FloatButtons onSave={onSave} onCancel={onCancel} isLoading={isPending} />}

        <TipTap ref={tiptapRef} content={description} setContent={setValue} editable={editMode} />
      </div>
    </div>
  );
}

export default MissionDescription;
