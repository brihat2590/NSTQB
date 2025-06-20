export type ExamStatus = "open" | "closed";

export type Exam = {
  city: string;
  examDate: string;
  registrationDate: string;
  status: ExamStatus;
};

export const ExamCard = ({
  city,
  examDate,
  registrationDate,
  status,
}: Exam) => {
  const isClosed = status === "closed";

  return (
    <div
      className={`border-l-4 p-4 rounded-md w-full mb-4 shadow-sm ${
        isClosed
          ? "bg-red-100 border-red-600"
          : "bg-blue-100 border-blue-600"
      }`}
    >
      <h3 className="text-gray-800 font-semibold text-lg">{city}</h3>
      <p className="text-gray-700 text-sm">{examDate}</p>
      <p className={isClosed ? "text-red-500 text-sm" : "text-blue-600 text-sm"}>
        {registrationDate}{" "}
        {isClosed ? "( Registration Closed )" : "( Registration Open )"}
      </p>
    </div>
  );
};
