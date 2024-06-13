import { Button } from "antd";
import { FaCheck } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";

interface IFloatButtonsProps {
  onSave: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

function FloatButtons({ onSave, onCancel, isLoading }: IFloatButtonsProps) {
  return (
    <div className="flex absolute -top-9 right-0 gap-x-1 z-10">
      <Button
        className="aspect-square p-0 flex-center"
        onClick={(e) => {
          e.stopPropagation();
          onCancel();
        }}
      >
        <MdOutlineCancel className="text-base text-red-500" />
      </Button>
      <Button
        className="aspect-square p-0 flex-center"
        onClick={(e) => {
          e.stopPropagation();
          onSave();
        }}
        loading={isLoading}
      >
        {!isLoading && <FaCheck className="text-base text-green-500" />}
      </Button>
    </div>
  );
}

export default FloatButtons;
