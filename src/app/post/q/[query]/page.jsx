import React from "react";
import PostList from "@/components/PostList";
import { getPostByQuery } from "@/app/action";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const QueryPostPage = async ({ params }) => {
    const posts = await getPostByQuery(params.query);

    
    if (posts.length < 1) {
        return (
            <main className="w-full text-text flex flex-col gap-10">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbPage>
                                No Result for &apos;{params.query}&apos;
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </main>
        );
    }

    return (
        <main className="w-full text-text flex flex-col gap-10">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbPage>
                            Search Result for &apos;{params.query}&apos;
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <PostList posts={posts} />
        </main>
    );
};

export default QueryPostPage;
