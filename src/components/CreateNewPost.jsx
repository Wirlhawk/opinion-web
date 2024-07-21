import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { addPost } from '@/app/action';

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
                  <Avatar className="w-16 h-16 border border-muted font-md">
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
              <Button className="w-full font-bold mt-5" type="submit">
                  Post
              </Button>
          </form>
      </div>
  );
}

export default CreateNewPost