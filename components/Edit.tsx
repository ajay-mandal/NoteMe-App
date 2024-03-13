"use client";
import { Appbar } from "@/components/Appbar";
import { useBlogById } from "@/hooks/loadblog";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function Edit_Component({params}:{params:{id:number}}){
    const navigate = useRouter();
    const [title, setTitle] = useState<string>('');
    const [body, setBody] = useState<string>('');

    const { blog } = useBlogById({id:params.id});

    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

    useEffect(()=>{
        if(blog){
            setTitle(blog.title);
            setBody(blog.content);
        }
    },[blog])
    const handleClick = async (e: any) => {
        e.preventDefault()
        try{
            if (typeof window !== 'undefined' && window.localStorage){
                const response = await axios.put(`${BACKEND_URL}/blog/${params.id}`, {
                    title: title,
                    content: body
                }, {
                    headers: {
                        Authorization: localStorage.getItem("token"),
                    }
                })
                navigate.push(`/blogs/${response.data.id}`);
            }
        }catch(e){
            console.log(e);
        }
    }

    return <div>
        <Appbar />
        <div className="flex justify-center w-full pt-8">
            <div className="max-w-screen-lg w-full px-4">
                <Input onChange={(e:any) => {
                    setTitle(e.target.value)
                }} type="text" value={title} />
                <div className="py-4">
                <Textarea
                onChange={(e:any) => {
                    setBody(e.target.value)
                }}
                value={body}
                />
                </div>
                <Button onClick={handleClick}>
                    Update Post
                </Button>
            </div>
        </div>
    </div>
}
