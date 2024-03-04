"use client";

import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import MenuIcon from "@mui/icons-material/Menu";
import { navControlLinks, navLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

const NavMobile = () => {
  const pathname = usePathname();

  return (
    <header className="header">
      <Link href="/" className="header-content">
        <Image
          src="/assets/images/LOGO Infinify text 329x83.webp"
          alt="Infinify logo"
          width={140}
          height={30}
        />
      </Link>
      <nav className="header-content">
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
          <Sheet>
            <SheetTrigger>
              <MenuIcon className="nav-menu_icon" />
            </SheetTrigger>
            <SheetContent className="header-nav_content">
              <div>
                <Image
                  src="/assets/images/LOGO Infinify text 329x83.webp"
                  alt="Infinify logo"
                  width={140}
                  height={30}
                  className="mt-4 ml-6"
                />
                <ul className="header-nav_list">
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
              </div>

              <ul className="header-nav_list">
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
            </SheetContent>
          </Sheet>
        </SignedIn>

        <SignedOut>
          <Button asChild className="gradient-background bg-cover">
            <Link href="/sign-in">Login</Link>
          </Button>
        </SignedOut>
      </nav>
    </header>
  );
};

export default NavMobile;
