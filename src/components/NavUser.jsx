import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"; // Adjust the path as needed
// import { getServerSession } from 'next-auth'
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { useSession } from 'next-auth/react'

const NavUser =  () => {
    // const session = await getServerSession(authOptions);
    // const { user } = session
    const {data:session} = useSession()
    return (
        <Avatar className="w-12 h-12 border border-muted font-md">
            <AvatarImage
                src={session?.user?.picture || "https://github.com/shadcn.png"}
            />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
    );
};

export default NavUser;
