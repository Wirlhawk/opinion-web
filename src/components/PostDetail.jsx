import React from 'react'
import { format } from "date-fns"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from 'next/link';

const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    return format(date, "HH:mm | MMMM dd, yyyy");
};

const PostDetail = ({post}) => {
  return (
      <div
          className="flex flex-col  gap-4 sm:gap-10 bg-secondary p-10 rounded-3xl border border-muted w-full mb-10"
          key={post.id}
      >
          <div className="flex items-center gap-5">
              <Avatar className="w-16 h-16 border border-muted font-md">
                  <AvatarImage src={post.user.picture} />
                  <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span>
                  <Link href={`/profile/${post.user.username}`} className="text-2xl font-bold">@{post.user.username}</Link>
                  <h2 className="text-md text-muted ">
                      {post.user.bio || "no bio"}
                  </h2>
              </span>
          </div>
          <p className="text-xl break-words">{post.body}</p>

            { post.picture && (
                <div className="flex">
                    <img className="rounded-lg " src={ post.picture } />
                </div>
            )}        

          <span className="text-md text-muted ">
              {formatDate(post.createdAt)}
          </span>
      </div>
  );
}

export default PostDetail