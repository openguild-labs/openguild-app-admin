import { Navigate, RouteObject, useRoutes } from "react-router-dom";
import Layout from "./components/Layout";
import NotFound from "./pages/NotFound";
import Users from "./pages/Users";
import Missions from "./pages/Missions";

function App() {
  const routes: RouteObject[] = [
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/users", element: <Users /> },
        { path: "/missions", element: <Missions /> },
        { path: "/", element: <Navigate to="/users" replace /> },
      ],
    },
    { path: "*", element: <NotFound /> },
  ];
  return useRoutes(routes);
}

export default App;
