"use client";

import CarouselAdminPage from "@/components/adminComponents/carouselComponent";
import CertifiedTestersAdmin from "@/components/adminComponents/certifiedTesters";
import ExamAdminPanel from "@/components/adminComponents/ExamDateComponent";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    router.push("/sign-in");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Sticky Top Bar */}
      <div className="flex justify-between items-center mb-6 sticky top-0 z-50 bg-white shadow-sm px-6 py-4 rounded-lg">
        <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-xl transition"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      {/* Admin Sections */}
      <div className="space-y-10">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <CertifiedTestersAdmin />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <CarouselAdminPage />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <ExamAdminPanel />
        </div>
      </div>
    </div>
  );
}
