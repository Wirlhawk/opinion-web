import React from 'react'
import { format } from "date-fns"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    return format(date, "HH:mm | MMMM dd, yyyy");
};

const PostDetail = ({post}) => {
  return (
      <div
          className="flex flex-col gap-10 bg-secondary p-10 rounded-3xl border border-muted w-full"
          key={post.id}
      >
          <div className="flex items-center gap-5">
              <Avatar className="w-16 h-16 border border-muted font-md">
                  <AvatarImage src={post.user.picture} />
                  <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span>
                  <h1 className="text-2xl font-bold">@{post.user.username}</h1>
                  <h2 className="text-md text-muted ">{post.user.bio || "no bio"}</h2>
              </span>
          </div>
          <p className="text-xl">{post.body}</p>
          <span className="text-md text-muted ">
              {formatDate(post.createdAt)}
          </span>
      </div>
  );
}

export default PostDetail