import { HTMLAttributes } from "react";

function TableWrapper({ children }: HTMLAttributes<HTMLDivElement>) {
  return <div className="rounded-t-md overflow-auto relative">{children}</div>;
}

export default TableWrapper;
