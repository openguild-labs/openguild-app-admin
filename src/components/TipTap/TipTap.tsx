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
import Placeholder from "@tiptap/extension-placeholder";

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
];

interface ITipTapProps {
  content?: string;
  setContent?: (content: string) => void;
  editable?: boolean;
  className?: string;
  placeholder?: string;
  style?: React.CSSProperties | undefined;
}

function TipTap({ content, setContent, editable, className, placeholder, style }: ITipTapProps) {
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

  return (
    <div
      className="border border-neutral-300 p-2 rounded-lg"
      style={{
        padding: editable ? "0.5rem" : "0",
        borderColor: editable ? "#d4d4d4" : "transparent",
        ...style,
      }}
    >
      <EditorContent editor={editor} />
    </div>
  );
}

export default TipTap;
