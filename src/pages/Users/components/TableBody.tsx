import { CircularProgress, TableBody as TableBodyMUI, TableCell, TablePagination, TableRow } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { AiOutlineInbox } from "react-icons/ai";
import { FaCheckCircle } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";

interface ITableBodyProps {
  data: TUserModel[];
  isLoading: boolean;
}

const LIMIT_DEFAULT = 10;
const PAGE_DEFAULT = 0;
const ROW_PER_PAGE_OPTIONS = [5, 10, 25];

function TableBody({ data, isLoading }: ITableBodyProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const p = searchParams.get("p") === null ? PAGE_DEFAULT : parseInt(searchParams.get("p") as string);
  const l = searchParams.get("l") === null ? LIMIT_DEFAULT : parseInt(searchParams.get("l") as string);
  const [page, setPage] = useState(p);
  const [rowsPerPage, setRowsPerPage] = useState(l);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
    setSearchParams({ p: newPage.toString(), l: rowsPerPage.toString() });
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    setSearchParams({ p: "0", l: event.target.value });
  };

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
      {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
        <TableRow key={row.id}>
          <TableCell className="w-[30%]">
            <div className="max-w-[280px] text-ellipsis overflow-hidden">{row.email}</div>
          </TableCell>
          <TableCell>
            <div>{row.wallet_address.substring(0, 5) + "..." + row.wallet_address.slice(-5)}</div>
          </TableCell>
          <TableCell>
            <div className="max-w-[140px] text-ellipsis overflow-hidden">{row.first_name || "--"}</div>
          </TableCell>
          <TableCell>
            <div className="max-w-[140px] text-ellipsis overflow-hidden">{row.last_name || "--"}</div>
          </TableCell>
          <TableCell align="center">
            <div className="flex justify-center">{row.is_student && <FaCheckCircle className="text-green-500 text-lg" />}</div>
          </TableCell>
        </TableRow>
      ))}
      <TableRow>
        <TablePagination
          rowsPerPageOptions={ROW_PER_PAGE_OPTIONS}
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          style={{
            borderBottom: "none",
          }}
        />
      </TableRow>
    </TableBodyMUI>
  );
}

export default TableBody;
