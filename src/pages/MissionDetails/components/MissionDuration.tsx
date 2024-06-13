import { DatePicker } from "antd";
import { useState } from "react";
import dayjs from "dayjs";
import FloatButtons from "./FloatButtons";
import { useUpdateMission } from "@/supabase/api/mission/services";
import { HiOutlineArrowLongRight } from "react-icons/hi2";

interface IMissionDurationProps {
  startDate: string;
  endDate: string;
  missionID: string;
  refetch: () => void;
}

const { RangePicker } = DatePicker;
const dateFormat = "YYYY-MM-DD";

function MissionDuration({ startDate: start_date, endDate: end_date, missionID, refetch }: IMissionDurationProps) {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [values, setValues] = useState<[string, string]>([start_date, end_date]);
  const { mutate, isPending } = useUpdateMission();

  const onSave = () => {
    if (values[0] === "" && values[1] === "") {
      onCancel();
      return;
    }

    mutate(
      {
        missionID,
        updates: [
          { key: "start_date", value: values[0] },
          { key: "end_date", value: values[1] },
        ],
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
    setValues([start_date, end_date]);
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
          <RangePicker
            className="w-full"
            defaultValue={[dayjs(values[0], dateFormat), dayjs(values[1], dateFormat)]}
            onChange={(_, dateStrings) => {
              setValues([dateStrings[0], dateStrings[1]]);
            }}
          />
        </div>
      ) : (
        <div className="flex gap-x-3 items-center">
          <span>{values[0]}</span>
          <HiOutlineArrowLongRight className="text-neutral-400" />
          <span>{values[1]}</span>
        </div>
      )}
    </div>
  );
}

export default MissionDuration;
