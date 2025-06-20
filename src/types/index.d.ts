type ExamStatus = "open" | "closed";

type Exam = {
  city: string;
  examDate: string;
  registrationDate: string;
  status: ExamStatus;
};

const exams: Exam[] = [
  {
    city: "Islamabad",
    examDate: "Jul 11, 2025",
    registrationDate: "Jun 20, 2025",
    status: "closed",
  },
  {
    city: "Karachi",
    examDate: "Jul 11, 2025",
    registrationDate: "Jun 20, 2025",
    status: "closed",
  },
  {
    city: "Lahore",
    examDate: "Jul 12, 2025",
    registrationDate: "Jun 21, 2025",
    status: "open",
  },
];
