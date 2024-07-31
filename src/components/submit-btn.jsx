"use client"
import React from 'react'
import { useFormStatus } from "react-dom"
import { Button } from './ui/button'
import { LoaderCircle } from 'lucide-react';


const SubmitBtn = ({ children }) => {
    const { pending } = useFormStatus();

    return (
        <Button
            disabled={pending}
            className="w-full font-bold mt-5"
            type="submit"
        >
            { pending ? <LoaderCircle className="animate-spin"/> : children}
        </Button>
    );
};

export default SubmitBtn