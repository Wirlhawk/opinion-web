"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";


export default function NavLink({children,path}) {
    const pathName = usePathname();

    return (
        <Link
            href={`${path}`}
            className={` hover:bg-muted rounded-xl transition p-3 ${
                pathName === path ? "bg-muted " : ""
            }`}
        >
            {children}
        </Link>
    );
}