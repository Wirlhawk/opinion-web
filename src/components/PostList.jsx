import React from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getPost } from "@/app/action";
import { formatDistanceToNow } from "date-fns";

const formatRelativeTime = (isoDateString) => {
    const date = new Date(isoDateString);
    return formatDistanceToNow(date, { addSuffix: true });
};

export default async function PostList() {
    const posts = await getPost()
    
    return (
        <div className="grid grid-cols-2 gap-10">
            {posts.map((post) => (
                <Link href={`/post/${post.id} `} key={post.id}>
                    <div className="flex flex-col gap-5 bg-secondary p-10 rounded-3xl border border-muted">
                        <div className="flex items-center gap-5">
                            <Avatar className="w-14 h-14 border border-muted font-md">
                                <AvatarImage src={post.user.picture} />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <h1 className="text-2xl font-bold">
                                @{post.user.username}
                            </h1>
                        </div>
                        <p className="text-lg truncate">{post.body}</p>
                        <span className="text-sm text-muted">
                            {/* 16:08 | August 17 2018 */}
                            {formatRelativeTime(post.createdAt)}
                        </span>
                    </div>
                </Link>
            ))}
        </div>
    );
}
