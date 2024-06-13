import PreviewImage from "@/components/PreviewImage";
import { getBase64 } from "@/utils/file";
import { Upload, UploadFile } from "antd";
import { RcFile } from "antd/es/upload";
import { useState } from "react";
import { HiOutlineInbox } from "react-icons/hi2";
import { RxUpdate } from "react-icons/rx";
import FloatButtons from "./FloatButtons";
import { useUpdateBanner } from "@/supabase/api/mission/services";

interface IMissionBannerProps {
  bannerURL: string;
  banner: string;
  missionID: string;
  refetch: () => void;
}

const { Dragger } = Upload;

function MissionBanner({ bannerURL, banner, missionID, refetch }: IMissionBannerProps) {
  const { mutate, isPending } = useUpdateBanner();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [previewImage, setPreviewImage] = useState(bannerURL);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }
    setPreviewImage(file.url || (file.preview as string));
  };

  const onSave = () => {
    if (files.length === 0) {
      onCancel();
      return;
    }

    mutate(
      {
        missionID,
        oldBanner: banner,
        file: files[0],
      },
      {
        onSuccess: () => {
          setEditMode(false);
          setFiles([]);
          refetch();
        },
      }
    );
  };

  const onCancel = () => {
    setPreviewImage(bannerURL);
    setFiles([]);
    setEditMode(false);
  };

  if (!editMode) {
    return (
      <div className="p-2 w-full aspect-square">
        <PreviewImage
          previewImage={previewImage}
          onClick={() => {
            setEditMode(true);
          }}
          icon={<RxUpdate />}
          label="change"
        />
      </div>
    );
  }

  return (
    <div className="p-2 w-full aspect-square">
      <div className="w-full h-full relative">
        <FloatButtons onSave={onSave} onCancel={onCancel} isLoading={isPending} />
        {files.length === 0 ? (
          <Dragger
            customRequest={({ onSuccess }) => {
              if (onSuccess) {
                onSuccess("ok");
              }
            }}
            fileList={files}
            accept="image/*"
            onChange={(info) => {
              setFiles(info.fileList);
              handlePreview(info.fileList[0]);
            }}
            className="h-full"
          >
            <div className="flex flex-col items-center">
              <p className="text-[24px]">
                <HiOutlineInbox />
              </p>
              <p>Click or drag file to this area to upload Mission banner</p>
            </div>
          </Dragger>
        ) : (
          <PreviewImage
            previewImage={previewImage}
            onClick={() => {
              setFiles([]);
            }}
            icon={<RxUpdate />}
            label="change"
          />
        )}
      </div>
    </div>
  );
}

export default MissionBanner;
