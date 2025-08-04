"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"

import {
  Clock,
  CheckCircle,
  XCircle,
  Flag,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
} from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import ExamGuard from "@/components/ExamGuard"
import { motion } from "framer-motion"

type Question = {
  id: number
  chapter: string
  type: string
  question: string
  options: string[]
  correctAnswer: number
  correctAnswers: number[]
  explanation: string
}

type QuestionSet = {
  id: number
  title: string
  createdAt: string
  questions: Question[]
}

type QuizState = "not-started" | "in-progress" | "completed"

export default function MockTest() {
  const [sets, setSets] = useState<QuestionSet[]>([])
  const [selectedSetId, setSelectedSetId] = useState<number | null>(null)

  const [quizState, setQuizState] = useState<QuizState>("not-started")
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<any[]>([])
  const [timeLeft, setTimeLeft] = useState(60 * 60)
  const [score, setScore] = useState(0)
  const [showExplanations, setShowExplanations] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const router = useRouter()

  // Fetch sets from /api/set
  useEffect(() => {
    async function fetchSets() {
      try {
        const res = await fetch("/api/sets")
        if (!res.ok) throw new Error("Failed to fetch sets")
        const data: QuestionSet[] = await res.json()
        setSets(data)
        if (data.length > 0) {
          setSelectedSetId(data[0].id)
        }
      } catch (error) {
        console.error(error)
      }
    }
    fetchSets()
  }, [])

  // Fetch questions for selected set from /api/questions?setId=...
  useEffect(() => {
    async function fetchQuestions() {
      if (selectedSetId === null) return
      try {
        const res = await fetch(`/api/questions?setId=${selectedSetId}`)
        if (!res.ok) throw new Error("Failed to fetch questions")
        const data: Question[] = await res.json()
        // update sets with questions for selected set
        setSets((prevSets) =>
          prevSets.map((set) =>
            set.id === selectedSetId ? { ...set, questions: data } : set
          )
        )
        setAnswers(new Array(data.length).fill(-1))
        setCurrentQuestion(0)
        setScore(0)
        setQuizState("not-started")
        setShowExplanations(false)
        setTimeLeft(60 * 60)
      } catch (error) {
        console.error(error)
      }
    }
    fetchQuestions()
  }, [selectedSetId])

  const selectedSet = sets.find((set) => set.id === selectedSetId)
  const questionToRender = selectedSet?.questions ?? []

  // Timer effect
  useEffect(() => {
    if (quizState === "in-progress" && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setQuizState("completed")
            calculateScore()
            return 0
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [quizState, timeLeft])

  const startQuiz = () => {
    setQuizState("in-progress")
    setCurrentQuestion(0)
    setAnswers(new Array(questionToRender.length).fill(-1))
    setTimeLeft(60 * 60)
    setScore(0)
    setShowExplanations(false)
    setShowModal(false)
  }

  const selectAnswer = (answerIndex: number) => {
    if (quizState !== "in-progress") return
    const newAnswers = [...answers]
    const question = questionToRender[currentQuestion]

    if (question.type === "single") {
      newAnswers[currentQuestion] = answerIndex
    } else {
      const currentAnswers = Array.isArray(newAnswers[currentQuestion])
        ? newAnswers[currentQuestion]
        : []

      if (currentAnswers.includes(answerIndex)) {
        newAnswers[currentQuestion] = currentAnswers.filter((ans) => ans !== answerIndex)
      } else {
        newAnswers[currentQuestion] = [...currentAnswers, answerIndex]
      }
    }
    setAnswers(newAnswers)
  }

  const nextQuestion = () => {
    if (currentQuestion < questionToRender.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const goToQuestion = (questionIndex: number) => {
    setCurrentQuestion(questionIndex)
  }

  const calculateScore = () => {
    let correctAnswersCount = 0
    answers.forEach((answer, index) => {
      const question = questionToRender[index]
      if (!question) return
      if (question.type === "single") {
        if (answer === question.correctAnswer) correctAnswersCount++
      } else {
        const userAnswers = Array.isArray(answer) ? [...answer].sort() : []
        const correctAnswersArray = [...question.correctAnswers].sort()
        if (JSON.stringify(userAnswers) === JSON.stringify(correctAnswersArray)) {
          correctAnswersCount++
        }
      }
    })
    setScore(correctAnswersCount)
  }

  const submitQuiz = () => {
    calculateScore()
    setQuizState("completed")
    setShowConfirmation(false)
  }

  const restartQuiz = () => {
    setQuizState("not-started")
    setCurrentQuestion(0)
    setAnswers(new Array(questionToRender.length).fill(-1))
    setTimeLeft(60 * 60)
    setScore(0)
    setShowExplanations(false)
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const getScoreColor = (score: number) => {
    if (score >= 26) return "text-green-600"
    if (score >= 20) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreMessage = (score: number) => {
    if (score >= 26) return "Congratulations! You passed the exam!"
    if (score >= 20) return "Close! You need 26 correct answers to pass."
    return "You need more preparation. Keep studying!"
  }

  const answeredQuestions = answers.filter((answer) => {
    if (Array.isArray(answer)) return answer.length > 0
    return answer !== -1
  }).length

  if (quizState === "not-started") {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-semibold text-gray-800 mb-3">ISTQB CTFL Mock Exam</h1>
            <p className="bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent max-w-2xl mx-auto mt-5 mb-2">
              Test your knowledge with our comprehensive Foundation Level practice exam
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="border-b pb-6 mb-8"
          >
            <div className="flex items-center gap-3 mb-4 md:mb-6 mt-2">
              <Clock className="h-5 w-5 text-blue-600" />
              <h2 className="text-xl  font-semibold text-gray-800">Exam Instructions</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-cyan-800 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-800">Duration</p>
                    <p className="text-gray-600">60 minutes</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-700 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-800">Questions</p>
                    <p className="text-gray-600">40 multiple choice</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Badge className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-800">Pass Mark</p>
                    <p className="text-gray-600">26 out of 40 (65%)</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center space-y-4 justify-center bg-gray-50 ">
                <p>Exam Rules::</p>

                <ul className="space-y-1 text-gray-600">
                  <li className="flex items-start">
                    <span className="mr-2">•</span> Timer starts when you begin
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span> Navigate freely between questions
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span> All questions must be answered
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-8 flex flex-col items-center justify-center"
          >
            <p className="text-gray-800 mb-3">Choose Question Set:</p>
            <div className="flex flex-wrap gap-2">
              {sets.map((set) => (
                <motion.button
                  key={set.id}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedSetId(set.id)}
                  className={`px-4 py-2 font-medium border transition-all duration-300 ${
                    selectedSetId === set.id
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {set.title}
                </motion.button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-center"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowModal(true)}
              className="bg-blue-600 text-white px-8 py-3 font-medium"
            >
              Start Exam
            </motion.button>

            {showModal && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
                  <h2 className="text-lg font-semibold mb-4">Confirm Start</h2>
                  <p className="mb-6">
                    Are you sure you want to start the exam now? You will have 60 mins to
                    complete the exam.
                  </p>
                  <div className="flex justify-center  gap-3">
                    <button
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={startQuiz}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 "
                    >
                      Start
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    )
  }

  if (quizState === "in-progress") {
    const question = questionToRender[currentQuestion]
    const progress = ((currentQuestion + 1) / questionToRender.length) * 100

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-red-50 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <ExamGuard />
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 flex-wrap">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full sm:w-auto">
                <a href="/mock-test">
                  <ArrowLeft />
                </a>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 text-center sm:text-left flex-shrink">
                  ISTQB CTFL Mock Exam
                </h1>

                <Badge variant="outline" className="text-blue-600 text-center sm:text-left ">
                  Question {currentQuestion + 1} of {questionToRender.length}
                </Badge>
              </div>

              <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                {answers.map((answer, i) => (
                  <button
                    key={i}
                    onClick={() => goToQuestion(i)}
                    className={`rounded-full w-8 h-8 text-sm font-semibold border border-gray-500 flex items-center justify-center
                    ${
                      i === currentQuestion
                        ? "bg-blue-600 text-white border-blue-600"
                        : answer !== -1
                        ? "bg-green-600 text-white border-green-600"
                        : "bg-white text-gray-700 border-gray-300"
                    }
                    `}
                    aria-label={`Go to question ${i + 1}`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center mb-6">
              <div className="text-gray-700 font-semibold flex items-center gap-2">
                <Clock />
                <span className="text-xl">{formatTime(timeLeft)}</span>
              </div>

              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm" onClick={previousQuestion} disabled={currentQuestion === 0}>
                  <ChevronLeft />
                  Prev
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={nextQuestion}
                  disabled={currentQuestion === questionToRender.length - 1}
                >
                  Next
                  <ChevronRight />
                </Button>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">
                  {question.chapter}
                </CardTitle>
                <CardDescription className="text-gray-700">{question.question}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                {question.options.map((option, idx) => {
                  const isSelected =
                    question.type === "single"
                      ? answers[currentQuestion] === idx
                      : Array.isArray(answers[currentQuestion]) &&
                        answers[currentQuestion].includes(idx)

                  return (
                    <button
                      key={idx}
                      onClick={() => selectAnswer(idx)}
                      className={`p-3 text-left border rounded-md transition-colors duration-300
                      ${
                        isSelected
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-gray-800 border-gray-300 hover:bg-gray-50"
                      }
                      `}
                    >
                      {option}
                    </button>
                  )
                })}
              </CardContent>
            </Card>

            <div className="mt-6 flex justify-between">
              <Button
                variant="secondary"
                onClick={() => setShowExplanations((prev) => !prev)}
                size="sm"
              >
                {showExplanations ? "Hide Explanation" : "Show Explanation"}
              </Button>

              {currentQuestion === questionToRender.length - 1 ? (
                <Button size="sm" onClick={() => setShowModal(true)}>
                  Submit
                </Button>
              ) : null}
            </div>

            {showExplanations && (
              <Alert variant="default" className="mt-4">
                <AlertDescription>{question.explanation}</AlertDescription>
              </Alert>
            )}

            {showModal && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
                  <h2 className="text-lg font-semibold mb-4">Submit Exam?</h2>
                  <p className="mb-6">
                    Are you sure you want to submit the exam? You cannot change your
                    answers afterwards.
                  </p>
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={submitQuiz}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  if (quizState === "completed") {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className={`text-5xl font-bold mb-4 ${getScoreColor(score)}`}>
              Your Score: {score} / {questionToRender.length}
            </h1>
            <p className="text-xl mb-6">{getScoreMessage(score)}</p>

            <Button onClick={restartQuiz} className="mb-6">
              Retry Exam
            </Button>

            <div className="text-left space-y-8">
              {questionToRender.map((question, i) => {
                const userAnswer = answers[i]
                const isCorrect =
                  question.type === "single"
                    ? userAnswer === question.correctAnswer
                    : JSON.stringify([...userAnswer].sort()) ===
                      JSON.stringify([...question.correctAnswers].sort())
                return (
                  <Card key={question.id} className="border">
                    <CardHeader>
                      <CardTitle>{question.chapter}</CardTitle>
                      <CardDescription>{question.question}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {question.options.map((option, idx) => {
                        const isUserAnswer =
                          question.type === "single"
                            ? userAnswer === idx
                            : Array.isArray(userAnswer) && userAnswer.includes(idx)
                        const isCorrectAnswer =
                          question.type === "single"
                            ? question.correctAnswer === idx
                            : question.correctAnswers.includes(idx)
                        return (
                          <div
                            key={idx}
                            className={`p-2 rounded-md mb-1
                            ${
                              isCorrectAnswer
                                ? "bg-green-200 border border-green-500"
                                : isUserAnswer
                                ? "bg-red-200 border border-red-500"
                                : ""
                            }
                          `}
                          >
                            {option}
                          </div>
                        )
                      })}
                      <div className="mt-2 text-gray-700">
                        <strong>Explanation:</strong> {question.explanation}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return null
}
