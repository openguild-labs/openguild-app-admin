"use client";
import { useGetMission } from "@/supabase/api/mission/services";
import { Divider, Empty } from "antd";
import MissionDetailsSkeleton from "./components/MissionDetailsSkeleton";
import TaskList from "./components/TaskList";
import MissionTitle from "./components/MissionTitle";
import MissionDuration from "./components/MissionDuration";
import MissionBanner from "./components/MissionBanner";
import MissionDescription from "./components/MissionDescription";
import MissionCategory from "./components/MissionCategory";

interface IMissionDetailsProps {
  params: {
    id: string;
  };
}

function MissionDetails({ params }: IMissionDetailsProps) {
  const missionID = params.id;
  const { data, isLoading, refetch } = useGetMission(missionID);

  if (isLoading) {
    return <MissionDetailsSkeleton />;
  }

  if (data === undefined) {
    return (
      <div className="w-full flex-center mt-10">
        <Empty description={false} />
      </div>
    );
  }

  return (
    <div className="flex gap-x-6">
      <div className="w-[40%] min-w-[320px] xl:min-w-[400px] flex flex-col">
        <MissionTitle
          title={data.title}
          missionID={missionID}
          refetch={() => {
            refetch();
          }}
        />
        <MissionDuration
          startDate={data.start_date}
          endDate={data.end_date}
          missionID={missionID}
          refetch={() => {
            refetch();
          }}
        />
        <MissionBanner
          bannerURL={data.banner_url}
          banner={data.banner}
          missionID={missionID}
          refetch={() => {
            refetch();
          }}
        />
        <MissionDescription
          description={data.description}
          missionID={missionID}
          refetch={() => {
            refetch();
          }}
        />
      </div>

      <div className="flex-1">
        <Divider orientation="left">
          <span className="text-lg xl:text-xl">Category</span>
        </Divider>
        <MissionCategory missionID={missionID} category={data.mission_category} refetch={() => refetch()} />
        <Divider orientation="left">
          <span className="text-lg xl:text-xl">Task list</span>
        </Divider>
        <TaskList
          missionID={missionID}
          tasks={data.tasks}
          refetch={() => {
            refetch();
          }}
        />
      </div>
    </div>
  );
}

export default MissionDetails;
