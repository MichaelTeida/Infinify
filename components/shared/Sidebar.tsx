"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { navControlLinks, navLinks } from "@/constants";
import { usePathname } from "next/navigation";
import LoginIcon from "@mui/icons-material/Login";

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
            <ul className="sidebar-nav_list">
              {navLinks.map((link) => {
                const isActive = link.route === pathname;

                return (
                  <li
                    key={link.route}
                    className={
                      link.available
                        ? `nav-element group ${isActive ? "nav-element-active" : "nav-element-inactive"}`
                        : "nav-element-disabled group"
                    }
                  >
                    <Link
                      href={link.route}
                      className={`${
                        link.available ? "nav-link" : "nav-link-disabled"
                      } ${isActive && "brightness-200"}`}
                    >
                      {link.icon && <link.icon />}
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <ul className="sidebar-nav_list">
              {navControlLinks.map((link) => {
                const isActive = link.route === pathname;

                return (
                  <li
                    key={link.route}
                    className={
                      link.available
                        ? `nav-element group ${isActive ? "nav-element-active" : "nav-element-inactive"}`
                        : "nav-element-disabled group"
                    }
                  >
                    <Link
                      href={link.route}
                      className={`${
                        link.available ? "nav-link" : "nav-link-disabled"
                      } ${isActive && "brightness-200"}`}
                    >
                      {link.icon && <link.icon />}
                      {link.label}
                    </Link>
                  </li>
                );
              })}
              <li className="flex-center cursor-pointer sidebar-element h-14">
                <div className="nav-link">
                  <UserButton afterSignOutUrl="/" showName />
                </div>
              </li>
            </ul>
          </SignedIn>
          <SignedOut>
            <ul className="sidebar-nav_list">
              <li className="nav-element group nav-element-active">
                <Link className="nav-link" href="/sign-in">
                  <LoginIcon />
                  Login
                </Link>
              </li>
            </ul>
          </SignedOut>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
