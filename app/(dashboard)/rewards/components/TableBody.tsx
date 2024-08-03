import { REWARDS_PATH } from "@/constants/links";
import { CircularProgress, TableBody as TableBodyMUI, TableCell, TableRow } from "@mui/material";
import { Empty } from "antd";
import { useRouter } from "next/navigation";

interface ITableBodyProps {
  data: TRewardModel[];
  isLoading: boolean;
}

function TableBody({ data, isLoading }: ITableBodyProps) {
  const router = useRouter();
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
              <Empty description="Have no reward" />
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
            router.push(`${REWARDS_PATH}/${row.id}`);
          }}
        >
          <TableCell className="w-[40%]">
            <span className="text-start text-ellipsis line-clamp-1">{row.name}</span>
          </TableCell>
          <TableCell>
            <div className="text-sm xl:text-base">{row.type}</div>
          </TableCell>
          <TableCell>
            <div className="text-sm xl:text-base text-ellipsis line-clamp-1 overflow-hidden">
              {row.quantity === 0 ? <span className="text-2xl leading-4">∞</span> : row.quantity}
            </div>
          </TableCell>
          <TableCell>
            <div className="text-sm xl:text-base text-ellipsis line-clamp-1 overflow-hidden">{row.created_at.split("T")[0]}</div>
          </TableCell>
        </TableRow>
      ))}
    </TableBodyMUI>
  );
}

export default TableBody;
