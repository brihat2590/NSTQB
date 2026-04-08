import AboutSection from "@/components/AboutSection";

import LandingPage from "@/components/firstPage";
import FlowingHeadline from "@/components/flowingHeadline";
import Footer from "@/components/footer";
import MemberBoards from "@/components/MemberBoard";
import Navbar from "@/components/Navbar";
import ExamCalendar from "@/components/Registration-Calendar";

import UpcomingEvents from "@/components/UpcomingEvents";

export default function Home() {
    const dburl = process.env.DATABASE_URL;
    
    return (
        <>
            <Navbar />

            <FlowingHeadline />
            <LandingPage />
            <UpcomingEvents />
            <ExamCalendar />


            <AboutSection />
            <MemberBoards />

            <Footer />
        </>






    )
}