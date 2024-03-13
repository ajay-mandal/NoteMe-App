import axios from "axios";
import { toast } from "sonner";


export async function DeleteComponent(id: number) {
    const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL
    try{
        if (typeof window !== 'undefined' && window.localStorage){
            await axios.delete(`${BACKEND}/blog/${id}`,{
                headers:{
                    Authorization: localStorage.getItem("token"),
                }
            })
            toast.success("Post Deleted", {position:"bottom-center", duration: 3000, className:"max-w-fit"})
            setInterval(()=>window.location.reload(), 2000);
        }
    }catch(e){
        console.error(e);
    }
}
