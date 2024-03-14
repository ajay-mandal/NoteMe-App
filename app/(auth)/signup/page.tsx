export const dynamic = 'force-dynamic';
import { Quote } from "@/app/_components/Quote";
import SignUp_Component from "@/app/_components/Signup";
export default function Signup() {
    const seedList = [
        'Cleo', 'Bandit', 'Abby', 'Mimi',
        'Molly', 'Bob', 'Sugar', 'Coco',
        'Simon', 'Socks', 'Luna', 'Angel',
        'Bubba', 'Annie', 'Shadow', 'Callie',
        'Cuddles', 'Lilly', 'Buster', 'Dusty',
        'Oreo', 'Princess', 'Max', 'Toby',
        'Jasper', 'Sheba', 'Casper', 'Buddy',
        'Milo', 'Simba'
      ];
    const randomIndex = Math.floor(Math.random() * seedList.length);
    let url = `https://api.dicebear.com/7.x/notionists/svg?seed=${seedList[randomIndex]}&size=80`;

    return(
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="flex justify-center items-center h-screen">
                <SignUp_Component imageURL={url}/>
            </div>
            <div className="hidden lg:block">
                <Quote />
            </div>
        </div>

    )
}
