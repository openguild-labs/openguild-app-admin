import { Navigate, RouteObject, useRoutes } from "react-router-dom";
import Layout from "./components/Layout";
import NotFound from "./pages/NotFound";
import Users from "./pages/Users";
import Missions from "./pages/Missions";
import MissionsLayout from "./components/MissionsLayout";
import MissionCreation from "./pages/MissionCreation";
import { ADD_MISSION_PATH, HOME_PATH, MISSION_DETAILS_PATH, MISSIONS_PATH, USERS_PATH } from "./constants/links";
import MissionDetails from "./pages/MissionDetails";

function App() {
  const routes: RouteObject[] = [
    {
      path: HOME_PATH,
      element: <Layout />,
      children: [
        { path: USERS_PATH, element: <Users /> },
        {
          path: MISSIONS_PATH,
          element: <MissionsLayout />,
          children: [
            { path: MISSIONS_PATH, element: <Missions /> },
            { path: ADD_MISSION_PATH, element: <MissionCreation /> },
            { path: MISSION_DETAILS_PATH, element: <MissionDetails /> },
          ],
        },
        { path: "/", element: <Navigate to={USERS_PATH} replace /> },
      ],
    },
    { path: "*", element: <NotFound /> },
  ];
  return useRoutes(routes);
}

export default App;
