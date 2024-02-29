"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SignedIn } from "@clerk/nextjs";
import { navLinks } from "@/constants";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

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
        <nav className="sidebar-nav">
          <SignedIn>
            <ul className="sidebar-list">
              {navLinks.map((link) => {
                const isActive = link.route === pathname;

                return (
                  <li
                    key={link.route}
                    className={`sidebar-element group ${isActive ? "bg-orange-500 text-white" : "text-gray-800"}`}
                  >
                    {link.label}
                  </li>
                );
              })}
            </ul>
          </SignedIn>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
