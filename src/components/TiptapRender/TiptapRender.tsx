interface ITiptapRenderProps {
  content: string;
}
function TiptapRender({ content }: ITiptapRenderProps) {
  return <div className="tiptap" dangerouslySetInnerHTML={{ __html: content }} />;
}

export default TiptapRender;
