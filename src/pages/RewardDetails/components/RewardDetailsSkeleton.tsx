import { Skeleton } from "antd";

function RewardDetailsSkeleton() {
  return (
    <div className="flex gap-x-6 overflow-hidden">
      <div className="w-[40%] min-w-[320px] xl:min-w-[400px] flex flex-col gap-y-2">
        <Skeleton.Input
          active
          size="large"
          style={{
            width: "100%",
          }}
        />
        <Skeleton.Input
          active
          size="small"
          style={{
            width: "50%",
          }}
        />
        <Skeleton.Input
          active
          size="small"
          style={{
            width: "20%",
          }}
        />
        <Skeleton.Image
          active
          style={{
            width: "100%",
            height: "100%",
            aspectRatio: "1/1",
          }}
        />
      </div>
      <div className="w-[60%]">
        <Skeleton paragraph={{ rows: 8 }} />
      </div>
    </div>
  );
}

export default RewardDetailsSkeleton;
