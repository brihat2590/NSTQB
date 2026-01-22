"use client";

import CarouselAdminPage from "@/components/adminComponents/carouselComponent";
import CertifiedTestersAdmin from "@/components/adminComponents/certifiedTesters";
import ExamAdminPanel from "@/components/adminComponents/ExamDateComponent";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import AdminBoardMembersPage from "@/components/adminComponents/boardMemberComp";
import FlowingAdminPage from "@/components/adminComponents/flowingHealines";
import { ArrowLeft, ChevronLeft, LayoutGrid, LogOut } from "lucide-react";
import Link from "next/link";

export default function Page() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    router.push("/sign-in");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Navigation - Matches Dashboard Style */}
      <header className="bg-white border-b border-zinc-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <div className="bg-indigo-600 p-1.5 rounded-lg">
                <LayoutGrid className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-xl md:text-2xl font-semibold text-zinc-900 tracking-tight">
                Page <span className="text-zinc-400 font-normal">Admin</span>
              </h1>
            </div>

            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-semibold text-zinc-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 flex items-center gap-2 active:scale-95"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Admin Sections Wrapper */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-10">
          <Link className="py-1" href={"/admin"}><ChevronLeft/></Link>
          <h2 className="text-3xl font-semibold text-zinc-900">Manage Content</h2>
          <p className="text-zinc-500 mt-1">Configure homepage sections, testers, and board members.</p>
        </div>

        <div className="space-y-12">
          {/* Section: Certified Testers */}
          <section className="bg-white rounded-3xl border border-zinc-100 p-8 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-zinc-800 mb-6 flex items-center gap-2">
              <div className="w-1.5 h-6 bg-indigo-500 rounded-full" />
              Certified Testers Management
            </h3>
            <CertifiedTestersAdmin />
          </section>

          {/* Section: Carousel */}
          <section className="bg-white rounded-3xl border border-zinc-100 p-8 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-zinc-800 mb-6 flex items-center gap-2">
              <div className="w-1.5 h-6 bg-blue-500 rounded-full" />
              Hero Carousel Slides
            </h3>
            <CarouselAdminPage />
          </section>

          {/* Section: Exam Admin */}
          <section className="bg-white rounded-3xl border border-zinc-100 p-8 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-zinc-800 mb-6 flex items-center gap-2">
              <div className="w-1.5 h-6 bg-emerald-500 rounded-full" />
              Exam Schedule & Dates
            </h3>
            <ExamAdminPanel />
          </section>

          {/* Section: Board Members */}
          <section className="bg-white rounded-3xl border border-zinc-100 p-8 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-zinc-800 mb-6 flex items-center gap-2">
              <div className="w-1.5 h-6 bg-amber-500 rounded-full" />
              Board Members Gallery
            </h3>
            <AdminBoardMembersPage />
          </section>

          {/* Section: Flowing Headlines */}
          <section className="bg-white rounded-3xl border border-zinc-100 p-8 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-zinc-800 mb-6 flex items-center gap-2">
              <div className="w-1.5 h-6 bg-rose-500 rounded-full" />
              Announcement Tickers
            </h3>
            <FlowingAdminPage />
          </section>
        </div>
      </main>
    </div>
  );
}