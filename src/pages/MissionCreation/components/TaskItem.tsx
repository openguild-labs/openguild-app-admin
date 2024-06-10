import { LuMinusCircle } from "react-icons/lu";
import { useResizeDetector } from "react-resize-detector";

interface ITaskItemProps {
  taskName: string;
  onClick?: () => void;
  onDelete?: () => void;
}

function TaskItem({ taskName, onClick, onDelete }: ITaskItemProps) {
  const { width, ref } = useResizeDetector();
  return (
    <div className="flex pb-2">
      <div
        className="py-1 px-2 flex-1 border border-neutral-200 flex rounded-lg transition-effect hover:shadow-md hover:cursor-pointer"
        ref={ref}
        onClick={onClick}
      >
        <h4
          className="text-base text-black font-bold mb-1 text-ellipsis overflow-hidden"
          style={{
            width: width ? width - 20 : "auto",
          }}
        >
          {taskName}
        </h4>
      </div>
      <button className="p-2 ml-3" onClick={onDelete}>
        <LuMinusCircle size={20} />
      </button>
    </div>
  );
}

export default TaskItem;
