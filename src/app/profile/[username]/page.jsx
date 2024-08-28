import React from 'react'
import ProfileCard  from "@/components/ProfileCard";
import { getPostByUser } from "@/app/action";
import PostList from '@/components/PostList';
import { getServerSession } from 'next-auth'
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const ProfilePage = async ({params}) => {
    const session = await getServerSession(authOptions);
    const sanitizedUrl = encodeURIComponent(params.username);
    const user = await getPostByUser(sanitizedUrl)
    const { posts } = user[0]
    const postsCount = posts.length

    return (
        <main className="w-full text-text flex flex-col gap-10">
            <ProfileCard
                user={user[0]}
                postsCount={postsCount}
                sessionUsername={session.user.username}
            />

            <h1 className="text-2xl">
                {postsCount > 0 ? "All Post" : "No Post"}
            </h1>

            <PostList posts={posts} user={user[0]} />
        </main>
    );
}

export default ProfilePage
