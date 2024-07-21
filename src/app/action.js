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

export async function getPostByUser(username) {
    const posts = await prisma.post.findMany({
        where: {
            user: {
                username: username,
            },
        },
        include: {
            user: true,
        },
        orderBy: {
            createdAt: "desc", // Order posts by the latest first
        },
    });
    return posts;
}

// export const editProfile = async (formData) => {
//     const session = await getServerSession(authOptions);
//     const { user } = session

//     const image = formData.get("image")
//     const bio = formData.get("bio")

//     const blob = uploadImage(image)
    
//     console.log(blob)

//     await prisma.user.update({
//       where: { id: user.id },
//       data: {
//         bio: bio || undefined, 
//         picture: blob.url || undefined, 
//       },
//     });
// }

// export async function uploadImage(imageFile) {
//     const blob = await put("random", imageFile, {
//         access: "public",
//     });
//     revalidatePath("/");
//     console.log("blob :",blob);

//     return blob;
// }


export const editProfile = async (formData) => {
    try {
        const session = await getServerSession(authOptions);
        const user = session.user;

        const image = formData.get("picture");
        const bio = formData.get("bio");

        console.log("Received image:", image); // Log the image file to ensure it’s received

        let imageUrl = null;
        if (image) {
            const blob = await uploadImage(image);
            console.log("Blob from uploadImage:", blob); // Ensure this log appears
            imageUrl = blob.url;
        }

        const updatedUser = await prisma.user.update({
            where: { id: user.id },
            data: {
                bio: bio || undefined,
                picture: imageUrl || undefined,
            },
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