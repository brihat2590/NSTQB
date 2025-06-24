"use client";

import { useEffect, useState } from "react";
import axios from "axios";

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
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Exam Schedule Admin Panel</h1>

      {/* Add Exam */}
      <div className="space-y-2 p-4 border rounded shadow">
        <h2 className="text-xl font-semibold">Add New Exam</h2>
        <input
          type="text"
          placeholder="Title"
          value={newExam.examTitle}
          onChange={(e) => setNewExam({ ...newExam, examTitle: e.target.value })}
          className="w-full border p-2 rounded"
        />
        <input
          type="date"
          value={newExam.examDate}
          onChange={(e) => setNewExam({ ...newExam, examDate: e.target.value })}
          className="w-full border p-2 rounded"
        />
        <input
          type="date"
          value={newExam.applicationPeriod}
          onChange={(e) => setNewExam({ ...newExam, applicationPeriod: e.target.value })}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Location"
          value={newExam.location}
          onChange={(e) => setNewExam({ ...newExam, location: e.target.value })}
          className="w-full border p-2 rounded"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Exam
        </button>
      </div>

      {/* Exam List */}
      <div className="space-y-4">
        {exams.map((exam) => (
          <div key={exam.id} className="border p-4 rounded shadow space-y-2">
            {editId === exam.id ? (
              <>
                <input
                  type="text"
                  value={editData.examTitle}
                  onChange={(e) => setEditData({ ...editData, examTitle: e.target.value })}
                  className="w-full border p-2 rounded"
                />
                <input
                  type="date"
                  value={editData.examDate}
                  onChange={(e) => setEditData({ ...editData, examDate: e.target.value })}
                  className="w-full border p-2 rounded"
                />
                <input
                  type="date"
                  value={editData.applicationPeriod}
                  onChange={(e) => setEditData({ ...editData, applicationPeriod: e.target.value })}
                  className="w-full border p-2 rounded"
                />
                <input
                  type="text"
                  value={editData.location}
                  onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                  className="w-full border p-2 rounded"
                />
                <div className="flex gap-3 mt-2">
                  <button
                    onClick={() => handleUpdate(exam.id)}
                    className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setEditId(null);
                      setEditData({ examTitle: "", examDate: "", applicationPeriod: "", location: "" });
                    }}
                    className="bg-gray-400 text-white px-4 py-1 rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-lg font-semibold">{exam.examTitle}</h3>
                <p>Exam Date: {exam.examDate?.slice(0, 10)}</p>
                <p>Registration Deadline: {exam.applicationPeriod?.slice(0, 10)}</p>
                <p>Location: {exam.location}</p>
                <div className="flex gap-3">
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
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(exam.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
