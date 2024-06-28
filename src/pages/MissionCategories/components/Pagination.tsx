import { LIMIT_DEFAULT, PAGE_DEFAULT } from "@/constants/pagination";
import { useAppDispatch } from "@/redux/reduxHooks";
import { setPagination } from "@/redux/slides/missionCategoryQuery";
import { useCountMissionCategories } from "@/supabase/api/missionCategory/service";
import { Pagination as PaginationMUI } from "@mui/material";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function Pagination() {
  const [searchParams, setSearchParams] = useSearchParams();
  const pParam = searchParams.get("p");
  const p = pParam === null ? PAGE_DEFAULT + 1 : parseInt(pParam as string);

  const { data } = useCountMissionCategories();
  const total = data || 0;

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
    <div className="w-full flex items-center justify-end mt-4">
      <span className="text-sm xl:text-base">Have {total} categories</span>
      <div className="w-[2px] rounded-full h-6 bg-primary-color mr-1 ml-3" />
      <PaginationMUI count={Math.ceil(total / LIMIT_DEFAULT)} color="primary" page={page} onChange={handleChangePage} />
    </div>
  );
}

export default Pagination;
