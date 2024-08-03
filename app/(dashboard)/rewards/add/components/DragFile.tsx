import PreviewImage from "@/components/PreviewImage";
import { getBase64 } from "@/utils/file";
import { Form, UploadFile, Upload, FormInstance } from "antd";
import { RcFile } from "antd/es/upload";
import { useEffect, useState } from "react";
import { HiOutlineInbox } from "react-icons/hi2";

interface IDragFileProps {
  form: FormInstance;
  validation: number;
}

const { Dragger } = Upload;

function DragFile({ form, validation }: IDragFileProps) {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [previewImage, setPreviewImage] = useState("");
  const [isError, setIsError] = useState(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }
    setPreviewImage(file.url || (file.preview as string));
  };

  useEffect(() => {
    if (validation > 0 && files.length === 0) {
      setIsError(true);
    }
  }, [validation, files.length]);

  return (
    <div className="w-full flex flex-col">
      <h4 className="text-base xl:text-lg text-black font-bold">Image</h4>
      <div className="w-full aspect-square">
        {files.length === 0 ? (
          <Form.Item
            name="image"
            className="form-item-dragger-square"
            getValueFromEvent={(event) => {
              return event?.fileList;
            }}
            rules={[
              {
                required: true,
                message: "Reward must have an image",
              },
            ]}
            style={{
              height: "100%",
            }}
          >
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
                form.setFieldValue("image", info.fileList[0]);
                handlePreview(info.fileList[0]);
              }}
              className={`${isError ? "ant-upload-btn-error" : undefined}`}
              style={{
                width: "100%",
                height: "100%",
              }}
            >
              <div className="flex flex-col items-center gap-y-2">
                <p className="text-[32px]">
                  <HiOutlineInbox />
                </p>
                <p className="text-sm xl:text-base">Click or drag file to this area to upload Reward image</p>
              </div>
            </Dragger>
          </Form.Item>
        ) : (
          <PreviewImage
            previewImage={previewImage}
            onClick={() => {
              setFiles([]);
              form.setFieldValue("banner", undefined);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default DragFile;
