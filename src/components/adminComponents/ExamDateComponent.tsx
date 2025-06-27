"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Delete, Edit } from "lucide-react";

type Exam = {
  id: string;
  examTitle: string;
  examDate: string;
  applicationPeriod: string;
  location: string;
};

export default function ExamAdminPanel() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [newExam, setNewExam] = useState<Omit<Exam, "id">>({
    examTitle: "",
    examDate: "",
    applicationPeriod: "",
    location: "",
  });
  const [editId, setEditId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Omit<Exam, "id">>({
    examTitle: "",
    examDate: "",
    applicationPeriod: "",
    location: "",
  });

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    const res = await axios.get("/api/exam-date");
    setExams(res.data);
  };

  const handleAdd = async () => {
    await axios.post("/api/exam-date", newExam);
    setNewExam({ examTitle: "", examDate: "", applicationPeriod: "", location: "" });
    fetchExams();
  };

  const handleUpdate = async (id: string) => {
    await axios.put(`/api/exam-date/${id}`, editData);
    setEditId(null);
    setEditData({ examTitle: "", examDate: "", applicationPeriod: "", location: "" });
    fetchExams();
  };

  const handleDelete = async (id: string) => {
    await axios.delete(`/api/exam-date/${id}`);
    fetchExams();
  };

  return (
    <div className="w-full max-w-8xl mx-auto px-4 py-8">
      <header className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          Exam Schedule Admin Panel
        </h1>
        <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
      </header>

      {/* Add Exam Section */}
      <section className="bg-white rounded-xl shadow-md p-6 mb-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Add New Exam</h2>
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-blue-600 font-bold">+</span>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Exam Title</label>
            <input
              type="text"
              placeholder="Enter exam title"
              value={newExam.examTitle}
              onChange={(e) => setNewExam({ ...newExam, examTitle: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Exam Date</label>
              <input
                type="date"
                value={newExam.examDate}
                onChange={(e) => setNewExam({ ...newExam, examDate: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Registration Deadline
              </label>
              <input
                type="date"
                value={newExam.applicationPeriod}
                onChange={(e) => setNewExam({ ...newExam, applicationPeriod: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              type="text"
              placeholder="Enter location"
              value={newExam.location}
              onChange={(e) => setNewExam({ ...newExam, location: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          <div className="pt-2">
            <button
              onClick={handleAdd}
              className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300 transform hover:-translate-y-0.5 shadow-md"
            >
              Add Exam
            </button>
          </div>
        </div>
      </section>

      {/* Exam List Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Exam Schedule</h2>
          <span className="bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1 rounded-full">
            {exams.length} exams
          </span>
        </div>

        <div className="space-y-5">
          {exams.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <p className="text-gray-500 text-lg">No exams scheduled yet</p>
            </div>
          ) : (
            exams.map((exam) => (
              <div
                key={exam.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition"
              >
                {editId === exam.id ? (
                  <div className="p-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Exam Title
                        </label>
                        <input
                          type="text"
                          value={editData.examTitle}
                          onChange={(e) => setEditData({ ...editData, examTitle: e.target.value })}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Exam Date
                          </label>
                          <input
                            type="date"
                            value={editData.examDate}
                            onChange={(e) => setEditData({ ...editData, examDate: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Registration Deadline
                          </label>
                          <input
                            type="date"
                            value={editData.applicationPeriod}
                            onChange={(e) =>
                              setEditData({ ...editData, applicationPeriod: e.target.value })
                            }
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Location
                        </label>
                        <input
                          type="text"
                          value={editData.location}
                          onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                        />
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 pt-4">
                        <button
                          onClick={() => handleUpdate(exam.id)}
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition shadow-md"
                        >
                          Save Changes
                        </button>
                        <button
                          onClick={() => {
                            setEditId(null);
                            setEditData({
                              examTitle: "",
                              examDate: "",
                              applicationPeriod: "",
                              location: "",
                            });
                          }}
                          className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-4 rounded-lg transition"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">{exam.examTitle}</h3>
                      <div className="flex gap-3">
                      <div className="flex flex-col sm:flex-row gap-3">
                            <button
                              onClick={() => {
                                setEditId(exam.id);
                                setEditData({
                                  examTitle: exam.examTitle,
                                  examDate: exam.examDate.slice(0, 10),
                                  applicationPeriod: exam.applicationPeriod.slice(0, 10),
                                  location: exam.location,
                                });
                              }}
                              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition text-sm w-full sm:w-auto inline-flex gap-2 items-center"
                            >
                              <Edit className="" />
                              Edit
                            </button>

                            <button
                              onClick={() => handleDelete(exam.id)}
                              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition text-sm w-full sm:w-auto inline-flex items-center gap-2"
                            >
                              <Delete className="" />
                              Delete
                            </button>
                          </div>

                              
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider">Exam Date</p>
                        <p className="font-medium text-gray-800">
                          {new Date(exam.examDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider">
                          Registration Deadline
                        </p>
                        <p className="font-medium text-gray-800">
                          {new Date(exam.applicationPeriod).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider">Location</p>
                        <p className="font-medium text-gray-800">{exam.location}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}