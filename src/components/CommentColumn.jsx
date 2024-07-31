"use client"
import React from "react";
import { addComment } from "@/app/action";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CommentButton from "./comment-btn"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteComment } from '@/app/action';
import { Trash2 , EllipsisVertical} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useToast } from "@/components/ui/use-toast";


export default function CommentColumn({ postId, comments, currentUser }) {
    const router = useRouter()
    const { toast } = useToast()

    return (
        <div className="flex flex-col gap-7">
            <form
                className="flex items-center py-5 px-8 bg-secondary border rounded-2xl"
                action={async (formData) => {
                    await addComment(formData, postId);
                }}
            >
                <input
                    name="body"
                    type="text"
                    placeholder="add comment..."
                    className="flex-1 bg-transparent focus:outline-none placeholder-muted"
                    required
                />
                <CommentButton/>
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

                        {currentUser.username === comment.user.username && (
                            <DropdownMenu>
                            <DropdownMenuTrigger>
                                <EllipsisVertical />
                            </DropdownMenuTrigger>
                            
                            <DropdownMenuContent>
                                    <button
                                        className="w-full cursor-pointer ml-auto"
                                        onClick={async () => {
                                            const result = await deleteComment(comment.id,postId);
                                            if (result?.success) {
                                                toast({
                                                    description: result?.message,
                                                });
                                            }
                                        }}
                                    >
                                        <DropdownMenuItem>
                                            <Trash2 className="mr-2 h-4 w-4" />
                                            <span>Delete</span>
                                        </DropdownMenuItem>
                                    </button>
                                
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}

                    </div>
                );
            })}

        </div>
    );
}
