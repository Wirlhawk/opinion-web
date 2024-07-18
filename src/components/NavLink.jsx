import Link from "next/link";

export default function NavLink({children,path}) {
    return (
        <Link
            href={`${path}`}
            className="border-zinc-500 rounded-lg px-3 py-2 flex items-center gap-3 "
        >
            {children}
        </Link>
    )
}