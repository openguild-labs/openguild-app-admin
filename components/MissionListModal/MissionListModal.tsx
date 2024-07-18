import { useListAllMissions } from "@/supabase/api/mission/services";
import { useDebouncedValue } from "@mantine/hooks";
import { Input, Modal, ModalProps } from "antd";
import { useState } from "react";
import { LiaSearchSolid } from "react-icons/lia";

interface IMissionListModalProps extends ModalProps {
  onClickItem: (mission: TMissionModel) => void;
  existedMissions?: TMissionModel[];
}

function MissionListModal({ existedMissions, onClickItem, ...props }: IMissionListModalProps) {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebouncedValue(search, 500);

  const { data } = useListAllMissions(debouncedSearch);
  const list = data ? data : [];

  const filterList = list.filter((mission) => {
    return !existedMissions?.find((existedMission) => existedMission.id === mission.id);
  });

  return (
    <Modal centered className="w-[400px] rounded-lg" closeIcon={null} footer={null} {...props}>
      <Input
        prefix={<LiaSearchSolid />}
        className="w-full text-base xl:text-lg border-2 border-primary-color"
        placeholder="Search Missions name"
        allowClear
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="h-[280px] overflow-auto mt-4">
        {filterList.map((mission) => {
          return (
            <div
              key={mission.id}
              className="transition-effect text-sm xl:text-base border border-neutral-300 mb-2 px-2 py-1 rounded-md hover:shadow-md hover:cursor-pointer line-clamp-1 text-ellipsis"
              onClick={() => {
                onClickItem(mission);
                setSearch("");
              }}
            >
              {mission.title}
            </div>
          );
        })}
      </div>
    </Modal>
  );
}

export default MissionListModal;
