'use client';

import React, { useEffect, useState } from 'react';

type QuestionType = 'single' | 'multiple';

interface QuestionForm {
  chapter: string;
  type: QuestionType;
  question: string;
  options: string[]; // always length 4
  correctAnswer: number; // -1 if multiple correct
  correctAnswers: number[]; // [] if single correct
  explanation: string;
}

interface Question {
  id: number;
  chapter: string;
  type: QuestionType;
  question: string;
  options: string[];
  correctAnswer: number;
  correctAnswers: number[];
  explanation: string;
  setId: number;
}

interface QuestionSet {
  id: number;
  title: string;
  createdAt: string;
  questions: Question[];
}

export default function AdminPanel() {
  const [sets, setSets] = useState<QuestionSet[]>([]);
  const [title, setTitle] = useState('');
  const [selectedSet, setSelectedSet] = useState<QuestionSet | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);

  const initialQuestionForm: QuestionForm = {
    chapter: '',
    type: 'single',
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    correctAnswers: [],
    explanation: '',
  };
  const [form, setForm] = useState<QuestionForm>(initialQuestionForm);

  useEffect(() => {
    fetchSets();
  }, []);

  async function fetchSets() {
    const res = await fetch('/api/sets');
    const data: QuestionSet[] = await res.json();
    setSets(data);
  }

  async function createSet() {
    if (!title.trim()) return alert('Set title cannot be empty');
    const res = await fetch('/api/sets', {
      method: 'POST',
      body: JSON.stringify({ title }),
    });
    if (!res.ok) return alert('Failed to create set');
    const newSet = await res.json();
    setSets((prev) => [...prev, newSet]);
    setTitle('');
  }

  // Update questions list when set changes
  useEffect(() => {
    if (selectedSet) {
      setQuestions(selectedSet.questions);
    } else {
      setQuestions([]);
    }
  }, [selectedSet]);

  function updateOption(index: number, value: string) {
    const newOpts = [...form.options];
    newOpts[index] = value;
    setForm({ ...form, options: newOpts });
  }

  function toggleCorrectAnswer(index: number) {
    if (form.type === 'single') {
      setForm({ ...form, correctAnswer: index, correctAnswers: [] });
    } else {
      let updated = [...form.correctAnswers];
      if (updated.includes(index)) {
        updated = updated.filter((i) => i !== index);
      } else {
        updated.push(index);
      }
      setForm({ ...form, correctAnswers: updated, correctAnswer: -1 });
    }
  }

  async function addQuestion() {
    if (
      !form.chapter.trim() ||
      !form.question.trim() ||
      form.options.some((opt) => !opt.trim()) ||
      !form.explanation.trim()
    ) {
      return alert('Please fill all fields and options');
    }

    if (
      (form.type === 'single' && (form.correctAnswer < 0 || form.correctAnswer > 3)) ||
      (form.type === 'multiple' && form.correctAnswers.length === 0)
    ) {
      return alert('Please select correct answer(s)');
    }

    if (!selectedSet) return alert('Select a set first');

    const body = { ...form, setId: selectedSet.id };

    const res = await fetch('/api/questions', {
      method: 'POST',
      body: JSON.stringify(body),
    });
    if (!res.ok) return alert('Failed to add question');

    const newQ: Question = await res.json();
    setQuestions((prev) => [...prev, newQ]);
    setForm(initialQuestionForm);
  }

  async function deleteQuestion(id: number) {
    if (!confirm('Are you sure you want to delete this question?')) return;
    const res = await fetch(`/api/questions/${id}`, { method: 'DELETE' });
    if (!res.ok) return alert('Failed to delete question');
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  }

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-12 bg-white shadow-lg rounded-lg">
      <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-10">
        ISTQB Exam Admin Panel
      </h1>

      {/* Create New Set */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Create a New Question Set</h2>
        <div className="flex max-w-lg mx-auto gap-4">
          <input
            type="text"
            placeholder="Set Title"
            className="flex-grow border border-indigo-300 rounded-md px-5 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            onClick={createSet}
            className="bg-indigo-600 text-white px-6 rounded-md hover:bg-indigo-700 transition"
          >
            Create Set
          </button>
        </div>
      </section>

      {/* Select Set */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Select a Set to Manage Questions</h2>
        <div className="flex flex-wrap gap-3 justify-center">
          {sets.length === 0 && (
            <p className="italic text-gray-500">No sets created yet. Create one above.</p>
          )}
          {sets.map((set) => (
            <button
              key={set.id}
              onClick={() => setSelectedSet(set)}
              className={`px-5 py-3 rounded-full font-semibold border-2 transition ${
                selectedSet?.id === set.id
                  ? 'bg-indigo-600 border-indigo-600 text-white'
                  : 'border-indigo-300 text-indigo-600 hover:bg-indigo-100'
              }`}
            >
              {set.title}
            </button>
          ))}
        </div>
      </section>

      {/* Add Question Form */}
      {selectedSet && (
        <section className="max-w-4xl mx-auto bg-indigo-50 p-8 rounded-lg shadow-inner">
          <h2 className="text-3xl font-semibold mb-6 text-indigo-700">
            Add Questions to: {selectedSet.title}
          </h2>
          <div className="space-y-6">
            <input
              type="text"
              placeholder="Chapter"
              value={form.chapter}
              onChange={(e) => setForm({ ...form, chapter: e.target.value })}
              className="w-full border border-indigo-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />

            <textarea
              placeholder="Question"
              value={form.question}
              onChange={(e) => setForm({ ...form, question: e.target.value })}
              className="w-full border border-indigo-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
              rows={3}
            />

            {/* Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {form.options.map((opt, i) => (
                <div key={i} className="flex items-center space-x-3">
                  {form.type === 'single' ? (
                    <input
                      type="radio"
                      name="correctAnswer"
                      checked={form.correctAnswer === i}
                      onChange={() => toggleCorrectAnswer(i)}
                      className="cursor-pointer w-5 h-5 text-indigo-600"
                    />
                  ) : (
                    <input
                      type="checkbox"
                      checked={form.correctAnswers.includes(i)}
                      onChange={() => toggleCorrectAnswer(i)}
                      className="cursor-pointer w-5 h-5 text-indigo-600"
                    />
                  )}
                  <input
                    type="text"
                    placeholder={`Option ${i + 1}`}
                    value={opt}
                    onChange={(e) => updateOption(i, e.target.value)}
                    className="flex-grow border border-indigo-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                </div>
              ))}
            </div>

            {/* Multiple answers feedback */}
            {form.type === 'multiple' && form.correctAnswers.length > 0 && (
              <p className="text-green-700 font-medium">
                Selected correct answers:{' '}
                {form.correctAnswers.map((i) => `Option ${i + 1}`).join(', ')}
              </p>
            )}
            {form.type === 'multiple' && form.correctAnswers.length === 0 && (
              <p className="text-red-600 font-medium">Please select at least one correct answer.</p>
            )}

            {/* Question Type */}
            <div className="flex gap-8">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="qtype"
                  value="single"
                  checked={form.type === 'single'}
                  onChange={() =>
                    setForm({ ...form, type: 'single', correctAnswers: [], correctAnswer: 0 })
                  }
                  className="w-5 h-5 text-indigo-600"
                />
                <span className="select-none">Single Choice</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="qtype"
                  value="multiple"
                  checked={form.type === 'multiple'}
                  onChange={() =>
                    setForm({ ...form, type: 'multiple', correctAnswers: [], correctAnswer: -1 })
                  }
                  className="w-5 h-5 text-indigo-600"
                />
                <span className="select-none">Multiple Choice</span>
              </label>
            </div>

            <textarea
              placeholder="Explanation"
              value={form.explanation}
              onChange={(e) => setForm({ ...form, explanation: e.target.value })}
              className="w-full border border-indigo-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
              rows={2}
            />

            <button
              onClick={addQuestion}
              className="bg-indigo-600 hover:bg-indigo-700 transition text-white rounded-md px-8 py-3 font-semibold shadow-lg"
            >
              Add Question
            </button>
          </div>
        </section>
      )}

      {/* Questions List */}
      {selectedSet && (
        <section className="max-w-5xl mx-auto mt-12">
          <h2 className="text-3xl font-semibold mb-6 text-indigo-700">
            Questions in "{selectedSet.title}"
          </h2>

          {questions.length === 0 && (
            <p className="italic text-gray-600 text-center py-10 bg-indigo-50 rounded-md">
              No questions added yet.
            </p>
          )}

          <ul className="space-y-8">
            {questions.map((q) => (
              <li
                key={q.id}
                className="border border-indigo-300 rounded-lg p-6 shadow-sm bg-white"
              >
                <h3 className="text-xl font-semibold mb-2">{q.question}</h3>
                <p className="italic text-indigo-600 mb-2 text-sm">Chapter: {q.chapter}</p>
                <ul className="list-disc list-inside mb-3 space-y-1">
                  {q.options.map((opt, i) => {
                    const isCorrect =
                      (q.type === 'single' && i === q.correctAnswer) ||
                      (q.type === 'multiple' && q.correctAnswers.includes(i));
                    return (
                      <li
                        key={i}
                        className={`pl-2 ${
                          isCorrect ? 'font-bold text-green-700' : ''
                        }`}
                      >
                        {opt}
                      </li>
                    );
                  })}
                </ul>
                <p className="text-gray-700 mb-3">
                  <strong>Explanation:</strong> {q.explanation}
                </p>
                <button
                  onClick={() => deleteQuestion(q.id)}
                  className="text-red-600 hover:underline font-semibold"
                >
                  Delete Question
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
