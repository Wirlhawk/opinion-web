import { HomeIcon, ChatBubbleIcon, MagnifyingGlassIcon, PersonIcon, ExitIcon } from "@radix-ui/react-icons";
import React from "react";
import NavLink from './../components/NavLink';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link";
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";


const mainRoutes = [
    {
        path: "/",
        name: "Home",
        icon: <HomeIcon />,
        requiresAuth: true,
    },
    {
        path: "post",
        name: "Post",
        icon: <ChatBubbleIcon />,
        requiresAuth: true,
    },
    {
        path: "explore",
        name: "Explore",
        icon: <MagnifyingGlassIcon />,
        requiresAuth: true,
    },
    {
        path: "profile",
        name: "Profile",
        icon: <PersonIcon />,
        requiresAuth: true,
    },

];

const Navbar = async () => {

    const {getUser} = getKindeServerSession();
    const user = await getUser();


    return (
        <aside className="hidden sm:flex h-screen min-w-[200px] py-10 px-4 bg-zinc-950 flex-col text-zinc-50 text-sm gap-2 border-r-zinc-500/10 border-r font-medium">
            {mainRoutes.map((route,index) => {
                return (
                    <NavLink path={route.path} key={index}>
                        {route.icon}
                        {route.name}
                    </NavLink>
                )
            })}

            <Link href="/profile" className="mt-auto bg-zinc-500/20 h-100 w-full p-3 rounded-lg ">
                <div className="flex gap-3 items-center">
                    <Avatar className="w-8 h-8">
                        <AvatarImage src={user?.picture} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <h1 className="font-medium text-xs">@{user?.username}</h1>
                </div>
            </Link>
        </aside>
    );
};

export default Navbar;
