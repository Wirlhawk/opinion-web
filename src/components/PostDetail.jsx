"use client"
import React from 'react'
import { format } from "date-fns"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from 'next/link';
import { Trash2 } from 'lucide-react';
const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    return format(date, "HH:mm | MMMM dd, yyyy");
};
import { Button } from './ui/button';

import { deletePost } from '@/app/action';
import { useRouter } from 'next/navigation';
import { useToast } from "@/components/ui/use-toast";


const PostDetail = async ({post,currentUser}) => {
    const router = useRouter()
    const { toast } = useToast()

    return (
        <div className="flex flex-col  gap-5 sm:gap-10  w-full " key={post.id}>
            <div className="flex items-center gap-5">
                <Avatar className="w-16 h-16 border border-muted font-md">
                    <AvatarImage src={post.user.picture} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span>
                    <Link
                        href={`/profile/${post.user.username}`}
                        className="text-2xl font-bold"
                    >
                        @{post.user.username}
                    </Link>
                    <h2 className="text-md text-muted ">
                        {post.user.bio || "no bio"}
                    </h2>
                </span>

                
                { currentUser.username === post.user.username && (
                    <Button 
                        variant="destructive" 
                        className="ml-5"
                        onClick = {async () => {
                            const result = await deletePost(post.id)
                            if(result?.success){
                                router.push('/post')
                                toast({
                                    description: result?.message
                                });
                            }
                        }}
                    >
                        <Trash2 color="#ffffff" />
                    </Button>
                )}
            </div>
            <p className="text-xl break-words">{post.body}</p>

            {post.picture && (
                <div className="flex">
                    <img className="rounded-lg " src={post.picture} />
                </div>
            )}

            <span className="text-md text-muted ">
                {formatDate(post.createdAt)}
            </span>
        </div>
    );
}

export default PostDetail