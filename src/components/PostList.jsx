import React from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";

const formatRelativeTime = (isoDateString) => {
    const date = new Date(isoDateString);
    return formatDistanceToNow(date, { addSuffix: true });
};
//grid grid-cols-2
export default async function PostList({posts}) {
        return (
            <div className="flex flex-wrap gap-10 pb-10   ">
                {posts.map((post) => (
                    <div
                        key={post.id}
                        className="flex flex-1 flex-col gap-5 min-w-[400px] bg-secondary p-10 rounded-3xl border border-muted hover:bg-muted transition"
                    >
                        <Link href={`/post/${post.id} `}>
                            <div className="flex items-center gap-5">
                                <Avatar className="w-14 h-14 border border-muted font-md">
                                    <AvatarImage src={post.user.picture} />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <h1 className="text-2xl font-bold truncate">
                                    @{post.user.username}
                                </h1>
                            </div>
                            <p className="text-lg truncate">{post.body}</p>
                            <span className="text-sm text-muted font-bold">
                                {formatRelativeTime(post.createdAt)}
                            </span>
                        </Link>
                    </div>
                ))}
            </div>
        );
}
