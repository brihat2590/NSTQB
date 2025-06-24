"use client";

import { Loader, LoaderCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true); // Add a loading flag

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/sign-in");
    } else {
      setCheckingAuth(false); // Done checking, allow render
    }
  }, [router]);

  if (checkingAuth) {
    return <div className="flex justify-center items-center"><LoaderCircleIcon/></div>
  }

  return <div>{children}</div>;
};

export default Layout;
