"use server";
import { revalidatePath } from "next/cache";
import prisma  from "@/lib/db"
import { getServerSession } from 'next-auth'
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/dist/server/api-utils";
import { put } from "@vercel/blob";

export async function addPost(formData) {
    const session = await getServerSession(authOptions);
    const { user } = session
    const body = formData.get("body")
    const image = formData.get("picture")
    let imageUrl = null;

    if (formData.get("body") == "") {
        return null
    }

    if (image.size > 0) {
        const blob = await uploadImage(image);
        console.log("Blob from uploadImage:", blob); 
        imageUrl = blob.url;
    }

    await prisma.post.create({
        data: {
            userId: user.id,
            body: formData.get("body"),
            picture: imageUrl || null
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

export async function getPostByUser(username) {
    const user = await prisma.user.findMany({
        where: {
            username
        },
        include: {
            posts: true,
        },
        orderBy: {
            createdAt: "desc", // Order posts by the latest first
        },
    });
    return user;
}

export const editProfile = async (formData) => {
    try {
        const session = await getServerSession(authOptions);
        const user = session.user;
        const image = formData.get("picture");
        const bio = formData.get("bio");
        const data = {}


        let imageUrl = null;
        if (image) {
            const blob = await uploadImage(image);
            console.log("Blob from uploadImage:", blob); // Ensure this log appears
            imageUrl = blob.url;
        }
        
        if (bio) {
            data.bio = bio;
        }

        if (imageUrl) {
            data.picture = imageUrl;
        }

        const updatedUser = await prisma.user.update({
            where: { id: user.id },
            data: data,
        });

        revalidatePath('/post');

        return updatedUser;
    } catch (error) {
        console.error("Error updating profile:", error);
        throw new Error("Failed to update profile");
    }
};

export async function uploadImage(imageFile) {
  try {
    // Use the original file name for storage
    const fileName = imageFile.name;

    // Upload the image with the original file name
    const blob = await put(fileName, imageFile, {
      access: "public",
    });
    
    console.log("Uploaded blob:", blob); // Ensure this log appears
    return blob;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw new Error('Failed to upload image');
  }
}