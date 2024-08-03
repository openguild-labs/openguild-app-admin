import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Mention from "@tiptap/extension-mention";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { forwardRef, Ref, useEffect, useImperativeHandle, useState } from "react";
import { Button, Modal, Upload, UploadFile, UploadProps } from "antd";
import { CiImageOn } from "react-icons/ci";
import { FiPlus } from "react-icons/fi";
import { resizeFile } from "@/utils/file";
import { RichTextLink } from "./rich-text-link";

export const TIPTAP_EMPTY_STRING = "<p></p>";

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
  Image.configure({
    inline: true,
    allowBase64: true,
  }),
  Mention.configure({
    HTMLAttributes: {
      class: "mention",
    },
  }),
  TaskList,
  TaskItem.configure({
    nested: true,
  }),
  Table.configure({
    resizable: true,
  }),
  TableRow,
  TableHeader,
  TableCell,
  RichTextLink,
];

interface ITipTapProps {
  content?: string;
  setContent?: (content: string) => void;
  className?: string;
  placeholder?: string;
  style?: React.CSSProperties | undefined;
  editable?: boolean;
}

export type TTipTap = {
  cancel: (content: string) => void;
};

const TipTap = forwardRef(function TipTap(
  { content, editable = true, setContent, className, placeholder, style }: ITipTapProps,
  ref: Ref<TTipTap>
) {
  const editor = useEditor({
    extensions: [
      ...extensions,
      Placeholder.configure({
        // Use a placeholder:
        placeholder,
      }),
    ],
    content,
    onUpdate({ editor }) {
      if (setContent) setContent(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: className || "",
      },
    },
  });

  useImperativeHandle(ref, () => ({
    cancel(content) {
      editor
        ?.chain()
        .setContent(content || "")
        .run();
    },
  }));

  const [openModal, setOpenModal] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  useEffect(() => {
    if (!editable && editor) editor.chain().blur().run();
  }, [editable, editor]);

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => setFileList(newFileList);
  const onCancel = () => {
    setOpenModal(false);
    setFileList([]);
  };
  return (
    <div
      className="border border-neutral-300 p-2 rounded-lg relative"
      style={{
        ...style,
        padding: editable ? "" : "0px",
        borderColor: editable ? "" : "transparent",
      }}
    >
      <EditorContent editor={editor} />
      {editable && <Button icon={<CiImageOn size={20} />} className="h-6 !w-6 absolute top-2 right-2" onClick={() => setOpenModal(true)} />}
      <Modal
        centered
        title="Upload description images"
        closeIcon={null}
        open={openModal}
        onCancel={onCancel}
        onOk={async () => {
          if (fileList.length > 0) {
            for (const file of fileList) {
              const resizedFile = await resizeFile(file.originFileObj as Blob);
              editor?.chain().focus().setImage({ src: resizedFile }).run();
            }

            onCancel();
          }
        }}
      >
        <Upload
          customRequest={({ onSuccess }) => {
            if (onSuccess) {
              onSuccess("ok");
            }
          }}
          multiple
          accept="image/*"
          className="h-full ant-upload-no-preview"
          listType="picture-card"
          fileList={fileList}
          onChange={handleChange}
        >
          <button type="button" className="border-0 bg-transparent flex flex-col items-center justify-center">
            <FiPlus size={16} />
            <span className="mt-1 text-sm xl:text-base">Upload</span>
          </button>
        </Upload>
      </Modal>
    </div>
  );
});

export default TipTap;
