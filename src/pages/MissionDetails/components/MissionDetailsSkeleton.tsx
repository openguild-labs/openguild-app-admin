import { Skeleton } from "antd";

function MissionDetailsSkeleton() {
  return (
    <div className="flex gap-x-6">
      <div className="w-[40%] min-w-[320px] xl:min-w-[400px] flex flex-col gap-y-4 xl:gap-y-5 p-2">
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
        <Skeleton.Image
          active
          style={{
            width: "100%",
            height: "100%",
            aspectRatio: "1/1",
          }}
        />
        <Skeleton paragraph={{ rows: 2 }} />
      </div>
      <div className="flex-1 flex flex-col gap-y-4 p-2">
        <Skeleton.Input
          active
          size="large"
          style={{
            width: "100%",
            height: "60px",
          }}
        />
        <Skeleton.Input
          active
          size="large"
          style={{
            width: "100%",
            height: "60px",
          }}
        />
        <Skeleton.Input
          active
          size="large"
          style={{
            width: "100%",
            height: "60px",
          }}
        />
        <Skeleton.Input
          active
          size="large"
          style={{
            width: "100%",
            height: "60px",
          }}
        />
      </div>
    </div>
  );
}

export default MissionDetailsSkeleton;
