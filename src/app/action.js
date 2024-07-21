"use server";
import { revalidatePath } from "next/cache";
import prisma  from "@/lib/db"
import { getServerSession } from 'next-auth'
import { redirect } from "next/dist/server/api-utils";
import { authOptions } from "./api/auth/[...nextauth]/route";


export async function addPost(formData) {
    const session = await getServerSession(authOptions);
    const { user } = session

    if (formData.get("body") == "") {
        return null
    }

    await prisma.post.create({
        data: {
            userId: user.id,
            body: formData.get("body"),
        },
    });

    revalidatePath("/post")
    return { succsess:true }
};

export async function getPost() {
    const posts = await prisma.post.findMany({
        include: {
            user: true,
        },
        orderBy: {
            createdAt: "desc", // Order by createdAt field in ascending order
        },
    });
    return posts;
}

export async function getPostById(id) {
    const posts = await prisma.post.findUnique({
        where: {
            id,
        },
        include: {
            user: true,
        },
    });
    return posts;
}


