"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";


export default function NavLink({children,path}) {
    const pathName = usePathname();

    return (
        <Link
            href={`${path}`}
            className={` p-3 ${pathName === path ? "bg-muted rounded-xl transition" : ""}`}
        >
            {children}
        </Link>
    )
}