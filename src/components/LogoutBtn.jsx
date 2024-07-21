"use client"
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function LogoutBtn({...props}) {
    return (
        <Button {...props} onClick={() => signOut({ callbackUrl: "/login" })}>
            Logout
        </Button>
    );
}
