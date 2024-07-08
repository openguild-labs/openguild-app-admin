import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface IMarkdownProps extends React.HTMLAttributes<HTMLDivElement> {
  children: string | null | undefined;
}

function Markdown({ children, className }: IMarkdownProps) {
  return (
    <div
      className={"markdown-body" + (className ? " " + className : "")}
      style={{
        colorScheme: "light",
      }}
      data-theme="light"
    >
      <ReactMarkdown data-theme="light" remarkPlugins={[remarkGfm]}>
        {children}
      </ReactMarkdown>
    </div>
  );
}

export default Markdown;
