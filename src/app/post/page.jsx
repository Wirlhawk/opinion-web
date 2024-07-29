import React from "react";
import PostList from "@/components/PostList";
import { getPost } from "@/app/action";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import SearchInput from "@/components/SearchInput";

const PostPage = async () => {
    const posts = await getPost();

    return (
        <main className="w-full text-text flex flex-col gap-10">
            <SearchInput className="sm:hidden" />
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbPage>Post</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <PostList posts={posts} />
        </main>
    );
};

export default PostPage;
