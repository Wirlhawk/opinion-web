import prisma from "@/lib/db";
import SubmitBtn from "./../components/submit-btn";
import { getPost, addPost } from "./action";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


export default async function Home() {
    const posts = await getPost()
    const { isAuthenticated, getUser } = getKindeServerSession();
    const isLoggedIn = await isAuthenticated()
    const user = await getUser()


    if(!isLoggedIn){
        redirect("/api/auth/login?post_login_redirect_url=/");
    }

    return (
        // <main className="w-full flex min-h-screen flex-col items-center justify-start">
        //     {/* <LogoutLink>Log out</LogoutLink> */}
        //     <form className="flex flex-col w-96" action={addPost}>
        //         <input
        //             type="text"
        //             name="body"
        //             placeholder="Body..."
        //             className="border-zinc-400 border-solid border rounded-lg h-10 px-3"
        //             required
        //         />
        //         <SubmitBtn />
        //     </form>

        //     <div className="flex flex-col gap-3 mt-10">
        //         <h1>All Post</h1>
        //         {posts.map((post) => {
        //             return (
        //                 <div
        //                     className=" bg-slate-200 p-3 w-96 rounded-lg flex flex-col gap-3"
        //                     key={post.id}
        //                 >
        //                     <div className="flex gap-2 items-center ">
        //                         <Avatar className="w-10 h-10">
        //                             <AvatarImage src={post.image} />
        //                             <AvatarFallback>CN</AvatarFallback>
        //                         </Avatar>

        //                         <h1 className="font-bold text-md">
        //                             @{post.username}
        //                         </h1>

        //                     </div>

        //                     <p className="font-medium text-sm">{post.body}</p>

        //                 </div>
        //             );
        //         })}
        //     </div>
        // </main>
        <main className="w-full min-h-screen text-text flex flex-col gap-10">
            <header>
                <h1 className="text-5xl font-bold">Hello! @{user?.username}</h1>
                <h2 className="text-2xl font-bold text-muted mt-4">
                    Good Afternoon
                </h2>
            </header>

            {/* card list */}
            <div className="flex flex-col gap-10">
                {posts.map((post) => (
                    <div
                        className="flex flex-col gap-5 bg-secondary w-1/2 p-10 rounded-3xl border border-muted"
                        key={post.id}
                    >
                        <div className="flex items-center gap-5">
                            <Avatar className="w-14 h-14 border border-muted font-md">
                                <AvatarImage src={post.image} />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <h1 className="text-2xl font-bold">@{post.username}</h1>
                        </div>
                        <p className="text-lg">
                            {post.body}
                        </p>
                        <span className="text-sm text-muted">
                            16:08 | August 17 2018
                        </span>
                        {/* </div> */}
                    </div>
                ))}
            </div>
        </main>
    );
}
