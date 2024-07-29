"use client";
import React from "react";
import NavLink from "./../components/NavLink";
import { House, MessageCircle, Compass, UserRound } from "lucide-react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Separator } from "@/components/ui/separator";
import SearchInput from "@/components/SearchInput";

const mainRoutes = [
    {
        path: "/",
        icon: <House size={24} color="white" />,
        requiresAuth: true,
    },
    {
        path: "/post",
        icon: <MessageCircle size={24} color="white" />,
        requiresAuth: true,
    },
    {
        path: "/explore",
        icon: <Compass size={24} color="white" />,
        requiresAuth: true,
    },
    {
        path: `/profile`,
        icon: <UserRound size={24} color="white" />,
        requiresAuth: true,
    },
];

const disabledNavbar = ["/login", "/register"];

const Navbar = () => {
    const pathName = usePathname();
    const { data: session } = useSession();

    session ? mainRoutes[3].path = `/profile/${session.user.username}` : null

    if (disabledNavbar.includes(pathName)) {
        return null;
    }

    return (
        <nav className="bg-secondary h-[5rem] px-10 flex border border-muted rounded-2xl mt-10 items-center justify-between">
            <div className="flex items-center gap-10">
                <h1 className="font-bold text-text text-lg hidden md:block ">
                    Opinion
                </h1>
                <SearchInput className="hidden sm:block" />
            </div>

            <div className="flex items-center gap-5 w-full justify-between sm:w-auto sm:justify-auto">
                {mainRoutes.map((route, index) => (
                    <NavLink path={route.path} key={index}>
                        {route.icon}
                    </NavLink>
                ))}
            </div>
        </nav>
    );
};

export default Navbar;
