import { useGetReward } from "@/supabase/api/reward/services";
import { Empty } from "antd";
import { useParams } from "react-router-dom";
import RewardName from "./components/RewardName";
import RewardType from "./components/RewardType";
import RewardQuantity from "./components/RewardQuantity";
import RewardImage from "./components/RewardImage";
import RewardDescription from "./components/RewardDescription";
import Requirements from "./components/Requirements";
import RewardDetailsSkeleton from "./components/RewardDetailsSkeleton";

function RewardDetails() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, refetch } = useGetReward(id as string);

  if (isLoading) {
    return <RewardDetailsSkeleton />;
  }

  if (data === undefined) {
    return (
      <div className="w-full flex-center mt-10">
        <Empty description={false} />
      </div>
    );
  }

  const refetchData = () => {
    refetch();
  };

  return (
    <div className="flex gap-x-6">
      <div className="w-[40%] min-w-[320px] xl:min-w-[400px] flex flex-col">
        <RewardName name={data.name} rewardID={id as string} refetch={refetchData} />
        <RewardType type={data.type} rewardID={id as string} refetch={refetchData} />
        <RewardQuantity quantity={data.quantity} rewardID={id as string} refetch={refetchData} />
        <RewardImage image={data.image} imageURL={data.image_url} rewardID={id as string} refetch={refetchData} />
      </div>
      <div className="w-[60%]">
        <RewardDescription description={data.description} rewardID={id as string} refetch={refetchData} />
        <Requirements requirements={data.missions} rewardID={id as string} refetch={refetchData} />
      </div>
    </div>
  );
}

export default RewardDetails;
