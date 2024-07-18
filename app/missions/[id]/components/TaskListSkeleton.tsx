import { Skeleton } from "antd";

function TaskListSkeleton() {
  return (
    <div className="flex-1 flex flex-col gap-y-4">
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
  );
}

export default TaskListSkeleton;
