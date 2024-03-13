import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react";
export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="px-4 lg:px-6 h-14 flex items-center border-y py-8">
        <Link className="flex items-center justify-center" href="/">
          <Image
          src="/medium-green.png"
          width={40}
          height={40}
          alt="Medium"
          />
          <p className="font-bold font-sans">NoteMe</p>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Button className="rounded-lg" variant="default" size="sm">
            <Link href={"/signup"} className="flex flex-row">
              Get Started
              <div className="py-0.5">
              <ArrowRight className="h-4 w-4 ml-2"/>
              </div>
            </Link>

          </Button>
          <Button variant="secondary" size="sm">
            <Link href={"/signin"}>
              Sign in
            </Link>

          </Button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full pt-12 md:pt-24 lg:pt-32">
          <div className="container space-y-6 px-4 lg:space-y-10 xl:space-y-16 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-2 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                  Welcome to NoteMe
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">The best stories start here</h1>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  A place where words matter. Read, write, and connect with the stories that matter most to you.
                </p>
                <Image
                src="/parade.webp"
                width={600}
                height={400}
                alt="Medium"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full items-center px-4 md:px-6">
        <nav className="md:flex hidden">
          <Button variant="ghost" size="sm">
            Privacy Policy
          </Button>
          <Button variant="ghost" size="sm">
            Terms & Conditions
          </Button>
        </nav>
        <div className="ml-auto space-x-4">
          <Button className="font-medium bg-blue-50 hover:bg-blue-100 hover:text-[#00C4FF] text-[#00C4FF] rounded-lg text-sm" size="sm">
            <Link href="https://twitter.com/lord_zexa">
            Twitter
            </Link>
          </Button>
          <Button className="font-medium bg-blue-50 hover:bg-blue-100 hover:text-[#0B66C2] text-[#0B66C2] rounded-lg text-sm" size="sm">
            <Link href="https://www.linkedin.com/in/ajay-mandal/">
            Linkedln
            </Link>
          </Button>
          <Button className="font-medium bg-gray-200 hover:bg-gray-300 hover:text-gray-900 text-gray-900 rounded-lg text-sm" size="sm">
            <Link href="https://github.com/ajay-mandal">
            Github
            </Link>
          </Button>
        </div>
      </footer>
    </div>
  )
}
