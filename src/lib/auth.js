"use server";

// import { SignJWT, jwtVerify } from "jose";
// import { NextRequest, NextResponse } from "next/server";
import prisma from "./db";
import bcrypt from "bcryptjs";

// const secretKey = "secret";
// const key = new TextEncoder().encode(secretKey);

// export async function encrypt(payload) {
//     return await new SignJWT(payload)
//         .setProtectedHeader({ alg: "HS256" })
//         .setIssuedAt()
//         .setExpirationTime("15d")
//         .sign(key);
// }

// export async function decrypt(input) {
//     if (!input) {
//         // Handle case where token is not provided (user hasn't logged in)
//         throw new Error("No token provided. Please log in.");
//     }

//     const { payload } = await jwtVerify(input, key, {
//         algorithms: ["HS256"],
//     });
//     return payload;
// }

// export async function login(formData) {
//     const user = await prisma.user.findUnique({
//         where: {
//             username: formData.get("username"),
//         },
//     });

//     if (!user) {
//         return { error: "user doesn't exist" , status:400};
//     }

//     const isPasswordValid = await bcrypt.compare(
//         formData.get("password"),
//         user.password
//     );

//     if (!isPasswordValid) {
//         return { error: "password is invalid", status: 400 };
//     }

//     // Create the session
//     const expires = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000); // 15 days expiration
//     const session = await encrypt({ user, expires });

//     // Save the session in a cookie
//     cookies().set("session", session, { expires, httpOnly: true });

//     return { succsess: true };
// }
export async function register(formData) {
    const username = formData.get("username");
    const password = formData.get("password");

    const userExist = await prisma.user.findUnique({
        where: { username },
    });

    if (userExist) {
        return { error: "User already exists" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
        data: {
            username,
            password: hashedPassword,
        },
    });
}

// export async function logout() {
//     // Destroy the session
//     cookies().set("session", "", { expires: new Date(0) });
// }

// export async function getSession() {
//     const session = cookies().get("session")?.value;
//     if (!session) return null;
//     return await decrypt(session);
// }

// export async function updateSession(request) {
//     const session = request.cookies.get("session")?.value;
//     if (!session) return;

//     // Refresh the session so it doesn't expire
//     const parsed = await decrypt(session);
//     parsed.expires = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000); // 15 days expiration
//     const res = NextResponse.next();
//     res.cookies.set({
//         name: "session",
//         value: await encrypt(parsed),
//         httpOnly: true,
//         expires: parsed.expires,
//     });
//     return res;
// }
