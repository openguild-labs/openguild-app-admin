import { HTMLAttributes } from "react";

function TableWrapper({ children }: HTMLAttributes<HTMLDivElement>) {
  return <div className="rounded-t-md overflow-auto max-h-[520px]">{children}</div>;
}

export default TableWrapper;
