import { Outlet } from "react-router";
import Sidebar from "./SideBar";
import TopBar from "./TopBar";
const DashboardLayout = () => {
  return (
    <div className="relative min-h-screen md:flex bg-white">
      <Sidebar />
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen ">
        <TopBar />
        <div className="flex-1 p-5 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
