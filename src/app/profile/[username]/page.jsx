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
    const session = await getServerSession(authOptions);

    const user = await getPostByUser(params.username)
    const { posts } = user[0]
    const postsCount = posts.length

    return (
        // <h1>tes</h1>
        <main className="w-full text-text flex flex-col gap-10">
            {/* Profile Card */}
            <ProfileCard
                user={user[0]}
                postsCount={postsCount}
                sessionUsername={session.user.username}
            />

            <h1 className="text-2xl">
                {postsCount > 1 ? "All Post" : "No Post"}
            </h1>
            <PostList
                posts={posts}
                user={user[0]}
                
            />
        </main>
    );
}

export default ProfilePage