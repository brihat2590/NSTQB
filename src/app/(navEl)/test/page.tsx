import HeroCarousel from "@/components/CarouselComp";
import MemberBoards from "@/components/MemberBoard";
import Portfolio from "@/components/Porfolio";
import MockTest from "@/components/ui/mockTest";

export default async function page(){
    await new Promise((res) => setTimeout(res, 3500))
    return(
        <div>
            <MockTest/>
            
        

    
        </div>
    
    )
}