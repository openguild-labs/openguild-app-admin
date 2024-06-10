import { Form, FormInstance, Image, Upload } from "antd";
import { RcFile, UploadFile } from "antd/es/upload";
import { useEffect, useState } from "react";
import { HiOutlineInbox } from "react-icons/hi2";
import { AiOutlineDelete } from "react-icons/ai";
import "./style.css";

interface IDragFileProps {
  form: FormInstance;
}

const { Dragger } = Upload;

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

function DragFile({ form }: IDragFileProps) {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [previewImage, setPreviewImage] = useState("");

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }
    setPreviewImage(file.url || (file.preview as string));
  };

  useEffect(() => {
    const banner = form.getFieldValue("banner") as UploadFile | undefined;
    if (banner) {
      setFiles([banner]);
      handlePreview(banner);
    }
  }, [form]);

  return (
    <div className="h-[320px] flex flex-col">
      {files.length === 0 ? (
        <Form.Item
          name="banner"
          className="h-full form-item-dragger"
          getValueFromEvent={(event) => {
            return event?.fileList;
          }}
          rules={[
            {
              required: true,
              message: "Mission must have a banner",
            },
          ]}
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
              form.setFieldValue("banner", info.fileList[0]);
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
        </Form.Item>
      ) : (
        <div className="w-full flex justify-center dash-border p-2 relative wrap-image">
          <Image className="min-h-[320px] max-h-[320px] object-cover" src={previewImage} preview={false} />
          <div className="absolute inset-2 rounded-sm bg-black bg-opacity-20 flex justify-center items-center transition-effect delete-frame">
            <div
              className="flex justify-center items-center hover:cursor-pointer transition-effect bg-neutral-800 text-neutral-300 hover:bg-opacity-45 bg-opacity-20 rounded-full px-2 py-1"
              onClick={() => {
                setFiles([]);
                form.setFieldValue("banner", undefined);
              }}
            >
              <AiOutlineDelete className="text-light text-base" />
              <p className="m-0 ml-2 text-light">delete</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DragFile;
