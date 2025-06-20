// lib/examScheduleData.ts

export type ScheduleArrayType = {
    examDate: string; // ISO format: YYYY-MM-DD
    day: string;
    examTitle: string;
    applicationPeriod: string; // Also ISO format
    fees: string;
    location: string;
  };
  
  export const scheduleArray: ScheduleArrayType[] = [
    {
      examDate: "2025-06-30", // ✅ July 26, 2025
      day: "Saturday",
      examTitle: "ISTQB® Certified Tester Foundation Level (CTFL) v4.0",
      applicationPeriod: "2025-06-21", // ✅ 5 days before
      fees: "NPR 21000*/-",
      location: "Kathmandu",
    },
  ];
  