"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { navControlLinks, navLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

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
                    className={
                      link.available
                        ? `sidebar-element group ${isActive ? "sidebar-element-active" : "sidebar-element-inactive"}`
                        : "sidebar-element-disabled group"
                    }
                  >
                    <Link
                      href={link.route}
                      className={`${
                        link.available
                          ? "sidebar-link"
                          : "sidebar-link-disabled"
                      } ${isActive && "brightness-200"}`}
                    >
                      {link.icon && <link.icon />}
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <ul className="sidebar-list">
              {navControlLinks.map((link) => {
                const isActive = link.route === pathname;

                return (
                  <li
                    key={link.route}
                    className={
                      link.available
                        ? `sidebar-element group ${isActive ? "sidebar-element-active" : "sidebar-element-inactive"}`
                        : "sidebar-element-disabled group"
                    }
                  >
                    <Link
                      href={link.route}
                      className={`${
                        link.available
                          ? "sidebar-link"
                          : "sidebar-link-disabled"
                      } ${isActive && "brightness-200"}`}
                    >
                      {link.icon && <link.icon />}
                      {link.label}
                    </Link>
                  </li>
                );
              })}
              <li className="flex-center cursor-pointer sidebar-element">
                <div className="sidebar-link">
                  <UserButton afterSignOutUrl="/" showName />
                </div>
              </li>
            </ul>
          </SignedIn>
          <SignedOut>
            <Button asChild className="gradient-background bg-cover">
              <Link href="/sign-in">Login</Link>
            </Button>
          </SignedOut>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
