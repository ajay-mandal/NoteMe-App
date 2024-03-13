import { Quote2 } from "@/app/_components/Quote2";
import SignIn_Component from "@/app/_components/Signin";
export default function Signin() {
    return(
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="flex justify-center items-center h-screen">
                <SignIn_Component />
            </div>
            <div className="hidden lg:block">
                <Quote2 />
            </div>
        </div>

    )
}
