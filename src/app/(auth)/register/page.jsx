"use client"
import { register } from "@/lib/auth";
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
import Link from "next/link"
import { useState } from "react";



export default function RegisterPage() {
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    return (
        <form
            className="w-flex grid place-items-center h-screen"
            action={async (FormData) => {
                const result = await register(FormData);

                setError("");
                setSuccess(false);

                if (result?.error) {
                    setError(result.error);
                } else {
                    setSuccess(true);
                }
            }}
        >
            <Card className="w-full max-w-sm bg-background">
                <CardHeader>
                    <CardTitle className="text-2xl">
                        Create New Account
                    </CardTitle>
                    <CardDescription>
                        Fill form below to create new account.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
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
                            Already Have an Account?
                        </h1>
                        <Link className="text-sm" href="/login">
                            Log in
                        </Link>
                    </span>

                    {error && <p className="text-sm text-red-600">{error}</p>}

                    {success && (
                        <p className="text-sm text-green-600">
                            Account Has Been Created
                        </p>
                    )}
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
