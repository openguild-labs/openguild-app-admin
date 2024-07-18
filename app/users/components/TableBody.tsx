import {
  CircularProgress,
  TableBody as TableBodyMUI,
  TableCell,
  TableRow as TableRowMUI,
} from "@mui/material";
import { Empty } from "antd";
import TableRow from "./TableRow";

interface ITableBodyProps {
  data: TUserModel[];
  isLoading: boolean;
}

function TableBody({ data, isLoading }: ITableBodyProps) {
  if (isLoading) {
    return (
      <TableBodyMUI>
        <TableRowMUI>
          <TableCell colSpan={5} style={{ borderBottom: "none" }}>
            <div className="flex justify-center">
              <CircularProgress />
            </div>
          </TableCell>
        </TableRowMUI>
      </TableBodyMUI>
    );
  }

  if (data.length === 0) {
    return (
      <TableBodyMUI>
        <TableRowMUI>
          <TableCell colSpan={5} style={{ borderBottom: "none" }}>
            <div className="flex justify-center">
              <Empty description="Have no user" />
            </div>
          </TableCell>
        </TableRowMUI>
      </TableBodyMUI>
    );
  }

  return (
    <TableBodyMUI>
      {data.map((row) => (
        <TableRow key={row.id} data={row} />
      ))}
    </TableBodyMUI>
  );
}

export default TableBody;
