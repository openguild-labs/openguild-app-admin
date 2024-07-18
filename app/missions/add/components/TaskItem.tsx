import { LuMinusCircle } from "react-icons/lu";

interface ITaskItemProps {
  taskName: string;
  onClick?: () => void;
  onDelete?: () => void;
}

function TaskItem({ taskName, onClick, onDelete }: ITaskItemProps) {
  return (
    <div
      className="flex items-center justify-between mb-2 py-1 px-2 border border-neutral-200 rounded-lg transition-effect hover:shadow-md hover:cursor-pointer w-full"
      onClick={onClick}
    >
      <span className="text-sm xl:text-base text-black font-bold text-start text-ellipsis line-clamp-1">{taskName}</span>

      <button className="p-2 ml-3" onClick={onDelete}>
        <LuMinusCircle size={20} />
      </button>
    </div>
  );
}

export default TaskItem;
