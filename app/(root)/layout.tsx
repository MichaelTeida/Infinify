import React from "react";
import Sidebar from "@/components/shared/Sidebar";
import NavMobile from "@/components/shared/NavMobile";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="root">
      <Sidebar />
      <NavMobile />
      <div className="root-container">
        <div className="wrapper">{children}</div>
      </div>
    </main>
  );
};

export default Layout;
