import { Outlet } from "react-router-dom";
import { HEADER_HEIGHT } from "../../constants/dimensions";
import Header from "./components/Header";
import Sider from "./components/Sider";

function Layout() {
  return (
    <main className="h-screen text-black bg-neutral-100">
      <article className="flex h-screen">
        <Sider />
        <div className="flex-1">
          <Header />
          <div
            className="px-5 pb-5 w-full h-full overflow-y-auto"
            style={{
              height: `calc(100% - ${HEADER_HEIGHT}px)`,
            }}
          >
            <div className="bg-white shadow-md w-full min-h-full rounded-lg p-3">
              <Outlet />
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}

export default Layout;
