"use client"
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link"



export default function LoginPage() {
    const router = useRouter()
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [error,setError] = useState("")

    const loginUser = async (e) => {
        e.preventDefault()

        try {
            signIn("credentials", {
                username,
                password,
                callbackUrl: "/",
            });
        } catch (e) {
            setError(e);
        }

        // router.push("/")
    }

    return (
        <form
            className="w-flex grid place-items-center h-screen"
            onSubmit={loginUser}
        >
            <Card className="w-full max-w-sm bg-background">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>Login to your account</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            name="username"
                            id="username"
                            type="string"
                            placeholder="username"
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            name="password"
                            id="password"
                            type="password"
                            required
                            placeholder="password"
                        />
                    </div>

                    <span className="flex gap-2">
                        <h1 className="text-sm text-muted">
                            {" "}
                            Dont Have an Account?
                        </h1>
                        <Link className="text-sm" href="/register">
                            Register
                        </Link>
                    </span>

                    {error && <p className="text-sm text-red-600">{error}</p>}

                </CardContent>
                <CardFooter>
                    <Button className="w-full" type="submit">
                        Sign in
                    </Button>
                </CardFooter>
            </Card>
        </form>
    );
}
