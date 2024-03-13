"use client";
import { BlogCardUser } from "@/components/BlogCard";
import { BlogSkeleton } from "@/components/BlogSkeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useBlogByUser } from "@/hooks/loadblog";

export default function Myblog() {
    const {loading, blogs, userName} = useBlogByUser();
    if(loading){
        return<div>
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
    <div className="px-4 py-6 md:px-6 md:py-12">
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-4">
            <Avatar>
                  <AvatarImage src={userName.imageURL}/>
                  <AvatarFallback>Hi</AvatarFallback>
              </Avatar>
            <div className="space-y-1">
              <h1 className="text-3xl font-bold">{userName.name}</h1>
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">My Stories</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {blogs.map((blog) => <BlogCardUser
              key={blog.id}
              title={blog.title}
              content={blog.content}
              id={blog.id}
              />)}
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}
