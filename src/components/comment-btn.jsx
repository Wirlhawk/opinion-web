"use client"
import React from 'react'
import { useFormStatus } from "react-dom"
import { LoaderCircle, SendHorizontal } from 'lucide-react';


const CommentButton = ({ children }) => {
    const { pending } = useFormStatus();

    return (
        <button
            disabled={pending}
            className=""
            type="submit"
        >
            { pending ? <LoaderCircle className="animate-spin"/> : <SendHorizontal />}
        </button>
    );
};

export default CommentButton