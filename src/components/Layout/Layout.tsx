import { Outlet } from "react-router-dom";
import { HEADER_HEIGHT } from "../../constants/dimensions";
import Header from "./components/Header";
import Sider from "./components/Sider";

function Layout() {
  return (
    <main className="h-screen text-black bg-neutral-100">
      <article className="flex h-screen shrink-0">
        <Sider />
        <div className="w-full">
          <Header />
          <div
            className="px-5 pb-5 w-full h-screen overflow-y-scroll flex"
            style={{
              paddingTop: HEADER_HEIGHT,
            }}
          >
            <div className="w-full flex-1 flex flex-col mt-5">
              <Outlet />
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}

export default Layout;
