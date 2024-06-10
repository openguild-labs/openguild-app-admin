import { ADD_MISSION_PATH, MISSIONS_PATH } from "@/constants/links";
import { Breadcrumbs, Button, Link, Typography } from "@mui/material";
import { GrFormAdd } from "react-icons/gr";
import { Outlet, useLocation } from "react-router-dom";
import { GoChevronRight } from "react-icons/go";

function MissionsLayout() {
  const { pathname } = useLocation();
  return (
    <div className="flex-1 flex flex-col">
      <div className="flex items-center justify-between h-10 mb-4">
        <div className="flex items-end">
          <h1 className="text-primary-color font-bold text-2xl md:text-3xl pr-3 mr-3 border-r-2 border-primary-color">Mission</h1>
          <Breadcrumbs separator={<GoChevronRight />} aria-label="breadcrumb">
            {pathname === ADD_MISSION_PATH && (
              <Link underline="hover" color="inherit" href={MISSIONS_PATH}>
                <span className="text-base md:text-lg">list</span>
              </Link>
            )}
            <Typography color="text.primary">
              <span className="font-bold text-lg">{pathname === ADD_MISSION_PATH ? "add" : "list"}</span>
            </Typography>
          </Breadcrumbs>
        </div>
        {pathname === MISSIONS_PATH && (
          <Button
            variant="contained"
            href={ADD_MISSION_PATH}
            sx={{
              borderRadius: "0.5rem",
              padding: "0.5rem 1.25rem",
              cursor: "pointer",
            }}
            startIcon={<GrFormAdd />}
          >
            <span className="lowercase text-sm md:text-base font-normal">Add mission</span>
          </Button>
        )}
      </div>
      <div className="bg-white shadow-md rounded-lg p-3 flex-1">
        <Outlet />
      </div>
    </div>
  );
}

export default MissionsLayout;
