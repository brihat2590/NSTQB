import CarouselAdminPage from "@/components/adminComponents/carouselComponent";
import CertifiedTestersAdmin from "@/components/adminComponents/certifiedTesters";

export default function page(){
  return(
    <div>
      this is the admin page
      <CertifiedTestersAdmin/>
      <CarouselAdminPage/>
    </div>
  )
}