import TopBar from "./TopBar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <TopBar mode="view" />
      <main className="app-page">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;