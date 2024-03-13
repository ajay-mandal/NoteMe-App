"use client";
import { Appbar } from "@/components/Appbar";
import { FullBlog } from "@/components/FullBlog";
import { Spinner } from "@/components/Spinner";
import { useBlogById } from "@/hooks/loadblog";
import useMiddleware from "@/hooks/middleware";
import { useParams } from "next/navigation";

export default function GetBlogParams() {
    useMiddleware();
    const id = useParams();
    const { loading, blog } = useBlogById({
        id:Number(id.id)
    });

    if (loading || !blog) {
        return (
            <div>
                <Appbar />
                <div className="h-screen flex flex-col justify-center">
                    <div className="flex justify-center">
                        <Spinner />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <FullBlog blog={blog} />
        </div>
    );
}
