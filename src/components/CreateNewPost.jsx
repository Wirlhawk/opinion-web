import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { addPost } from '@/app/action'
import SubmitBtn from './submit-btn';

const CreateNewPost = () => {

    return (
        <div className="max-w-3xl bg-secondary border rounded-3xl p-10">
            <form
                    className="w-full"
                    action={async (formData) => {
                        "use server";
                        await addPost(formData);
                    }}
            >
                <div className="w-full flex gap-5">
                    <Avatar className="w-12 h-12 sm:w-16 sm:h-16 border border-muted font-md">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <textarea
                        name="body"
                        className="pt-4 w-full bg-transparent outline-none text-text text-xl resize-none h-[250px]"
                        placeholder="What's ur opinion"
                        required
                    ></textarea>
                </div>
                <SubmitBtn>Upload</SubmitBtn>
            </form>
        </div>
    );
}

export default CreateNewPost