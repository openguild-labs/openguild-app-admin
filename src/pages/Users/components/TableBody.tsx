import { CircularProgress, TableBody as TableBodyMUI, TableCell, TableRow } from "@mui/material";
import { AiOutlineInbox } from "react-icons/ai";
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
              <div className="flex flex-col items-center mt-2">
                <AiOutlineInbox size={40} />
                Have no users
              </div>
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
            <div className="max-w-[280px] text-sm md:text-base text-ellipsis overflow-hidden">{row.email}</div>
          </TableCell>
          <TableCell>
            <div className="text-sm md:text-base">{row.wallet_address.substring(0, 5) + "..." + row.wallet_address.slice(-5)}</div>
          </TableCell>
          <TableCell>
            <div className="max-w-[140px] text-sm md:text-base text-ellipsis overflow-hidden">{row.first_name || "--"}</div>
          </TableCell>
          <TableCell>
            <div className="max-w-[140px] text-sm md:text-base text-ellipsis overflow-hidden">{row.last_name || "--"}</div>
          </TableCell>
          <TableCell align="center">
            <div className="flex justify-center">{row.is_student && <FaCheckCircle className="text-green-500 text-base md:text-lg" />}</div>
          </TableCell>
        </TableRow>
      ))}
    </TableBodyMUI>
  );
}

export default TableBody;
