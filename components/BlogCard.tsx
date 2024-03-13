import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from "next/navigation";

import {
    DropdownMenuTrigger,
    DropdownMenuItem,
    DropdownMenuContent,
    DropdownMenu
} from "@/components/ui/dropdown-menu"

interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    id: number;
    imageUrl: string;
}
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from "./ui/button";
import { DeleteComponent } from "./Delete";
import { useBlogByUser } from "@/hooks/loadblog";

export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    imageUrl
}: BlogCardProps) => {
    return <Link href={`/blogs/${id}`}>
        <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
            <div className="flex">
                <Avatar>
                    <AvatarImage src={imageUrl}/>
                    <AvatarFallback>Hi</AvatarFallback>
                </Avatar>
                <div className="font-extralight pl-2 text-sm flex justify-center flex-col">{authorName}</div>
                <div className="flex justify-center flex-col pl-2">
                </div>
            </div>
            <div className="text-xl font-semibold pt-2">
                {title}
            </div>
            <div className="text-md font-thin">
                {content.slice(0, 100) + "..."}
            </div>
            <div className="text-slate-500 text-sm font-thin pt-4">
                {`${Math.ceil(content.length / 100)} minute(s) read`}
            </div>
        </div>
    </Link>
}

type BlogCardUserProps = Pick<BlogCardProps, "title" | "content" | "id" >;
export function BlogCardUser({
    title,
    content,
    id
}: BlogCardUserProps){
    return <div className="grid gap-4 sm:grid-cols-2">
    <div className="flex flex-col gap-2">
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {content.slice(0, 100)}...
      </p>
      <div className="flex items-center gap-2">
        <Link className="text-sm font-medium underline" href={`/blogs/${id}`}>
          View
        </Link>
        <Link className="text-sm font-medium underline" href={`/edit/${id}`}>
          Edit
        </Link>
        <a>
            <Dialog>
                <DialogTrigger asChild>
                    <Link className="text-sm font-medium underline" href="#">Delete</Link>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                    <DialogTitle>Delete</DialogTitle>
                    <DialogDescription>
                        Do you want to delete this item? This action cannot be undone.
                    </DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center space-x-2">
                        <DialogClose asChild>
                        <Button type="submit" className="px-3" onClick={()=>DeleteComponent(id)}>
                            Delete
                        </Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">
                                Cancel
                            </Button>
                        </DialogClose>
                    </div>
                </DialogContent>
            </Dialog>
        </a>
      </div>
    </div>
  </div>
}
export function Circle() {
    return <div className="h-1 w-1 rounded-full bg-slate-500">

    </div>
}
export function Dropdown(){
    const {userName} = useBlogByUser()
    const navigate = useRouter();
    const SignOut= () =>{
        if (typeof window !== 'undefined' && window.localStorage){
            localStorage.removeItem("token");
            navigate.push('/');

        }
    }
    return(
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="h-9 w-9 cursor-pointer">
                <AvatarImage alt="User" src={userName.imageURL} />

                <AvatarFallback>JD</AvatarFallback>
                <span className="sr-only">Toggle user menu</span>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <Link href="/profile">
                    <DropdownMenuItem className="w-full cursor-pointer text-muted-foreground">
                        Profile
                    </DropdownMenuItem>
                </Link>
                <DropdownMenuItem className="w-full cursor-pointer text-muted-foreground" onClick={SignOut}>
                    Sign Out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
