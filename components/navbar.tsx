
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
} from "@heroui/navbar";
import { Link } from "@heroui/link";
import { Kbd } from "@heroui/kbd";
import { Input } from "@heroui/input";
import { SearchIcon, Logo } from "@/components/icons";
import { ThemeSwitch } from "@/components/theme-switch";
import Logout from "./UI/Logout";
import { title } from "./primitives";
import NextLink from "next/link";
import clsx from "clsx";

export const Navbar = () => {
  return (
    <HeroUINavbar maxWidth="xl" position="sticky" className="z-50 shadow-sm">
      {/* Left: Brand + Desktop Nav */}
      <NavbarContent justify="start" className="w-full lg:w-auto">
        <NavbarBrand>
          <NextLink href="/" className="flex items-center gap-1">
            <p className="font-bold text-inherit">
              <span className={title({ color: "blue", size: "sm" })}>Dev</span>Pulse
            </p>
          </NextLink>
        </NavbarBrand>

        <ul className="hidden lg:flex gap-6 ml-6 items-center">
          <Link size="lg" href="/">Home</Link>
          <Link size="lg" href="/dashboard">Dashboard</Link>
          <Link size="lg" href="/articles">All-Articles</Link>
        </ul>
      </NavbarContent>

      {/* Right: Search, Theme Switch, Logout */}
      <NavbarContent justify="end" className="hidden lg:flex items-center gap-4">
        <ThemeSwitch />
        <Logout />
      </NavbarContent>

      {/* Mobile Menu Toggle */}
      <NavbarContent className="flex lg:hidden items-center gap-2" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      {/* Mobile Menu */}
      <NavbarMenu className="lg:hidden pt-6">
        <div className="flex flex-col gap-4 px-4">
          <Link size="lg" href="/">Home</Link>
          <Link size="lg" href="/dashboard">Dashboard</Link>
          <Link size="lg" href="/articles">All-Articles</Link>
          <Logout />
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
