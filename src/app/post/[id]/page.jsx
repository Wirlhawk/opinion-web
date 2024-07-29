import React from "react";
import { getPostById } from "@/app/action"
import PostDetail from "@/components/PostDetail";
import CommentColumn from "@/components/CommentColumn";
import { Separator } from "@/components/ui/separator"

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";


const postDetailPage = async ({ params }) => {
    const postId = params.id;
    const post = await getPostById(postId)
    const session = await getServerSession(authOptions)

    return (
        <main className="w-full text-text flex flex-col gap-10 pb-10">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/post">Post</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Post Detail</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="flex flex-col gap-5">
                <PostDetail post={post} currentUser={session.user}/>
                <Separator />
                <CommentColumn postId={post.id} comments={post.comments} />
            </div>
        </main>
    );
}

export default postDetailPage;



