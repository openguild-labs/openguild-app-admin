import { Form, FormInstance, Upload } from "antd";
import { RcFile, UploadFile } from "antd/es/upload";
import { useEffect, useState } from "react";
import { HiOutlineInbox } from "react-icons/hi2";
import PreviewImage from "@/components/PreviewImage";
import { getBase64 } from "@/utils/file";

interface IDragFileProps {
  form: FormInstance;
}

const { Dragger } = Upload;

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
        <PreviewImage
          previewImage={previewImage}
          onClick={() => {
            setFiles([]);
            form.setFieldValue("banner", undefined);
          }}
        />
      )}
    </div>
  );
}

export default DragFile;
