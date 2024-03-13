"use client";

import { Spinner } from "@/components/Spinner";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export interface Blog{
    "content": string;
    "title":string;
    "id":number;
    "author": {
        "name": string;
        "imageURL": string;
    };
}
const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL;

export function useBlogById({id}:{id:number}) {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();

    useEffect(()=>{
        if (typeof window !== 'undefined' && window.localStorage){
            axios.get(`${BACKEND}/blog/${id}`,{
                headers:{
                    Authorization: localStorage.getItem("token")
                }
            })
            .then((response)=>{
                setBlog(response.data.blog);
                setLoading(false);
            })
        }
    }, [id])
    return {
        loading,
        blog
    }
}

export function useBlogBulk(){
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(()=>{
        if (typeof window !== 'undefined' && window.localStorage){
            axios.get(`${BACKEND}/blog/bulk`,{
                headers:{
                    Authorization: localStorage.getItem('token')
                }
            })
            .then((response)=>{
                setBlogs(response.data.blogs);
                setLoading(false);
            })
            .catch((error)=>{
                toast(`Error while fetching data: ${error}`);
                setLoading(false);
            })
        }

    },[])
    return{
        loading,
        blogs
    }
}

export function useBlogByUser(){
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [userName, setUserName] = useState({
        name: "Anonymous",
        imageURL:""
    });

    useEffect(()=>{
        if (typeof window !== 'undefined' && window.localStorage){
            axios.get(`${BACKEND}/blog/user`,{
                headers:{
                    Authorization: localStorage.getItem('token'),
                }
            })
            .then((response)=>{
                setBlogs(response.data.blogs);
                setLoading(false);
                setUserName(response.data.user);
            })
            .catch((error)=>{
                toast(`Error while fetching data`);
                setLoading(false);
            })
        }
    },[])
    return{
        loading,
        blogs,
        userName
    }
}

export function BlogForUserProfile(){
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState();

    useEffect(()=>{
        try{
            if (typeof window !== 'undefined' && window.localStorage){
                axios.get(`${BACKEND}/blog/user`,{
                    headers:{
                        Authorization: localStorage.getItem('token')
                    }
                })
                .then((response)=>{
                    setBlogs(response.data.blogs);
                    setLoading(false);
                })
            }
        }catch(e){
            toast("Error fetching blogs", {position:"bottom-center",className:"max-w-fit" })
        }

    },[])
    return{
        blogs,
        loading
    }
}
