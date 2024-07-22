import React from 'react'
import ProfileCard  from "@/components/ProfileCard";
import { getPostByUser } from "@/app/action";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import PostList from '@/components/PostList';
import { getServerSession } from 'next-auth'
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const ProfilePage = async ({params}) => {
    const posts = await getPostByUser(params.username)
    const postsCount = posts.length
    const { user } = posts[0]
    const session = await getServerSession(authOptions);

    return (
        <main className="w-full text-text flex flex-col gap-10">
            {/* Profile Card */}
            <ProfileCard user={user} postsCount={postsCount} sessionUsername={session.user.username}/>

            <h1 className="text-2xl">All Post</h1>
            <PostList posts={posts}/>
        </main>
    );
}

export default ProfilePage