// // src/middleware.js
// import { NextResponse } from "next/server";
// import { getSession } from "next-auth/next";

// export async function middleware(request) {
//     const url = request.nextUrl;
//     const path = url.pathname;

//     // Define static and public paths
//     const staticPaths = [
//         "/styles",
//         "/static",
//         "/favicon.ico",
//         "/_next/static",
//         "/_next/image",
//     ];
//     const publicPaths = ["/login", "/register"];

//     // Log request details for debugging
//     console.log("Middleware triggered for:", path);

//     // Allow static files and assets to pass through
//     if (staticPaths.some((p) => path.startsWith(p))) {
//         return NextResponse.next();
//     }

//     // Get session cookie
//     const session = getSession()
//     if (session) {
//         // User is authenticated
//         if (publicPaths.includes(path)) {
//             console.log(
//                 "Redirecting authenticated user from public path:",
//                 path
//             );
//             // Redirect authenticated users away from /login and /register
//             return NextResponse.redirect(new URL("/", request.url));
//         }
//     } else {
//         // User is not authenticated
//         if (!publicPaths.includes(path)) {
//             console.log(
//                 "Redirecting unauthenticated user from protected path:",
//                 path
//             );
//             // Redirect unauthenticated users to /login
//             return NextResponse.redirect(new URL("/login", request.url));
//         }
//     }

//     // Allow the request to proceed if none of the above conditions match
//     return NextResponse.next();
// }

// // Apply middleware to all paths except static assets
// export const config = {
//     matcher: ["/:path*"], // Apply middleware to all paths
// };

export { default } from "next-auth/middleware";

export const config = { matcher: ["/((?!register|login).*)"] };

// import { getToken } from "next-auth/jwt";
// import { NextResponse } from "next/server";

// export async function middleware(req) {
//   const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

//   const { pathname } = req.nextUrl;

//   if (token) {
//     if (pathname === '/register' || pathname === '/login') {
//       return NextResponse.redirect(new URL('/', req.url));
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     "/register",
//     "/login",
//     "/((?!register|login).*)", 
//   ],
// };
