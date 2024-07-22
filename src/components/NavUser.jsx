import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"; // Adjust the path as needed
import { useSession } from 'next-auth/react'

const NavUser =  () => {
    const {data:session} = useSession()
    return (
        <Avatar className="w-12 h-12 border border-muted font-md">
            <AvatarImage
                src={session?.user?.picture}
            />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
    );
};

export default NavUser;
