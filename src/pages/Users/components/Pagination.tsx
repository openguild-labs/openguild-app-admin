import { useAppDispatch } from "@/redux/reduxHooks";
import { setPagination } from "@/redux/slides/userFilter";
import { TablePagination } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

interface IPaginationProps {
  total: number;
}

const LIMIT_DEFAULT = 10;
const PAGE_DEFAULT = 0;
const ROW_PER_PAGE_OPTIONS = [5, 10];

function Pagination({ total }: IPaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const p = searchParams.get("p") === null ? PAGE_DEFAULT : parseInt(searchParams.get("p") as string);
  let l = searchParams.get("l") === null ? LIMIT_DEFAULT : parseInt(searchParams.get("l") as string);
  if (!ROW_PER_PAGE_OPTIONS.includes(l)) {
    l = LIMIT_DEFAULT;
  }

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

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setPagination({ limit: rowsPerPage, page }));
  }, [dispatch, page, rowsPerPage]);

  return (
    <table className="w-full flex justify-end">
      <tbody>
        <tr>
          <TablePagination
            className="w-full"
            labelRowsPerPage="Limit"
            rowsPerPageOptions={ROW_PER_PAGE_OPTIONS}
            count={total}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            style={{
              borderBottom: "none",
            }}
          />
        </tr>
      </tbody>
    </table>
  );
}

export default Pagination;
