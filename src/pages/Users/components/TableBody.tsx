import EllipsisTypo from "@/components/EllipsisTypo";
import { CircularProgress, TableBody as TableBodyMUI, TableCell, TableRow } from "@mui/material";
import { Empty } from "antd";
import { FaCheckCircle } from "react-icons/fa";

interface ITableBodyProps {
  data: TUserModel[];
  isLoading: boolean;
}

function TableBody({ data, isLoading }: ITableBodyProps) {
  if (isLoading) {
    return (
      <TableBodyMUI>
        <TableRow>
          <TableCell colSpan={5} style={{ borderBottom: "none" }}>
            <div className="flex justify-center">
              <CircularProgress />
            </div>
          </TableCell>
        </TableRow>
      </TableBodyMUI>
    );
  }

  if (data.length === 0) {
    return (
      <TableBodyMUI>
        <TableRow>
          <TableCell colSpan={5} style={{ borderBottom: "none" }}>
            <div className="flex justify-center">
              <Empty description="Have no user" />
            </div>
          </TableCell>
        </TableRow>
      </TableBodyMUI>
    );
  }

  return (
    <TableBodyMUI>
      {data.map((row) => (
        <TableRow key={row.id}>
          <TableCell className="w-[30%]">
            <div className="max-w-[280px]">
              <EllipsisTypo text={row.email} />
            </div>
          </TableCell>
          <TableCell>
            <div className="text-sm xl:text-base">{row.wallet_address.substring(0, 5) + "..." + row.wallet_address.slice(-5)}</div>
          </TableCell>
          <TableCell>
            <div className="max-w-[140px] text-sm xl:text-base text-ellipsis overflow-hidden">{row.first_name || "--"}</div>
          </TableCell>
          <TableCell>
            <div className="max-w-[140px] text-sm xl:text-base text-ellipsis overflow-hidden">{row.last_name || "--"}</div>
          </TableCell>
          <TableCell align="center">
            <div className="flex justify-center">{row.is_student && <FaCheckCircle className="text-green-500 text-base xl:text-lg" />}</div>
          </TableCell>
        </TableRow>
      ))}
    </TableBodyMUI>
  );
}

export default TableBody;
