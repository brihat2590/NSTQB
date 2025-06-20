"use client";
import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AdminPage() {
  const [loading, setLoading] = useState(true);
  const [adminEmail, setAdminEmail] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("admin_token");

    if (!token) {
      router.push("/sign-in");
      return;
    }

    try {
      const decoded: any = jwt.decode(token);
      if (!decoded || !decoded.email) throw new Error("Invalid token");
      setAdminEmail(decoded.email);
    } catch {
      localStorage.removeItem("admin_token");
      router.push("/sign-in");
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl mb-2 font-bold">Welcome, Admin</h1>
      <p>Logged in as: {adminEmail}</p>
      <button
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        onClick={() => {
          localStorage.removeItem("admin_token");
          toast.success("Logged out successfully!");
          router.push("/sign-in");
        }}
      >
        Logout
      </button>
      
    </div>
  );
}
