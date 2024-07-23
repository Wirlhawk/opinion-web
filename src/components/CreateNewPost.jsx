"use client"
import React, { useState, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { addPost } from '@/app/action'
import SubmitBtn from './submit-btn';
import { ImagePlus, X } from "lucide-react";
import { useSession } from 'next-auth/react';



const CreateNewPost = () => {
    const imageInputRef = useRef(null);
    const { data:session } = useSession()
    const [picturePreview, setPicturePreview] = useState(null);

    const handlePictureChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setPicturePreview(previewUrl);
        } else {
            setPicturePreview(null);
        }
    };

    const removePicture = () => {
        if (imageInputRef.current) {
            imageInputRef.current.value = '';
            setPicturePreview(null);
        }
    }

    return (
        <div className="max-w-3xl bg-secondary border rounded-3xl p-10 ">
            <form className="w-full " action={addPost}>
                <div className="w-full flex gap-5">
                    <Avatar className="w-12 h-12 sm:w-16 sm:h-16 border border-muted font-md">
                        <AvatarImage src={session?.user?.picture} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex flex-col pb-5 w-full">

                        <textarea
                            type="text"
                            name="body"
                            className="pt-2 sm:pt-4 w-full bg-transparent outline-none text-text text-xl resize-none h-[150px]"
                            placeholder="What's ur opinion"
                            required
                        />

                        {/* img input */}
                        <div>
                            <input
                                type="file"
                                accept="image/*"
                                id="input-image"
                                className="hidden"
                                onChange={handlePictureChange}
                                name="picture"
                                ref={imageInputRef}
                            />
                            
                            {picturePreview && (
                                <div className="h-[250px] flex border-2 w-fit relative">
                                    <img src={picturePreview}/>
                                    <button 
                                        className="absolute right-3 top-3 bg-black/50 hover:bg-black/80 transition rounded-full p-1 "
                                        onClick={removePicture}
                                    >
                                        <X size={20} />
                                    </button>

                                    <label
                                        htmlFor="input-image"
                                        className="absolute right-3 bottom-3 text-1 bg-black/50 hover:bg-black/80 transition rounded-xl py-1 px-2 pointer"
                                    >
                                        change file
                                    </label>
                                </div>
                            )}
                        </div>

                    </div>

                    <label
                        htmlFor="input-image"
                        className="pointer text-muted pt-4 pr-4"
                    >
                        <ImagePlus />
                    </label>
                </div>
                <SubmitBtn>Upload</SubmitBtn>
            </form>
        </div>
    );
}

export default CreateNewPost