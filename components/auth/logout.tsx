'use client';

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export default function Logout(){
    return (
        <span className="flex items-center bg-white text-black shadow-lg p-2 rounded-lg cursor-pointer hover:bg-slate-100" onClick={() => {
            signOut();
        }}>
            Logout
            <LogOut className="ml-2" size={18}/>
        </span>
    );
}