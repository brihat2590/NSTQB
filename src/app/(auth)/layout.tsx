"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loader, { Loader2Icon } from "lucide-react"

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/admin");
    } else {
      setCheckingAuth(false);
    }
  }, [router]);

  if (checkingAuth) {
    return <div><Loader2Icon/></div> // Or a full-screen loader/spinner if you prefer
  }

  return <div>{children}</div>;
};

export default Layout;
