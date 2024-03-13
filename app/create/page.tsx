"use client";
import { Appbar } from "@/components/Appbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useMiddleware from "@/hooks/middleware";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

export default function Create(){
    useMiddleware();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useRouter();
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

    return <div>
        <Appbar />
        <div className="flex justify-center w-full pt-8">
            <div className="max-w-screen-lg w-full px-4">
                <Input onChange={(e) => {
                    setTitle(e.target.value)
                }} type="text" placeholder="Title"/>
                <div className="py-4">
                <Textarea onChange={(e) => {
                    setDescription(e.target.value)
                }}
                placeholder="Description"/>
                </div>

                <Button onClick={async () => {
                    if (typeof window !== 'undefined' && window.localStorage){
                        const response = await axios.post(`${BACKEND_URL}/blog`, {
                            title,
                            content: description
                        }, {
                            headers: {
                                Authorization: localStorage.getItem("token")
                            }
                        });
                    navigate.push(`/blogs/${response.data.id}`)
                    }
                }}>
                    Publish Post
                </Button>
            </div>
        </div>
    </div>
}


function TextEditor({ onChange }: {onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void}) {
    return <div className="mt-2">
        <div className="w-full mb-4 ">
            <div className="flex items-center justify-between border">
            <div className="my-2 bg-white rounded-b-lg w-full">
                <label className="sr-only">Publish post</label>
                <textarea onChange={onChange} id="editor" rows={8} className="focus:outline-none block w-full px-0 text-sm text-gray-800 bg-white border-0 pl-2" placeholder="Write an article..." required />
            </div>
        </div>
       </div>
    </div>

}
