import { useUpdateMission } from "@/supabase/api/mission/services";
import { useEffect, useRef, useState } from "react";
import FloatButtons from "@/components/FloatButtons";
import TipTap from "@/components/TipTap";
import { TTipTap } from "@/components/TipTap/TipTap";
import { Switch } from "antd";

interface IMissionFeaturedProps {
  isFeatured: string;
  missionID: string;
  refetch: () => void;
}

function MissionFeatured({ isFeatured, missionID, refetch }: IMissionFeaturedProps) {
  const { mutate } = useUpdateMission();
  const [checked, setChecked] = useState<boolean>(isFeatured === "true");

  useEffect(() => {
    mutate(
      {
        missionID,
        updates: [{ key: "is_featured", value: checked ? "true" : "false" }],
      },
      {
        onSuccess: () => {
          refetch();
        },
      }
    );
  }, [checked]);
  return (
    <div className="p-2 flex items-center gap-x-2">
      <p className="text-base xl:text-lg font-bold text-primary-color my-2 pb-1">Featured Mission</p>
      <Switch
        checked={checked}
        onChange={(checked) => {
          setChecked(checked);
        }}
        defaultChecked
      />
    </div>
  );
}

export default MissionFeatured;
