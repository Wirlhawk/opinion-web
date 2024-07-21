import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function LogoutBtn() {
    return (
        <Button onClick={() => signOut({ callbackUrl: "/login" })}>
            Sign out
        </Button>
    );
}
