"use client"
import React from 'react'
import { useFormStatus } from "react-dom"


const SubmitBtn = () => {
    const { pending } = useFormStatus();

  return (
        <button
          disabled={pending}
          type="submit"
          className="w-full bg-zinc-950 disabled:bg-zinc-500 transition text-white rounded-lg mt-3 p-2"
        > 
          Submit
      </button>
      
      
    );
}

export default SubmitBtn