import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";
import CreateNewPost from "@/components/CreateNewPost";

function getGreeting() {
  const currentHour = new Date().getHours();
  let greeting;

  if (currentHour < 12) {
    greeting = "Good morning";
  } else if (currentHour < 18) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good evening";
  }

  return greeting;
}

  
export default async function Home() {
    const session = await getServerSession(authOptions)
    const greetingMessage = getGreeting();

    return (
        <main className="w-full text-text flex flex-col gap-10 pb-10">
            <header>
                <h1 className="text-5xl font-bold">
                    Hello! @{session?.user?.username}
                </h1>
                <h2 className=" text-2xl font-bold text-muted mt-4">
                    {greetingMessage}
                </h2>
            </header>
            <CreateNewPost />
            
        </main>
    );
}
