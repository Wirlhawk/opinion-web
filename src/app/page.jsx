import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";
import CreateNewPost from "@/components/CreateNewPost";
  
export default async function Home() {
    const session = await getServerSession(authOptions)
    

    return (
        <main className="w-full text-text flex flex-col gap-10 pb-10">
            <header>
                <h1 className="text-5xl font-bold">
                    Hello! @{session?.user?.username}
                </h1>
                <h2 className=" text-2xl font-bold text-muted mt-4">
                    Good Afternoon
                </h2>
            </header>
            <CreateNewPost/>
            
        </main>
    );
}
