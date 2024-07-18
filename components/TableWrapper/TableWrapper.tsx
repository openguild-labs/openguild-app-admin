import { HTMLAttributes } from "react";

function TableWrapper({ children }: HTMLAttributes<HTMLDivElement>) {
  return <div className="rounded-t-md overflow-auto">{children}</div>;
}

export default TableWrapper;
