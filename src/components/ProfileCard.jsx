import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'; // Adjust the path as needed
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { Button } from "@/components/ui/button"
import LogoutBtn from './LogoutBtn';
import Link from "next/link";



const ProfileCard = ({user,postsCount,sessionUsername}) => {
    const formattedDate = format(new Date(user.createdAt), "'Joined on' do 'of' MMMM yyyy");
    const isOwner = ( user.username === sessionUsername ? true : false)

    return (
        <div className="flex w-full">
            <div className="flex flex-col gap-10 w-full">
                {/* username and avatar */}
                <div className="flex flex-wrap gap-6 items-center w-full">
                    <Avatar className="w-[6rem] h-[6rem] border border-muted font-md">
                        <AvatarImage src={user.picture} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <h1 className="text-4xl font-bold">@{user.username}</h1>

                    { isOwner && (
                        <span className="sm:ml-auto mr-12 flex gap-2">
                            <Button asChild>
                                <Link href="/profile/edit">Edit Profile</Link>
                            </Button>
                            <LogoutBtn variant="outline" />
                        </span>
                    )}

                </div>
                {/* bio and misc */}
                <div className="flex flex-col">
                    <h2 className="text-3xl font-light">{user.bio}</h2>
                    <span className="flex mt-2 gap-4">
                        <h3 className="text-muted font-bold">
                            {postsCount} Post
                        </h3>
                        <Separator orientation="vertical" />
                        <h3 className="text-muted">{formattedDate}</h3>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default ProfileCard