"use client";

import { useAuth } from "@/auth.provider";
import Navbar from "@/components/common/navbar";
import AppSpinner from "@/components/common/spinner";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/theme.provider";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function ProtectedPage() {
  const { user, logout } = useAuth();
  const { theme } = useTheme();
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (user === null) {
        router.push("/login");
      }
    }, 1500);

    return () => clearTimeout(timeout);
  }, [user, router]);


  const handleLogout = () => {
    logout();
    router.push("/");
  }

  if (!user) {
    return (
      <div><AppSpinner /></div>
    );
  }

  const hLabel1 = () => {
    return (
      <Link href="/" className="flex items-center">
        <ArrowLeft className="mr-2" />
        <span className="text-lg font-semibold">Back to Home</span>
      </Link>
    );
  };

  const hLabel2 = () => {
    return (
      <Button variant="outline" size="icon">
        <ShoppingCart className="h-4 w-4 text-black" />
      </Button>
    );
  };

  return (
    <>
    <div className={`${theme === "light" ? "bg-gray-100 text-black" : "bg-slate-500 text-gray-300"} min-h-screen`}>
      <Navbar label1={hLabel1} label2={hLabel2} />
      <div className="flex flex-col items-center justify-center gap-3 mt-10">
      <h1>Welcome to the Protected Page, {user.name}!</h1>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
    </div>
    
    </>
  );
}
