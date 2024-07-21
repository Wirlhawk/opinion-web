import React from 'react'
import ProfileCard  from "@/components/ProfileCard";
import { getPostByUser } from "@/app/action";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import PostList from '@/components/PostList';



const ProfilePage = async () => {
    const session = await getServerSession(authOptions)
    const posts = await getPostByUser(session.user.username)
    const postsCount = posts.length
    const { user } = posts[0]

    return (
        <main className="w-full text-text flex flex-col gap-10">
            {/* Profile Card */}
            <ProfileCard user={user} postsCount={postsCount}/>

            <h1 className="text-2xl">All Post</h1>
            <PostList posts={posts}/>
        </main>
    );
}

export default ProfilePage