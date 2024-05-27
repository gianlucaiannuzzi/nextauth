import { LogIn, LogInIcon } from "lucide-react";
import Link from "next/link";

export default function Logout(){
    return (
        <Link href='/login' className="flex items-center bg-white shadow-lg p-2 rounded-lg cursor-pointer hover:bg-slate-100">
            <span>Login</span>
            <LogIn className="ml-2" size={18} />
        </Link>
    );
}