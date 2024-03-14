"use client";
import { useState} from "react";
import { SignupType } from "@/zod/validator"
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"


export default function SignUp_Component({imageURL}: {imageURL: string}){
    const navigate = useRouter();
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

    const [postInputs, setPostInputs] = useState<SignupType>({
        name: "",
        email: "",
        password: "",
        imageURL: imageURL
    });
    const sendRequest = async()=> {
      if (postInputs.name === "" || postInputs.email === "" || postInputs.password === "") {
        toast("Please fill all the inputs", { position: "bottom-center", className: "max-w-fit" });
        return;
      }
      if (!/\S+@\S+\.\S+/.test(postInputs.email)) {
        toast("Please enter a valid email address", { position: "bottom-center", className: "max-w-fit" });
        return;
      }
      if(postInputs.password.length < 8){
        toast("Password must be at least 8 characters long", { position: "bottom-center", className: "max-w-fit" });
        return;
      }
      try {
        const response = await axios.post(`${BACKEND_URL}/signup`, postInputs);
        const jwt = response.data.jwt;
        if (typeof window !== 'undefined' && window.localStorage) {
          localStorage.setItem("token", jwt);
          toast("Sign up Successfully", {position:"bottom-center",className:"max-w-fit" })
          navigate.push("/blogs");
        }
      } catch (error) {
        toast("Email already used", { position: "bottom-center", className: "max-w-fit" });
      }
    }
    return (
        <Card className="mx-auto max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
          <CardDescription>Enter your email below to signup for account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Your Name"
            onChange={(e) => { setPostInputs({...postInputs, name: e.target.value }) }} required type="text" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="Your Email"
               onChange={(e) => { setPostInputs({...postInputs, email: e.target.value }) }} required type="email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" placeholder="********"
              onChange={(e) => { setPostInputs({...postInputs, password: e.target.value }) }} required type="password" />
            </div>
            <Button className="w-full bg-gray-700 text-white" type="submit"
            onClick={sendRequest}>
              Sign Up
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?&nbsp;
            <Link className="underline" href="/signin">
              Sign In
            </Link>
          </div>
        </CardContent>
      </Card>
    )
}
