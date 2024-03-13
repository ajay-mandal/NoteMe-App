"use client";
import { Appbar } from "@/components/Appbar";
import { BlogCard } from "@/components/BlogCard";
import { BlogSkeleton } from "@/components/BlogSkeleton";
import { useBlogBulk } from "@/hooks/loadblog";
import useMiddleware from "@/hooks/middleware";

export default function Blog() {
    useMiddleware();
    const {loading, blogs} = useBlogBulk();
    if(loading){
        return<div>
            <Appbar />
            <div className="flex justify-center">
                <div>
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                </div>
            </div>
        </div>
    }
    return (
        <div>
            <Appbar />
            <div className="flex justify-center">
                <div>
                    {blogs.map(blog => (
                        <BlogCard
                            key={blog.id}
                            id={blog.id}
                            authorName={blog.author.name || "Anonymous"}
                            title={blog.title}
                            content={blog.content}
                            imageUrl={blog.author.imageURL || ""}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
