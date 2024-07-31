"use server";
import { revalidatePath } from "next/cache";
import prisma  from "@/lib/db"
import { getServerSession } from 'next-auth'
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { put } from "@vercel/blob";


export async function addPost(formData) {
    const session = await getServerSession(authOptions);
    const { user } = session
    const body = formData.get("body")
    const image = formData.get("picture")
    let imageUrl = null;

    if (body == "") {
        return { success: false, message: "Post cannot be empty" };
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
    })

    revalidatePath("/post")
    return { success: true, message: 'Post Has Been Created' };
}

// Your existing getPost function
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
    const post = await prisma.post.findUnique({
        where: { 
            id: id 
        },
        include: {
            comments: {
                orderBy: {
                    createdAt: 'desc', // or 'desc' for descending order
                },
                include: {
                    user: {
                        select: {
                            id: true,
                            username: true,
                            picture: true,
                        },
                    },
                },
            },
            user: {
                select: {
                    id: true,
                    username: true,
                    picture: true,
                },
            },
        },
    });
    return post;
}

export async function getPostByUser(username) {
    const user = await prisma.user.findMany({
        where: {
            username,
        },
        include: {
            posts: {
                orderBy: {
                    createdAt: "desc", 
                },
            },
        },

    });
    return user;
}

export async function getPostByQuery(query) {
    const posts = await prisma.post.findMany({
        where: {
            OR: [
                {
                    body: {
                        contains: query,
                        mode: "insensitive", 
                    },
                },
                {
                    user: {
                        username: {
                            contains: query,
                            mode: "insensitive", 
                        },
                    },
                },
            ],
        },
        include: {
            user: true,
        },
        orderBy: {
            createdAt: "desc", 
        },
    });


    return posts;
}

export async function deletePost(id) {
    await prisma.$transaction(async (prisma) => {
        await prisma.comment.deleteMany({
            where: {
                postId: id,
            },
        });

        // Delete the post itself
        await prisma.post.delete({
            where: {
                id,
            },
        });
    });

    revalidatePath("/post");
    return { success: true, message:"post has been deleted" };
}


export async function addComment(formData,postId) {
    const session = await getServerSession(authOptions);
    const { user } = session
    const userId = user.id
    const body = formData.get("body");

    await prisma.comment.create({
        data: {
            body: body,
            postId: postId,
            userId: userId
        },
    });

    revalidatePath(`/post/${postId}`);
    return { succsess: true };
}
export async function deleteComment(commentId,postId) { 
    await prisma.comment.delete({
        where:{
            id : commentId
        }
    })
    revalidatePath(`/post/${postId}`);

    return { success: true, message:"comment has been deleted" };

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