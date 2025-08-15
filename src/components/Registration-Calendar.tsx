'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';

type Exam = {
  id: string;
  examTitle: string;
  examDate: string;
  applicationPeriod: string;
  location: string;
};

export default function ExamCalendar() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [currentDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const router = useRouter();

  useEffect(() => {
    fetch('/api/exam-date')
      .then((res) => res.json())
      .then(setExams)
      .catch(console.error);
  }, []);


  

  const isSameDay = (a: Date, b: Date) =>
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear();

  const isExamDate = (date: Date | null) => {
    if (!date) return false;
    return exams.some((exam) => isSameDay(date, new Date(exam.examDate)));
  };

  const isExamCompleted = (exam: Exam) => currentDate > new Date(exam.examDate);
  const isRegistrationClosed = (exam: Exam) => currentDate > new Date(exam.applicationPeriod);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const days: (Date | null)[] = [];

  for (let i = 0; i < firstDayOfMonth; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(new Date(currentYear, currentMonth, i));

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto p-6 ">
      <div className="flex justify-between items-center mt-10 mb-8">
        <h1 className="text-3xl font-bold ml-3">NSTQB Exam Calendar</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
        {/* Calendar on the left */}
        <div className="w-full lg:w-[55%] bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-5">
            <button
              onClick={prevMonth}
              className="p-2 rounded-full hover:bg-gray-100 transition"
              aria-label="Previous Month"
            >
              &#8592;
            </button>
            <h2 className="text-xl font-semibold select-none">
              {new Date(currentYear, currentMonth).toLocaleDateString('en-US', {
                month: 'long',
                year: 'numeric',
              })}
            </h2>
            <button
              onClick={nextMonth}
              className="p-2 rounded-full hover:bg-gray-100 transition"
              aria-label="Next Month"
            >
              &#8594;
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-3 text-sm text-gray-600 font-semibold select-none">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {days.map((date, index) => {
              const highlight = date && isExamDate(date);
              const today = date && isSameDay(date, currentDate);

              return (
                <div
                  key={index}
                  className={`h-14 flex items-center justify-center rounded-md transition-all duration-200
                    ${date ? 'cursor-pointer' : ''}
                    ${today ? 'bg-blue-100 border border-blue-500 font-semibold text-blue-700' : 'text-gray-700'}
                    ${highlight ? 'bg-red-200 text-red-800 font-bold rounded-full' : ''}
                    hover:bg-blue-50
                  `}
                  title={date ? date.toDateString() : undefined}
                >
                  {date ? date.getDate() : ''}
                </div>
              );
            })}
          </div>
        </div>

        {/* Cards on the right */}
        <div className="w-full lg:w-[35%] space-y-6">
          <h2 className="text-xl font-semibold mb-4">Upcoming Exams</h2>

          {exams.length === 0 ? (
            <p className="text-gray-500 py-2">No upcoming exams Scheduled for now</p>
          ) : (
            exams.map((exam) => (
              <div
                key={exam.id}
                className={`bg-white rounded-lg shadow-md p-5 transition-opacity duration-300 ${
                  isExamCompleted(exam) ? 'opacity-60' : ''
                }`}
              >
                <h3 className={`font-bold text-lg ${isExamCompleted(exam) ? 'text-gray-500' : 'text-gray-900'}`}>
                  {exam.examTitle} {isExamCompleted(exam) && ' (Completed)'}
                </h3>
                <p className={`mt-1 ${isExamCompleted(exam) ? 'text-gray-400' : 'text-gray-600'}`}>
                  Exam Date: {format(new Date(exam.examDate), 'MMMM dd, yyyy')}
                </p>
                <p className={`mt-1 ${isRegistrationClosed(exam) ? 'text-red-600' : 'text-gray-600'}`}>
                  Registration deadline: {format(new Date(exam.applicationPeriod), 'MMMM dd, yyyy')}
                  {isRegistrationClosed(exam) && ' (Closed)'}
                </p>
                <p className={`mt-1 ${isExamCompleted(exam) ? 'text-gray-400' : 'text-gray-600'}`}>
                  Location: {exam.location}
                </p>
                <div className="flex gap-2 mt-4">
                  <Button
                    className="bg-gradient-to-r from-red-600 to-blue-600 text-white font-semibold px-8 py-6 rounded-lg shadow-lg transition-all duration-300 ease-out  hover:shadow-xl hover:from-red-500 hover:to-blue-500  w-full  "
                    disabled={isRegistrationClosed(exam) || isExamCompleted(exam)}
                    onClick={() => router.push('/registration')}
                  >
                    {isExamCompleted(exam)
                      ? 'Exam Completed'
                      : isRegistrationClosed(exam)
                      ? 'Registration Closed'
                      : 'Register'}
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
