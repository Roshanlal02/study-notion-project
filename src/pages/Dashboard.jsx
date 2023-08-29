import React from "react";
import { useSelector } from "react-redux";
import Sidebar from "../components/core/Dashboard/Sidebar";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Dashboard = () => {
  const { loading: authLoading } = useSelector((state) => state.auth);
  const { loading: profileLoading } = useSelector((state) => state.profile);
  const location = useLocation();

  console.log(location.pathname.split("/").slice(-1).toString());

  const routeName = () => {
    let locationPathname;
    locationPathname = location.pathname.split("/").slice(-1).toString();
    if (locationPathname.includes("-")) {
      return locationPathname.replace("-", " ");
    } else {
      return locationPathname;
    }
  };

  if (profileLoading || authLoading) {
    return <div className="mt-10 spinner"></div>;
  }

  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)]">
      <Sidebar />
      <div className="h-[calc(100vh-3.5rem)] overflow-auto w-full">
        <div className="mx-3.5 w-11/12 max-w-[1000px] py-10 px-6">
          <p className="text-richblack-300 pb-3 capitalize">
            Home <span className="px-2">/</span> Dashboard{" "}
            <span className="px-2">/</span> <span className="text-yellow-50">{routeName()}</span>
          </p>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
