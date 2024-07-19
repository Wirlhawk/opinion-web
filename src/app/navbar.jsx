
import React from "react";
import NavLink from './../components/NavLink';
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import { House, MessageCircle, Compass, UserRound } from "lucide-react";

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

const Navbar = async () => {
    const {getUser} = getKindeServerSession();
    const user = await getUser();


    return (
        <nav className="bg-secondary h-[5rem] px-10 flex border border-muted rounded-3xl mt-10 items-center justify-between">
            <h1 className="font-bold text-text text-lg">Opinion</h1>

            <div className="flex items-center gap-5 ">


                {mainRoutes.map((route,index) => {
                    return (
                        <NavLink path={route.path} key={index}>
                            {route.icon}
                        </NavLink>
                    )
                })}

                <div className="w-[2px] h-10 bg-muted"></div>
                
                <div className="flex items-center">
                    <h1 className="text-text text-lg mr-5">@{user?.username}</h1>
                    <Avatar className="w-12 h-12 border border-muted font-md">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>


            </div>
        </nav>
    );
};

export default Navbar;
