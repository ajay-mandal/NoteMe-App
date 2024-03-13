"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import {Dropdown } from "./BlogCard";
import { useRouter } from "next/navigation";
import Image from "next/image";

export function Appbar(){

    const navigate = useRouter();
    const handleOnClick = ()=>{
        navigate.push('/create');
    }
    return(
        <div className="border-b flex justify-between px-6 py-2">
            <Link href={'/blogs'}
            className="flex flex-row justify-center cursor-pointer">
                <Image src="/medium-green.png" alt="logo" width={40} height={40} />
                <p className="py-3 font-bold font-sans">NoteMe</p>
            </Link>
            <div className="flex flex-row px-4">
                <Button onClick={handleOnClick} className="rounded-full bg-[#01AB69]">Create</Button>
                <div className="px-2">
                    <Dropdown />
                </div>
            </div>
        </div>
    )
}
