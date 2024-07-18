import prisma from "@/lib/db";
import SubmitBtn from "./../components/submit-btn";
import { getPost, addPost } from "./action";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";




export default async function Home() {
    const posts = await getPost()
    const {isAuthenticated} = getKindeServerSession();
    const isLoggedIn = await isAuthenticated()

    if(!isLoggedIn){
        redirect("/api/auth/login?post_login_redirect_url=/");
    }

    return (
        <main className="w-full flex min-h-screen flex-col items-center justify-start">
            <LogoutLink>Log out</LogoutLink>
            <form className="flex flex-col w-96" action={addPost}>
                <input
                    type="text"
                    name="body"
                    placeholder="Body..."
                    className="border-zinc-400 border-solid border rounded-lg h-10 px-3"
                    required
                />
                <SubmitBtn />
            </form>

            <div className="flex flex-col gap-3 mt-10">
                <h1>All Post</h1>
                {posts.map((post) => {
                    return (
                        <div
                            className=" bg-slate-200 p-3 w-96 rounded-lg flex flex-col gap-3"
                            key={post.id}
                        >
                            <div className="flex gap-2 items-center ">
                                <Avatar className="w-10 h-10">
                                    <AvatarImage src={post.image} />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>

                                <h1 className="font-bold text-md">
                                    @{post.username}
                                </h1>

                            </div>

                            <p className="font-medium text-sm">{post.body}</p>

                        </div>
                    );
                })}
            </div>
        </main>
    );
}
