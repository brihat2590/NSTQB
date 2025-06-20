"use client";

import { useState } from "react";
import { Calendar } from "@/components/Calendar";
import { ExamCard } from "./ExamCard";
import { exams } from "./ExamData";

export default function CalendarPage() {
  const [dates, setDates] = useState<Date[] | undefined>([
    new Date("2025-06-25"),
    new Date("2025-07-25"),
  ]);   

  return (
    <main className="flex flex-col md:flex-row items-center justify-center gap-10 p-8 min-h-screen bg-gray-50  ">
      {/* Left: Calendar */}
      <div className="p-6 border rounded-xl shadow-lg bg-white ">
        <h1 className="text-2xl font-semibold mb-4 text-center">Exam Dates</h1>
        <Calendar
          mode="multiple"
          selected={dates}
          onSelect={()=>{}}
          className="max-w-8xl"
          
          // Enlarged calendar
        />

        {dates && dates.length > 0 && (
          <div className="mt-6 text-sm text-center text-gray-600">
            <p className="font-medium"> Exam Dates:</p>
            <ul>
              {dates.map((date, i) => (
                <li key={i}>{date.toDateString()}</li>
              ))}
            </ul>
          </div>
        )}
      </div>  

      {/* Right: Exam Cards */}
      <div className="w-full max-w-md ">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Upcoming Exams</h2>
        {exams.map((exam) => (
          <ExamCard key={`${exam.city}-${exam.examDate}`} {...exam} />
        ))}
      </div>
    </main>
  );
}
