import React from "react";
import { getPostById } from "@/app/action"
import PostDetail from "@/components/PostDetail";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";


const postDetailPage = async ({ params }) => {
    const postId = params.id;
    const post = await getPostById(postId)

    return (
        <main className="w-full text-text flex flex-col gap-10">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/post">
                            Post
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Post Detail</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <PostDetail post={post}/>
        </main>
    )
}

export default postDetailPage;



