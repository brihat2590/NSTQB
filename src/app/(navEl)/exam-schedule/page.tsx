import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { scheduleArray } from "@/lib/examScheduleData";
import { parseISO, format } from "date-fns";

export default function Schedule() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-red-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 bg-gray-50 text-gray-600 py-12 px-6 rounded-2xl shadow-lg">
          <h1 className="text-4xl font-bold mb-4">Exam Schedule</h1>
          <p className="text-xl max-w-2xl mx-auto opacity-95">Nepal Software Testing Qualifications Body</p>
          <p className="mt-2 opacity-90">View upcoming certification exam dates and application periods</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-red-50 to-blue-50">
            <CardTitle className="text-2xl text-gray-900 text-center">2025 Examination Schedule</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-100 to-gray-200 border-b">
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Exam Date</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Day</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Exam Title</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Application Period</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Fees</th>
                  </tr>
                </thead>
                <tbody>
                  {scheduleArray.map((schedule, index) => (
                    <tr
                      key={index}
                      className={`border-b hover:bg-gradient-to-r hover:from-red-25 hover:to-blue-25 transition-colors ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td className="py-4 px-6 text-gray-800 font-medium">
                        {format(parseISO(schedule.examDate), "MMMM dd, yyyy")}
                      </td>
                      <td className="py-4 px-6 text-gray-600">{schedule.day}</td>
                      <td className="py-4 px-6 text-gray-800">{schedule.examTitle}</td>
                      <td className="py-4 px-6 text-gray-600">
                        Till {format(parseISO(schedule.applicationPeriod), "MMMM dd, yyyy")}
                      </td>
                      <td className="py-4 px-6 text-green-600 font-semibold">{schedule.fees}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
