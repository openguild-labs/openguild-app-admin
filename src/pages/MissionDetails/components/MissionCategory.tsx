import { useState } from "react";
import { Select } from "antd";
import { useListAllMissionCategories } from "@/supabase/api/missionCategory/service";
import { useUpdateMission } from "@/supabase/api/mission/services";
import FloatButtons from "@/components/FloatButtons";

interface IMissionCategoryProps {
  missionID: string;
  category: TMissionCategoryModel;
  refetch: () => void;
}
function MissionCategory({ category, missionID, refetch }: IMissionCategoryProps) {
  const [editMode, setEditMode] = useState<boolean>(false);
  const { data } = useListAllMissionCategories();
  const options = data !== undefined ? data.map((item) => ({ label: item.name, value: item.id })) : [];
  const [value, setValue] = useState<number>(category.id);
  const { mutate, isPending } = useUpdateMission();

  const onCancel = () => {
    setValue(category.id);
    setEditMode(false);
  };

  const onSave = () => {
    if (value === category.id) {
      onCancel();
      return;
    }

    mutate(
      {
        missionID,
        updates: [{ key: "mission_category_id", value }],
      },
      {
        onSuccess: () => {
          setEditMode(false);
          refetch();
        },
      }
    );
  };

  return (
    <div
      className="rounded-md transition-effect w-full hover:bg-primary-color/5 border border-primary-color/30 hover:shadow-md hover:cursor-pointer hover:border-transparent"
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
          <Select options={options} value={value} onChange={(value) => setValue(value)} className="w-full h-10 text-sm xl:text-base" />
        </div>
      ) : (
        <span className="text-ellipsis line-clamp-1 p-2 text-sm xl:text-base">{category.name}</span>
      )}
    </div>
  );
}

export default MissionCategory;
