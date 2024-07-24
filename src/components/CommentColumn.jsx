import React from "react";
import { SendHorizontal } from "lucide-react";
import { addComment } from "@/app/action";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


export default function CommentColumn({ postId, comments }) {
    return (
        <div className="flex flex-col gap-7">
            <form
                className="flex items-center py-5 px-8 bg-secondary border rounded-2xl"
                action={async (formData) => {
                    "use server";
                    await addComment(formData, postId);
                }}
            >
                <input
                    name="body"
                    type="text"
                    placeholder="add comment..."
                    className="flex-1 bg-transparent focus:outline-none placeholder-muted"
                />
                <button>
                    <SendHorizontal />
                </button>
            </form>

            {comments.map((comment) => {
                return (
                    <div key={comment.id} className="flex gap-3">
                        <Avatar className="w-12 h-12 border border-muted font-md">
                            <AvatarImage src={comment.user.picture} />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>

                        <div>
                            <h1 className="font-bold">@{comment.user.username}</h1>
                            <p>{comment.body}</p>
                        </div>
                    </div>
                );
            })}

        </div>
    );
}
