"use client"
import CarouselAdminPage from "@/components/adminComponents/carouselComponent";
import CertifiedTestersAdmin from "@/components/adminComponents/certifiedTesters";
import ExamAdminPanel from "@/components/adminComponents/ExamDateComponent";
import { toast } from "sonner";
import { useRouter } from "next/navigation";




export default function page(){
  const router=useRouter();
  const handleLogout=()=>{
    localStorage.removeItem("token");
    toast.success("Logged out successfully")
    router.push("/sign-in")
  }
  return(
    <div>

      <button className="bg-blue-600 text-white right-0 top-0 p-3 m-2 rounded-xl " onClick={handleLogout}>Logout</button>

      <h1 className="text-3xl text-center">Admin Panel</h1>
      <CertifiedTestersAdmin/>
      <CarouselAdminPage/>
      <ExamAdminPanel/>
    </div>
  )
}