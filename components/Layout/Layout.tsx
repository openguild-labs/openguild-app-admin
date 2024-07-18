import Body from "./components/Body";
import Header from "./components/Header";
import Sider from "./components/Sider";

interface ILayoutProps {
  children?: React.ReactNode;
}

function Layout({ children }: ILayoutProps) {
  return (
    <main className="text-black bg-neutral-100">
      <article className="flex">
        <Sider />
        <Header />
        <Body>{children}</Body>
      </article>
    </main>
  );
}

export default Layout;
