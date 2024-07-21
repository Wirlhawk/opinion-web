import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth"; // Adjust the import path as needed

export async function GET() {
    try {
        const session = await getSession();
        return NextResponse.json({ session });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
