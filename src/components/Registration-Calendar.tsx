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

  const isExamCompleted = (exam: Exam) =>
    currentDate > new Date(exam.examDate);

  const isRegistrationClosed = (exam: Exam) =>
    currentDate > new Date(exam.applicationPeriod);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const days: (Date | null)[] = [];

  for (let i = 0; i < firstDayOfMonth; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(currentYear, currentMonth, i));
  }

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
    <section className="border-t border-gray-200 bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-14 text-center">
        <div className="mx-auto mb-6 h-px w-32 bg-blue-400" />
          <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 md:pt-2">
            NSTQB Exam Calendar
          </h1>
          
          <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
            View upcoming NSTQB examinations, important dates, and registration
            deadlines at a glance.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Calendar */}
          <div className="w-full lg:w-[55%] bg-white p-6 shadow-sm shadow-black/30">
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={prevMonth}
                className="px-3 py-1 text-gray-600 hover:text-gray-900 transition"
              >
                ←
              </button>

              <h2 className="text-lg font-semibold">
                {new Date(currentYear, currentMonth).toLocaleDateString(
                  'en-US',
                  { month: 'long', year: 'numeric' }
                )}
              </h2>

              <button
                onClick={nextMonth}
                className="px-3 py-1 text-gray-600 hover:text-gray-900 transition"
              >
                →
              </button>
            </div>

            <div className="grid grid-cols-7 text-sm font-medium text-gray-500 mb-2">
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
                    className={`h-12 flex items-center justify-center text-sm transition
                      ${date ? 'cursor-pointer' : ''}
                      ${
                        today
                          ? 'border border-blue-400 bg-blue-50 text-blue-700 font-semibold'
                          : 'text-gray-700'
                      }
                      ${
                        highlight
                          ? 'bg-red-100 text-red-700 font-semibold rounded-full'
                          : ''
                      }
                      hover:bg-blue-50
                    `}
                  >
                    {date ? date.getDate() : ''}
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex gap-6 mt-6 text-sm text-gray-600">
              <span className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-300" />
                Exam Date
              </span>
              <span className="flex items-center gap-2">
                <span className="h-3 w-3 border border-blue-400 bg-blue-50" />
                Today
              </span>
            </div>
          </div>

          {/* Upcoming Exams */}
          <div className="w-full lg:w-[35%]">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
              Upcoming Exams
            </h2>

            {exams.length === 0 ? (
              <p className="text-gray-500">
                No exams are currently scheduled. Please check back later.
              </p>
            ) : (
              <div className="space-y-4">
                {exams.map((exam) => (
                  <div
                    key={exam.id}
                    className={`bg-white p-5 shadow-sm shadow-black/30 transition ${
                      isExamCompleted(exam) ? 'opacity-60' : ''
                    }`}
                  >
                    <h3 className="font-semibold text-lg text-gray-900">
                      {exam.examTitle}
                      {isExamCompleted(exam) && ' (Completed)'}
                    </h3>

                    <div className="mt-2 space-y-1 text-sm text-gray-600">
                      <p>
                        <span className="font-medium">Exam Date:</span>{' '}
                        {format(new Date(exam.examDate), 'MMMM dd, yyyy')}
                      </p>

                      <p
                        className={
                          isRegistrationClosed(exam)
                            ? 'text-red-600'
                            : ''
                        }
                      >
                        <span className="font-medium">
                          Registration Deadline:
                        </span>{' '}
                        {format(
                          new Date(exam.applicationPeriod),
                          'MMMM dd, yyyy'
                        )}
                        {isRegistrationClosed(exam) && ' (Closed)'}
                      </p>

                      <p>
                        <span className="font-medium">Location:</span>{' '}
                        {exam.location}
                      </p>
                    </div>

                    <Button
                      className="
                        mt-4 w-full
                        bg-slate-800
                       
                        py-3 font-medium
                        transition-colors
                      
                      "
                      disabled={
                        isExamCompleted(exam) || isRegistrationClosed(exam)
                      }
                      onClick={() => router.push('/registration')}
                    >
                      {isExamCompleted(exam)
                        ? 'Exam Completed'
                        : isRegistrationClosed(exam)
                        ? 'Registration Closed'
                        : 'Register Now'}
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
