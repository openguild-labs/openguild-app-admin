import { Image } from "antd";
import { AiOutlineDelete } from "react-icons/ai";
import "./style.css";

interface IPreviewImageProps {
  previewImage: string;
  onClick: () => void;
  icon?: React.ReactNode;
  label?: React.ReactNode;
}

function PreviewImage({ previewImage, onClick, icon, label }: IPreviewImageProps) {
  return (
    <div className="w-full h-full flex justify-center dash-border p-2 relative wrap-image">
      <Image className="max-h-full min-h-full w-full object-cover" src={previewImage} preview={false} />
      <div className="absolute inset-2 rounded-sm bg-black bg-opacity-20 flex justify-center items-center transition-effect delete-frame">
        <div
          className="flex justify-center items-center gap-x-2 hover:cursor-pointer transition-effect bg-neutral-800 text-neutral-300 hover:bg-opacity-45 bg-opacity-20 rounded-full px-2 py-[2px] border border-white"
          onClick={onClick}
        >
          {icon !== undefined ? icon : <AiOutlineDelete className="text-light text-base" />}
          <p className="m-0 text-light text-sm xl:text-base">{label !== undefined ? label : "delete"}</p>
        </div>
      </div>
    </div>
  );
}

export default PreviewImage;
