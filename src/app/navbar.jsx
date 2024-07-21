"use client"
import React from "react";
import NavLink from './../components/NavLink';
import { House, MessageCircle, Compass, UserRound } from "lucide-react";
import { usePathname } from "next/navigation";
import NavUser from "@/components/NavUser";
import { Separator } from "@/components/ui/separator";

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
        path: "/profile",
        icon: <UserRound size={24} color="white"/>,
        requiresAuth: true,
    },
];

const disabledNavbar = ["/login", "/register"];

const Navbar =  () => {
    const pathName = usePathname();

    if (disabledNavbar.includes(pathName)) {
        return null; 
    }

    return (
        <nav className="bg-secondary h-[5rem] px-10 flex border border-muted rounded-3xl mt-10 items-center justify-between">
            <h1 className="font-bold text-text text-lg">Opinion</h1>

            <div className="flex items-center gap-5">
                {mainRoutes.map((route, index) => (
                    <NavLink path={route.path} key={index}>
                        {route.icon}
                    </NavLink>
                ))}

                <div className="w-[2px] h-10 bg-muted" />
                <NavUser />
            </div>
        </nav>
    );
};

export default Navbar;

