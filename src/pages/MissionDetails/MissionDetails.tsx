import { useGetMission } from "@/supabase/api/mission/services";
import { useParams } from "react-router-dom";
import { Empty } from "antd";
import MissionDetailsSkeleton from "./components/MissionDetailsSkeleton";
import TaskList from "./components/TaskList";
import MissionTitle from "./components/MissionTitle";
import MissionDuration from "./components/MissionDuration";
import MissionBanner from "./components/MissionBanner";
import MissionDescription from "./components/MissionDescription";

function MissionDetails() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, refetch } = useGetMission(id as string);

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
      <div className="w-[40%] min-w-[400px] flex flex-col gap-y-1">
        <MissionTitle
          title={data.title}
          missionID={id as string}
          refetch={() => {
            refetch();
          }}
        />
        <MissionDuration
          startDate={data.start_date}
          endDate={data.end_date}
          missionID={id as string}
          refetch={() => {
            refetch();
          }}
        />
        <MissionBanner
          bannerURL={data.banner_url}
          banner={data.banner}
          missionID={id as string}
          refetch={() => {
            refetch();
          }}
        />
        <MissionDescription
          description={data.description}
          missionID={id as string}
          refetch={() => {
            refetch();
          }}
        />
      </div>

      <div className="flex-1">
        <TaskList
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
