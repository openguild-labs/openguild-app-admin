"use client";
import TableWrapper from "@/components/TableWrapper";
import { Table, TableContainer } from "@mui/material";
import TableHeader from "./components/TableHeader";
import { useListMissions } from "@/supabase/api/mission/services";
import TableBody from "./components/TableBody";
import { useAppSelector } from "@/redux/reduxHooks";
import { missionQueryStore } from "@/redux/slides/missionQuery";
import Pagination from "./components/Pagination";
import { Suspense } from "react";

function Missions() {
  const missionQuery = useAppSelector(missionQueryStore);
  const { data, isLoading } = useListMissions(missionQuery);
  return (
    <div className="flex-1 flex flex-col">
      <TableContainer component={TableWrapper}>
        <Table aria-label="mission table">
          <TableHeader />
          <TableBody data={data?.list || []} isLoading={isLoading} />
        </Table>
      </TableContainer>
      <Suspense>
        <Pagination total={data?.total || 0} />
      </Suspense>
    </div>
  );
}

export default Missions;
