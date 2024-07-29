"use client";

import React, { forwardRef } from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";

const formatRelativeTime = (isoDateString) => {
  const date = new Date(isoDateString);
  return formatDistanceToNow(date, { addSuffix: true });
};

const PostCard = forwardRef(({ post }, ref) => {
  return (
    <div
      className="flex-1 gap-5 w-full sm:min-w-[400px] bg-secondary p-10 rounded-2xl border border-muted sm:hover:bg-muted transition"
      
    >
      <Link href={`/post/${post.id}`} className="flex flex-col gap-5 h-full">
        <div className="flex items-center gap-5">
          <Avatar className="w-14 h-14 border border-muted font-md">
            <AvatarImage src={post.user?.picture} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h1 className="text-2xl font-bold truncate">
            @{post.user?.username}
          </h1>
        </div>
        <p className="text-lg truncate">{post.body}</p>
        {post.picture && (
          <div className="flex">
            <img
              className="rounded-lg aspect-video w-full object-cover"
              src={post.picture}
              alt="Post"
            />
          </div>
        )}
        <span className="text-sm text-muted font-bold mt-auto">
          {formatRelativeTime(post.createdAt)}
        </span>
      </Link>
    </div>
  );
});

export default PostCard;
