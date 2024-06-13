import Body from "./components/Body";
import Header from "./components/Header";
import Sider from "./components/Sider";

function Layout() {
  return (
    <main className="text-black bg-neutral-100">
      <article className="flex">
        <Sider />
        <Header />
        <Body />
      </article>
    </main>
  );
}

export default Layout;
