import CarouselAdminPage from "@/components/adminComponents/carouselComponent";
import CertifiedTestersAdmin from "@/components/adminComponents/certifiedTesters";
import ExamAdminPanel from "@/components/adminComponents/ExamDateComponent";

export default function page(){
  return(
    <div>
      this is the admin page
      <CertifiedTestersAdmin/>
      <CarouselAdminPage/>
      <ExamAdminPanel/>
    </div>
  )
}