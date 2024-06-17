import { MISSIONS_PATH } from "@/constants/links";
import { CircularProgress, TableBody as TableBodyMUI, TableCell, TableRow } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Empty } from "antd";
import EllipsisTypo from "@/components/EllipsisTypo";

interface ITableBodyProps {
  data: TMissionResponse[];
  isLoading: boolean;
}

function TableBody({ data, isLoading }: ITableBodyProps) {
  const navigate = useNavigate();
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
              <Empty description="Have no mission" />
            </div>
          </TableCell>
        </TableRow>
      </TableBodyMUI>
    );
  }

  return (
    <TableBodyMUI>
      {data.map((row) => (
        <TableRow
          key={row.id}
          className="transition-effect hover:cursor-pointer hover:bg-gray-200"
          onClick={() => {
            navigate(`${MISSIONS_PATH}/${row.id}`);
          }}
        >
          <TableCell className="w-[40%]">
            <EllipsisTypo text={row.title} />
          </TableCell>
          <TableCell>
            <div className="text-sm xl:text-base">{row.status}</div>
          </TableCell>
          <TableCell>
            <div className="text-sm xl:text-base text-ellipsis overflow-hidden">{row.participants}</div>
          </TableCell>
          <TableCell>
            <div className="text-sm xl:text-base text-ellipsis overflow-hidden">{row.created_at}</div>
          </TableCell>
        </TableRow>
      ))}
    </TableBodyMUI>
  );
}

export default TableBody;
