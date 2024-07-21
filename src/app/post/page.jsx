import React from "react";
import PostList from "@/components/PostList";

const PostPage = async () => {
    
    return (
        <main className="w-full  text-text flex flex-col gap-10">
            <header>
                <h1 className="text-5xl font-bold">Post</h1>
            </header>
            <PostList />
        </main>
    );
};

export default PostPage;
