import React from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Skeleton } from "@/components/ui/skeleton";



export default function Loading() {
    const skeletons = Array.from({ length: 10 });


    return (
        <main className="w-full text-text flex flex-col gap-10">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbPage>Post</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="flex flex-wrap gap-10 pb-10">
                {skeletons.map((_, index) => (
                    <div
                        key={index}
                        className="flex-1 gap-5 w-full sm:min-w-[400px] bg-secondary p-10 rounded-2xl border border-muted flex flex-col h-full"
                    >
                        <div className="flex items-center gap-5">
                            <Skeleton className="w-14 h-14 rounded-full" />
                            <Skeleton className="w-1/2 h-7" />
                        </div>
                        <Skeleton className="w-3/4 h-5" />
                        {/* <Skeleton className="w-full h-48 aspect-video rounded" /> */}
                        <Skeleton className="w-16 h-5" />
                    </div>
                ))}
            </div>
            
        </main>
    );
}
