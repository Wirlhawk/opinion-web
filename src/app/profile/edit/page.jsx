"use client"
import React, { useState } from 'react';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { editProfile } from "@/app/action"
import SubmitBtn from "@/components/submit-btn"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Adjust the path as needed


const EditProfilePage = () => {


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

    return (
        <main className="w-full text-text flex flex-col gap-10">
            <form
                className="flex flex-col gap-10 bg-secondary p-10 rounded-3xl border border-muted w-full sm:min-w-[400px]"
                action={editProfile}
            >
                <h1 className="text-2xl font-bold ">Edit Profile</h1>
                    <div className="mt-4">
                        <Avatar className="w-20 h-20 border border-muted font-md">
                            <AvatarImage
                                src={picturePreview || ""}
                            />
                        </Avatar>
                    </div>
                

                <div>
                    <Label htmlFor="picture">Profile Picture</Label>
                    <Input
                        name="picture"
                        type="file"
                        placeholder="Enter bio"
                        id="picture"
                        className="mt-2 rounded-xl text-text"
                        onChange={handlePictureChange}
                    />
                </div>

                <div>
                    <Label htmlFor="bio">Biography</Label>
                    <Input
                        name="bio"
                        type="text"
                        placeholder="Enter bio"
                        id="bio"
                        className="mt-2 rounded-xl"
                    />
                </div>

                <SubmitBtn>Save Changes</SubmitBtn>
            </form>
        </main>
    );
};

export default EditProfilePage;
