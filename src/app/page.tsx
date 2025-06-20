import AboutSection from "@/components/AboutSection";
import  CalendarPage from "@/components/DatePicker";
import LandingPage from "@/components/firstPage";
import FlowingHeadline from "@/components/flowingHeadline";
import Footer from "@/components/footer";
import MemberBoards from "@/components/MemberBoard";
import Navbar from "@/components/Navbar";
import ExamCalendar from "@/components/Registration-Calendar";

export default function Home(){
    return(
        <>
        <Navbar/>
        <FlowingHeadline/>
        <LandingPage/>
        <ExamCalendar/>
        

        <AboutSection/>
        <MemberBoards/>
        
        <Footer/>
        </>
    )   
}