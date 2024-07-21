"use client"
import React from 'react'
import { useFormStatus } from "react-dom"
import { Button } from './ui/button'

const SubmitBtn = ({ children }) => {
    const { pending } = useFormStatus();

    return (
        <Button
            disabled={pending}
            className="w-full font-bold mt-5"
            type="submit"
        >
            {children}
        </Button>
    );
};

export default SubmitBtn