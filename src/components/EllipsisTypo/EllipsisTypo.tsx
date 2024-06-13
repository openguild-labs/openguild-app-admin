import { Typography } from "antd";
import { useResizeDetector } from "react-resize-detector";

interface IEllipsisTypoProps {
  text: React.ReactNode;
}

function EllipsisTypo({ text }: IEllipsisTypoProps) {
  const { width, ref } = useResizeDetector();
  return (
    <div className="flex-1" ref={ref}>
      <Typography.Paragraph
        ellipsis={{
          rows: 1,
        }}
        className="ant-typo-mb-0 text-sm md:text-base"
        style={{
          width: width ? width - 20 : "auto",
        }}
      >
        {text}
      </Typography.Paragraph>
    </div>
  );
}

export default EllipsisTypo;
