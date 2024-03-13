"use client";
import Edit_Component from "@/components/Edit";
import useMiddleware from "@/hooks/middleware";
import { useParams } from "next/navigation";
export default function Edit(){
    useMiddleware();
    const { id } = useParams();
    return(
        <Edit_Component params={{id: Number(id)}} />
    )
}
