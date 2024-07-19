"use server";

import { revalidatePath } from "next/cache";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma  from "@/lib/db"

export async function addPost(formData) {
    const {getUser} = getKindeServerSession();
    const user = await getUser();

    await prisma.post.create({
        data: {
            username: user.username,
            userId: user.id,
            image: user.picture,
            body: formData.get("body"),
        },
    });

    revalidatePath('/')
};

export async function getPost() {
    const posts = await prisma.post.findMany()
    return posts
};


