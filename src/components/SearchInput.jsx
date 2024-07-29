"use client"
import React from "react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export default function SearchInput({className}) {
    const router = useRouter();

    const handleSubmit = (event) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        const query = formData.get("query")
        router.push(`/post/q/${query}`);
    };

    return (
        <form onSubmit={handleSubmit} className={className}>
            <Input
                name="query"
                type="text"
                placeholder="search"
                className='rounded-xl focus:outline-none '
            />
        </form>
    );
}
