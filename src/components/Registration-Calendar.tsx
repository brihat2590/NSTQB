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
      .then((data: Exam[]) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const upcomingExams = Array.isArray(data)
          ? data
              .filter((exam) => new Date(exam.examDate) >= today)
              .sort(
                (a, b) =>
                  new Date(a.examDate).getTime() -
                  new Date(b.examDate).getTime()
              )
          : [];

        setExams(upcomingExams);
      })
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

  const isRegistrationClosed = (exam: Exam) =>
    currentDate > new Date(exam.applicationPeriod);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const days: (Date | null)[] = [];

  for (let i = 0; i < firstDayOfMonth; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(currentYear, currentMonth, i));
  }

  const calendarRows = Math.ceil(days.length / 7);
  const examsPanelHeightClass =
    calendarRows <= 4
      ? 'lg:max-h-[300px]'
      : calendarRows === 5
        ? 'lg:max-h-[340px]'
        : 'lg:max-h-[380px]';
  const examsListHeightClass =
    calendarRows <= 4
      ? 'lg:max-h-[225px]'
      : calendarRows === 5
        ? 'lg:max-h-[265px]'
        : 'lg:max-h-[305px]';

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
      <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:py-14">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="mx-auto mb-5 h-px w-28 bg-blue-400" />
          <h1 className="text-3xl font-semibold text-gray-900 md:text-4xl">
            NSTQB Exam Calendar
          </h1>

          <p className="mt-3 text-sm text-gray-600 max-w-2xl mx-auto sm:text-base">
            View upcoming NSTQB examinations, important dates, and registration
            deadlines at a glance.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(280px,340px)] lg:items-start">
          {/* Calendar */}
          <div className="w-full bg-white p-4 shadow-sm shadow-black/20 sm:p-5">
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={prevMonth}
                className="grid size-8 place-items-center text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition"
                aria-label="Previous month"
              >
                ←
              </button>

              <h2 className="text-base font-semibold text-gray-900 sm:text-lg">
                {new Date(currentYear, currentMonth).toLocaleDateString(
                  'en-US',
                  { month: 'long', year: 'numeric' }
                )}
              </h2>

              <button
                onClick={nextMonth}
                className="grid size-8 place-items-center text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition"
                aria-label="Next month"
              >
                →
              </button>
            </div>

            <div className="grid grid-cols-7 text-xs font-medium text-gray-500 mb-2 sm:text-sm">
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
                    className={`flex h-9 items-center justify-center text-xs transition sm:h-10 sm:text-sm
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
            <div className="flex flex-wrap gap-4 mt-5 text-xs text-gray-600 sm:text-sm">
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
          <aside
            className={`w-full bg-white p-4 shadow-sm shadow-black/20 sm:p-5 lg:overflow-hidden ${examsPanelHeightClass}`}
          >
            <div className="mb-3 flex items-center justify-between gap-3 border-b border-gray-200 pb-2">
              <h2 className="text-lg font-semibold text-gray-900">
                Upcoming Exams
              </h2>
              {exams.length > 0 && (
                <span className="shrink-0 bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                  {exams.length}
                </span>
              )}
            </div>

            {exams.length === 0 ? (
              <p className="text-sm text-gray-500">
                No exams are currently scheduled. Please check back later.
              </p>
            ) : (
              <div
                className={`space-y-3 lg:overflow-y-auto lg:pr-2 ${examsListHeightClass}`}
              >
                {exams.map((exam) => (
                  <div
                    key={exam.id}
                    className="border border-gray-200 bg-gray-50 p-3 transition hover:border-blue-200 hover:bg-blue-50/40 sm:p-4"
                  >
                    <h3 className="text-sm font-semibold leading-snug text-gray-900 sm:text-base">
                      {exam.examTitle}
                    </h3>

                    <div className="mt-2 space-y-1 text-xs leading-5 text-gray-600 sm:text-sm">
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
                      size="sm"
                      className="
                        mt-3 w-full
                        bg-slate-800 font-medium
                        transition-colors hover:bg-slate-700
                      "
                      disabled={isRegistrationClosed(exam)}
                      onClick={() => router.push('/registration')}
                    >
                      {isRegistrationClosed(exam)
                        ? 'Registration Closed'
                        : 'Register Now'}
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}
