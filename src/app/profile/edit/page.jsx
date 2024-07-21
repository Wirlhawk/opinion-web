import React from "react";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { editProfile } from "@/app/action"
import SubmitBtn from "@/components/submit-btn"

const EditProfilePage = () => {

    return (
        <main className="w-full text-text flex flex-col gap-10">
            <form className="flex flex-col gap-10 bg-secondary p-10 rounded-3xl border border-muted w-1/2"
                action={editProfile}
            >
                <h1 className="text-2xl font-bold ">Edit Profile</h1>

                <div>
                    <Label htmlFor="picture">Profile Picture</Label>
                    <Input
                        name="picture"
                        type="file"
                        placeholder="Enter bio"
                        id="picture"
                        className="mt-2 rounded-xl text-text"
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
