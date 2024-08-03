"use client";
import { useGetReward } from "@/supabase/api/reward/services";
import { Empty } from "antd";
import RewardName from "./components/RewardName";
import RewardType from "./components/RewardType";
import RewardQuantity from "./components/RewardQuantity";
import RewardImage from "./components/RewardImage";
import RewardDescription from "./components/RewardDescription";
import Requirements from "./components/Requirements";
import RewardDetailsSkeleton from "./components/RewardDetailsSkeleton";

interface IRewardDetailsProps {
  params: {
    id: string;
  };
}

function RewardDetails({ params }: IRewardDetailsProps) {
  const rewardID = params.id;
  const { data, isLoading, refetch } = useGetReward(rewardID);

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
        <RewardName name={data.name} rewardID={rewardID} refetch={refetchData} />
        <RewardType type={data.type} rewardID={rewardID} refetch={refetchData} />
        <RewardQuantity quantity={data.quantity} rewardID={rewardID} refetch={refetchData} />
        <RewardImage image={data.image} imageURL={data.image_url} rewardID={rewardID} refetch={refetchData} />
      </div>
      <div className="w-[60%]">
        <Requirements requirements={data.missions} rewardID={rewardID} refetch={refetchData} />
        <RewardDescription description={data.description} rewardID={rewardID} refetch={refetchData} />
      </div>
    </div>
  );
}

export default RewardDetails;
