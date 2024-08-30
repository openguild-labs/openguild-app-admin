import { REWARDS_PATH } from "@/constants/links";
import { CircularProgress, TableBody as TableBodyMUI, TableCell, TableRow } from "@mui/material";
import { Empty, Popconfirm } from "antd";
import { useRouter } from "next/navigation";
import { MdDeleteOutline } from "react-icons/md";

interface ITableBodyProps {
  data: TRewardModel[];
  isLoading: boolean;
  onDelete: (id: string) => void;
}

function TableBody({ data, isLoading, onDelete }: ITableBodyProps) {
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
          className="transition-effect hover:cursor-pointer hover:bg-gray-200 group"
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
          <TableCell
            sx={{
              width: "44px",
              padding: "4px",
            }}
          >
            <Popconfirm
              title="Delete the reward"
              description="Are you sure to delete this reward?"
              okText="Delete"
              onCancel={(event) => {
                event?.stopPropagation();
              }}
              onConfirm={(event) => {
                event?.stopPropagation();
                onDelete(String(row.id));
              }}
            >
              <div
                className="size-8 flex justify-center items-center rounded-full opacity-0 group-hover:opacity-100 transition-effect hover:bg-red-500/20"
                onClick={(event) => {
                  event.stopPropagation();
                }}
              >
                <MdDeleteOutline className="text-red-500 size-5" />
              </div>
            </Popconfirm>
          </TableCell>
        </TableRow>
      ))}
    </TableBodyMUI>
  );
}

export default TableBody;
