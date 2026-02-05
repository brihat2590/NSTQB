import AboutSection from "@/components/AboutSection";

import LandingPage from "@/components/firstPage";
import FlowingHeadline from "@/components/flowingHeadline";
import Footer from "@/components/footer";
import MemberBoards from "@/components/MemberBoard";
import Navbar from "@/components/Navbar";
import ExamCalendar from "@/components/Registration-Calendar";
import UnderConstruction from "@/components/UnderConstruction";
import UpcomingEvents from "@/components/UpcomingEvents";

export default function Home() {
    const dburl = process.env.DATABASE_URL;
    console.log(dburl)
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