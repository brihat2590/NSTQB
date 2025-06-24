'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';

type Exam = {
  id: string;
  examTitle: string;
  examDate: string;          // ISO string from backend
  applicationPeriod: string; // ISO string from backend
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

  // Helper functions
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

  // Generate calendar days
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const days: (Date | null)[] = [];

  for (let i = 0; i < firstDayOfMonth; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(new Date(currentYear, currentMonth, i));

  // Month navigation
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
    <div className="max-w-[1400px] mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">NSTQB Exam Calendar</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-15">
        {/* Calendar */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <button onClick={prevMonth} className="p-2 rounded-full hover:bg-gray-100">
              &lt;
            </button>
            <h2 className="text-xl font-semibold">
              {new Date(currentYear, currentMonth).toLocaleDateString('en-US', {
                month: 'long',
                year: 'numeric',
              })}
            </h2>
            <button onClick={nextMonth} className="p-2 rounded-full hover:bg-gray-100">
              &gt;
            </button>
          </div>

          <div className="grid grid-cols-7 gap-2 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center font-medium text-gray-500">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {days.map((date, index) => {
              const highlight = date && isExamDate(date);
              const today = date && isSameDay(date, currentDate);

              return (
                <div
                  key={index}
                  className={`h-12 flex items-center justify-center rounded-md transition-all duration-200
                    ${date ? 'cursor-pointer' : ''}
                    ${today ? 'border-2 border-blue-500' : ''}
                    ${highlight ? 'bg-red-100 text-red-800 font-bold' : ''}
                  `}
                >
                  {date ? date.getDate() : ''}
                </div>
              );
            })}
          </div>
        </div>

        {/* Exam Cards */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">Upcoming Exams</h2>
          {exams.map((exam) => (
            <div
              key={exam.id}
              className={`bg-white rounded-lg shadow-md p-4 ${
                isExamCompleted(exam) ? 'opacity-75' : ''
              }`}
            >
              <h3 className={`font-bold text-lg ${isExamCompleted(exam) ? 'text-gray-500' : ''}`}>
                {exam.examTitle} {isExamCompleted(exam) && ' (Completed)'}
              </h3>
              <p className={`mt-1 ${isExamCompleted(exam) ? 'text-gray-500' : 'text-gray-600'}`}>
                Exam Date: {format(new Date(exam.examDate), 'MMMM dd, yyyy')}
              </p>
              <p className={`mt-1 ${isRegistrationClosed(exam) ? 'text-red-500' : 'text-gray-600'}`}>
                Registration deadline: {format(new Date(exam.applicationPeriod), 'MMMM dd, yyyy')}
                {isRegistrationClosed(exam) && ' (Closed)'}
              </p>
              <p className={`mt-1 ${isExamCompleted(exam) ? 'text-gray-500' : 'text-gray-600'}`}>
                Location: {exam.location}
              </p>
              <div className="flex gap-2 mt-3">
                <Button
                  className="w-full bg-gradient-to-r from-red-600 to-blue-600 text-white"
                  disabled={isRegistrationClosed(exam) || isExamCompleted(exam)}
                  onClick={() => router.push('/registration-process')}
                >
                  {isExamCompleted(exam)
                    ? 'Exam Completed'
                    : isRegistrationClosed(exam)
                    ? 'Registration Closed'
                    : 'Register'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
