// "use client"
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from './navbar';
import Provider from "@/context/Provider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Opinion",
  description: "Generated by create next app",
};


export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body
                className={`${inter.className} flex flex-col bg-background px-[1.5rem] sm:px-[6rem] gap-10`}
            >
                <Provider>
                    <Navbar />
                    {children}
                    <Toaster />
                </Provider>
            </body>
        </html>
    );
}
