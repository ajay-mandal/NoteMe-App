"use client";
import { useState } from "react";
import { SigninType } from "@/zod/validator"
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"


export default function SignIn_Component(){
    const navigate = useRouter();
    const [postInputs, setPostInputs] = useState<SigninType>({
        email: "",
        password: ""
    });
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

    const sendRequest2 = async()=> {
      if(!postInputs.email || !postInputs.password) {
          toast("Please fill all the inputs", {position:"bottom-center",className:"max-w-fit" })
          return;
      }
        try {
            const response = await axios.post(`${BACKEND_URL}/signin`, postInputs);
            const jwt = response.data.jwt;
            if (typeof window !== 'undefined' && window.localStorage) {
              localStorage.setItem("token", jwt);
              toast("Sign in Successfully", {position:"bottom-center",className:"max-w-fit" })
              navigate.push("/blogs");
            }
        } catch(e) {
            toast(`Incorrect Email Password.`, {position:"bottom-center",className:"max-w-fit" })
        }
    }

    return (
        <Card className="mx-auto max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
          <CardDescription>Enter your email below to signin to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
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
            onClick={sendRequest2}>
              Sign In
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Create a new Account?&nbsp;
            <Link className="underline" href="/signup">
              Sign Up
            </Link>
          </div>
        </CardContent>
      </Card>
    )
}
