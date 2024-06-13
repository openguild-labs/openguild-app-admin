import { LIMIT_DEFAULT, PAGE_DEFAULT } from "@/constants/pagination";
import { useAppDispatch } from "@/redux/reduxHooks";
import { setPagination } from "@/redux/slides/missionQuery";
import { Pagination as PaginationMUI } from "@mui/material";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

interface IPaginationProps {
  total: number;
}

function Pagination({ total }: IPaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const pParam = searchParams.get("p");
  const p = pParam === null ? PAGE_DEFAULT + 1 : parseInt(pParam as string);

  const [page, setPage] = useState(p);
  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
    setSearchParams({ p: newPage.toString() });
  };

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setPagination({ page: page - 1, limit: LIMIT_DEFAULT }));
  }, [dispatch, page]);

  return (
    <div className="w-full flex justify-end mt-4">
      <PaginationMUI count={Math.ceil(total / LIMIT_DEFAULT)} color="primary" page={page} onChange={handleChangePage} />
    </div>
  );
}

export default Pagination;
