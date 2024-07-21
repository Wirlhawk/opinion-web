// import { login } from "@/lib/auth";
// import { redirect } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import {
//     Card,
//     CardContent,
//     CardDescription,
//     CardFooter,
//     CardHeader,
//     CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// export default function LoginForm() {

//     return (
//         <form
//             className="w-flex grid place-items-center h-screen"
//             action={async (formData) => {
//                 "use server";
//                 await login(formData);
//             }}
//         >
//             <Card className="w-full max-w-sm bg-background">
//                 <CardHeader>
//                     <CardTitle className="text-2xl">Login</CardTitle>
//                     <CardDescription>
//                         Enter your email below to login to your account.
//                     </CardDescription>
//                 </CardHeader>
//                 <CardContent className="grid gap-4">
//                     <div className="grid gap-2">
//                         <Label htmlFor="username">Username</Label>
//                         <Input
//                             name="username"
//                             id="username"
//                             type="string"
//                             placeholder="username"
//                             required
//                         />
//                     </div>
//                     <div className="grid gap-2">
//                         <Label htmlFor="password">Password</Label>
//                         <Input
//                             name="password"
//                             id="password"
//                             type="password"
//                             required
//                             placeholder="username"
//                         />
//                     </div>
//                 </CardContent>
//                 <CardFooter>
//                     <Button className="w-full" type="submit">Sign in</Button>
//                 </CardFooter>
//             </Card>
//         </form>
//     );
// }
// "use client"
// import React, { useState } from "react";
// import { login } from "@/lib/auth";
// import { redirect } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import {
//     Card,
//     CardContent,
//     CardDescription,
//     CardFooter,
//     CardHeader,
//     CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// export default function LoginForm() {
//     const [error, setError] = useState("");
//     const [success, setSuccess] = useState(false);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError(""); // Reset error state
//         setSuccess(false); // Reset success state

//         const formData = new FormData(e.target);
//         const response = await login(formData);

//         if (response.status === 400) {
//             setError(response.error);
//         } else if (response.success) {
//             setSuccess(true);
//             // Optionally redirect or handle successful login
//             redirect("/dashboard"); // Redirect to a dashboard or other page on success
//         }
//     };

//     return (
//         <form
//             className="w-flex grid place-items-center h-screen"
//             onSubmit={handleSubmit}
//         >
//             <Card className="w-full max-w-sm bg-background">
//                 <CardHeader>
//                     <CardTitle className="text-2xl">Login</CardTitle>
//                     <CardDescription>
//                         Enter your username and password to log in.
//                     </CardDescription>
//                 </CardHeader>
//                 <CardContent className="grid gap-4">
//                     {error && <div className="text-red-500 mb-4">{error}</div>}
//                     {success && (
//                         <div className="text-green-500 mb-4">
//                             Login successful!
//                         </div>
//                     )}
//                     <div className="grid gap-2">
//                         <Label htmlFor="username">Username</Label>
//                         <Input
//                             name="username"
//                             id="username"
//                             type="text"
//                             placeholder="username"
//                             required
//                         />
//                     </div>
//                     <div className="grid gap-2">
//                         <Label htmlFor="password">Password</Label>
//                         <Input
//                             name="password"
//                             id="password"
//                             type="password"
//                             placeholder="password"
//                             required
//                         />
//                     </div>
//                 </CardContent>
//                 <CardFooter>
//                     <Button className="w-full" type="submit">
//                         Sign in
//                     </Button>
//                 </CardFooter>
//             </Card>
//         </form>
//     );
// }
"use client"
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function SignIn() {
    const router = useRouter()
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")

    const loginUser = async (e) => {
        e.preventDefault()
        signIn("credentials", {
            username,
            password,
            callbackUrl: "/",
        });

        // router.push("/")
    }

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const result = await signIn("credentials", {
    //         redirect: false,
    //         username,
    //         password,
    //     });

    //     if (result.error) {
    //         console.error(result.error);
    //     } else {
    //         // Redirect or update UI after successful login
    //         window.location.href = "/"; // Redirect to home page
    //     }
    // };

    return (
        <form onSubmit={loginUser}>
            <label>
                Username:
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </label>
            <label>
                Password:
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </label>
            <button type="submit">Sign In</button>
        </form>
    );
}
