import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import Login from "../components/auth/login";
import Logout from "../components/auth/logout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en" className=" bg-gray-100 text-black h-screen">
      <body className={inter.className}>
        <nav className="flex p-2 text-2xl bg-orange-400 h-16">
          {!session &&
            <Login />
          }
          {!!session &&
            <Logout />
          }
        </nav>
        <main className="">
          {children}
        </main>
      </body>
    </html>
  );
}
