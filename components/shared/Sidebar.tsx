import React from "react";
import Link from "next/link";
import Image from "next/image";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-container">
        <Link href="/" className="sidebar-logo">
          <Image
            src="/assets/images/LOGO Infinify text 329x83.webp"
            alt="Logo"
            width={190}
            height={50}
          />
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
