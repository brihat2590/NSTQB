"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"

import {
  Clock,
  CheckCircle,
  XCircle,
  RotateCcw,
  Award,
  BookOpen,
  Timer,
  ChevronLeft,
  ChevronRight,
  Flag,
  ArrowLeftFromLineIcon,
  ArrowLeft,
} from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { mockQuestions,mockQuestions2,mockQuestions3 } from "@/lib/mockQuestions"
import { useRouter } from "next/navigation"
// Add question type and update the structure
type Question = {
  id: number;
  chapter: string;
  type: string;
  question: string;
  options: string[];
  correctAnswer: number;
  correctAnswers: number[];
  explanation: string;
};


  

type QuizState = "not-started" | "in-progress" | "completed"

export default function MockTest() {
  const [quizState, setQuizState] = useState<QuizState>("not-started")
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<any[]>(new Array(40).fill(-1))
  const [timeLeft, setTimeLeft] = useState(60 * 60) // 60 minutes in seconds
  const [score, setScore] = useState(0)
  const [showExplanations, setShowExplanations] = useState(false)
  const[selectedSet,setSelectedSet]=useState("set1");
  type SetKey = "set1" | "set2" | "set3";
  const router=useRouter();

const questionSets: Record<SetKey, Question[]> = {
  set1: mockQuestions,
  set2: mockQuestions2,
  set3: mockQuestions3
};

const questionToRender = questionSets[selectedSet as SetKey] ?? questionSets["set1"];

  

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
    setAnswers(new Array(40).fill(-1))
    setTimeLeft(60 * 60)
    setScore(0)
    setShowExplanations(false)
  }
  

  const selectAnswer = (answerIndex: number) => {
    const newAnswers = [...answers]
    const question = mockQuestions[currentQuestion]

    if (question.type === "single") {
      newAnswers[currentQuestion] = answerIndex
    } else {
      // Handle multiple choice
      const currentAnswers = Array.isArray(newAnswers[currentQuestion]) ? newAnswers[currentQuestion] : []

      if (currentAnswers.includes(answerIndex)) {
        // Remove if already selected
        newAnswers[currentQuestion] = currentAnswers.filter((ans) => ans !== answerIndex)
      } else {
        // Add to selection
        newAnswers[currentQuestion] = [...currentAnswers, answerIndex]
      }
    }
    setAnswers(newAnswers)
  }

  const nextQuestion = () => {
    if (currentQuestion < 39) {
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
    let correctAnswers = 0
    answers.forEach((answer, index) => {
      const question = mockQuestions[index]

      if (question.type === "single") {
        if (answer === question.correctAnswer) {
          correctAnswers++
        }
      } else {
        // For multiple choice, check if arrays match exactly
        const userAnswers = Array.isArray(answer) ? answer.sort() : []
        const correctAnswersArray = question.correctAnswers.sort()

        if (JSON.stringify(userAnswers) === JSON.stringify(correctAnswersArray)) {
          correctAnswers++
        }
      }
    })
    setScore(correctAnswers)
  }

  const submitQuiz = () => {
    calculateScore()
    setQuizState("completed")
  }

  const restartQuiz = () => {
    setQuizState("not-started")
    setCurrentQuestion(0)
    setAnswers(new Array(40).fill(-1))
    setTimeLeft(60 * 60)
    setScore(0)
    setShowExplanations(false)
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const getScoreColor = (score: number) => {
    if (score >= 26) return "text-green-600" // Pass (65%)
    if (score >= 20) return "text-yellow-600" // Close
    return "text-red-600" // Fail
  }

  const getScoreMessage = (score: number) => {
    if (score >= 26) return "Congratulations! You passed the exam!"
    if (score >= 20) return "Close! You need 26 correct answers to pass."
    return "You need more preparation. Keep studying!"
  }

  const answeredQuestions = answers.filter((answer) => {
    if (Array.isArray(answer)) {
      return answer.length > 0
    }
    return answer !== -1
  }).length

  if (quizState === "not-started") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-red-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 bg-gradient-to-r bg-gray-50 text-gray-800 py-12 px-6 rounded-2xl shadow-lg">
            <Link href={'/'}><ArrowLeft/></Link>
            <h1 className="text-4xl font-bold mb-4">ISTQB CTFL Mock Exam</h1>
            <p className="text-xl max-w-2xl mx-auto opacity-95">
              Test your knowledge with our comprehensive Foundation Level practice exam
            </p>
          </div>

          {/* Exam Instructions */}
          <Card className="shadow-lg mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <BookOpen className="h-6 w-6 text-blue-600" />
                Exam Instructions
              </CardTitle>
              <CardDescription>Please read carefully before starting the exam</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-red-600" />
                    <div>
                      <h4 className="font-semibold">Duration</h4>
                      <p className="text-gray-600">60 minutes</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                    <div>
                      <h4 className="font-semibold">Questions</h4>
                      <p className="text-gray-600">40 multiple choice questions</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Award className="h-5 w-5 text-green-600" />
                    <div>
                      <h4 className="font-semibold">Pass Mark</h4>
                      <p className="text-gray-600">26 out of 40 (65%)</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Exam Rules:</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Timer starts automatically when you begin</li>
                    <li>• You can navigate between questions freely</li>
                    <li>• All questions must be answered</li>
                    <li>• You can review your answers before submitting</li>
                    <li>• Exam will auto-submit when time expires</li>
                  </ul>
                </div>
              </div>

              <Alert>
                <Timer className="h-4 w-4" />
                <AlertDescription>
                  <strong>Important:</strong> The timer will start immediately when you click "Start Exam". Make sure
                  you have a stable internet connection and won't be interrupted.
                </AlertDescription>
              </Alert>
              <div className="flex  items-center justify-center ">
              <h2 className="pr-4">Choose Question Set:</h2>
                  <div className="flex flex-col sm:flex-row gap-3 mb-6">
                      <button
                      onClick={() => setSelectedSet("set1")}
                      className={`mr-4 px-6 py-2 rounded-md font-semibold transition-colors duration-300
                          ${
                          selectedSet === "set1"
                              ? "bg-blue-600 text-white shadow-lg"
                              : "bg-white text-blue-600 border border-blue-600 hover:bg-blue-100"
                          }`}
                      >
                      Set 1
                      </button>

                      <button
                      onClick={() => setSelectedSet("set2")}
                      className={`px-6 mr-4 py-2 rounded-md font-semibold transition-colors duration-300
                          ${
                          selectedSet === "set2"
                              ? "bg-blue-600 text-white shadow-lg"
                              : "bg-white text-blue-600 border border-blue-600 hover:bg-blue-100"
                          }`}
                      >
                      Set 2
                      </button>
                      <button
                      onClick={() => setSelectedSet("set3")}
                      className={`px-6 mr-4 py-2 rounded-md font-semibold transition-colors duration-300
                          ${
                          selectedSet === "set3"
                              ? "bg-blue-600 text-white shadow-lg"
                              : "bg-white text-blue-600 border border-blue-600 hover:bg-blue-100"
                          }`}
                      >
                      Set 3
                      </button>
                    </div>

              

              

                
              </div>
              

              <div className="text-center pt-4">
                
                <Button
                  size="lg"
                  onClick={startQuiz}
                  className="bg-gradient-to-r from-red-600 to-blue-600 text-white hover:from-red-700 hover:to-blue-700 px-8 py-6 text-lg"
                >
                  Start Exam
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (quizState === "in-progress") {
    const question = questionToRender[currentQuestion]
    const progress = ((currentQuestion + 1) / 40) * 100

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-red-50 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header with Timer and Progress */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <h1 className="text-2xl font-bold text-gray-900">ISTQB CTFL Mock Exam</h1>
                <Badge variant="outline" className="text-blue-600">
                  Question {currentQuestion + 1} of 40
                </Badge>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-red-600" />
                  <span className={`font-mono text-lg font-bold ${timeLeft < 300 ? "text-red-600" : "text-gray-900"}`}>
                    {formatTime(timeLeft)}
                  </span>
                </div>
                <Button variant="outline" onClick={submitQuiz} className="bg-green-600 text-white hover:bg-green-700">
                  <Flag className="h-4 w-4 mr-2" />
                  Submit Exam
                </Button>
              </div>
            </div>
            {/* <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Progress: {Math.round(progress)}%</span>
                <span>Answered: {answeredQuestions}/40</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div> */}
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Question Navigation */}
            <div className="lg:col-span-1">
              <Card className="shadow-lg sticky top-4">
                <CardHeader>
                  <CardTitle className="text-lg">Question Navigator</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-5 gap-2">
                    {questionToRender.map((_, index) => {
                      const question = questionToRender[index]
                      const hasAnswer =
                        question.type === "single"
                          ? answers[index] !== -1
                          : Array.isArray(answers[index]) && answers[index].length > 0

                      return (
                        <button
                          key={index}
                          onClick={() => goToQuestion(index)}
                          className={`w-10 h-10 rounded text-sm font-medium transition-colors ${
                            index === currentQuestion
                              ? "bg-blue-600 text-white"
                              : hasAnswer
                                ? "bg-green-100 text-green-800 border border-green-300"
                                : "bg-gray-100 text-gray-600 border border-gray-300 hover:bg-gray-200"
                          }`}
                        >
                          {index + 1}
                        </button>
                      )
                    })}
                  </div>
                  <div className="mt-4 space-y-2 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-blue-600 rounded"></div>
                      <span>Current</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
                      <span>Answered</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-gray-100 border border-gray-300 rounded"></div>
                      <span>Not answered</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Question Content */}
            <div className="lg:col-span-3">
              <Card className="shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{question.chapter}</Badge>
                    <span className="text-sm text-gray-500">Question {currentQuestion + 1}/40</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900 leading-relaxed">{question.question}</h2>

                  <div className="space-y-3">
                    {question.options.map((option, index) => {
                      const isSelected =
                        question.type === "single"
                          ? answers[currentQuestion] === index
                          : Array.isArray(answers[currentQuestion]) && answers[currentQuestion].includes(index)

                      return (
                        <button
                          key={index}
                          onClick={() => selectAnswer(index)}
                          className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                            isSelected
                              ? "border-blue-500 bg-blue-50 text-blue-900"
                              : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-6 h-6 flex items-center justify-center border-2 ${
                                question.type === "single" ? "rounded-full" : "rounded"
                              } ${isSelected ? "border-blue-500 bg-blue-500 text-white" : "border-gray-300"}`}
                            >
                              {isSelected &&
                                (question.type === "single" ? (
                                  <CheckCircle className="h-4 w-4" />
                                ) : (
                                  <CheckCircle className="h-4 w-4" />
                                ))}
                            </div>
                            <span className="font-medium mr-2">{String.fromCharCode(65 + index)}.</span>
                            <span>{option}</span>
                          </div>
                        </button>
                      )
                    })}
                  </div>

                  {question.type === "multiple" && (
                    <div className="text-sm text-gray-600 mt-2">
                      <strong>Note:</strong> This question has multiple correct answers. Select all that apply.
                    </div>
                  )}

                  <div className="flex justify-between pt-6 border-t">
                    <Button variant="outline" onClick={previousQuestion} disabled={currentQuestion === 0}>
                      <ChevronLeft className="h-4 w-4 mr-2" />
                      Previous
                    </Button>
                    <Button
                      onClick={nextQuestion}
                      disabled={currentQuestion === 39}
                      className="bg-blue-600 text-white hover:bg-blue-700"
                    >
                      Next
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Results page
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-red-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        

        {/* Score Summary */}
        <Card className="shadow-lg mb-8">
            {/* <div className="flex items-start "><ArrowLeftFromLineIcon/></div> */}
          <CardHeader>
            <a href="/mock-test" className="flex items-start"><ArrowLeft/></a>
            <CardTitle className="text-center text-2xl ">Your Score</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="space-y-4">
              <div className={`text-6xl font-bold ${getScoreColor(score)}`}>{score}/40</div>
              <div className="text-2xl text-gray-600">{Math.round((score / 40) * 100)}%</div>
              <div className={`text-xl font-semibold ${getScoreColor(score)}`}>{getScoreMessage(score)}</div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 pt-6 border-t">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{score}</div>
                <div className="text-gray-600">Correct</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{40 - score}</div>
                <div className="text-gray-600">Incorrect</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{score >= 26 ? "PASS" : "FAIL"}</div>
                <div className="text-gray-600">Result</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Chapter-wise Performance */}
        {/* <Card className="shadow-lg mb-8">
          <CardHeader>
            <CardTitle>Chapter-wise Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                "Fundamentals of Testing",
                "Testing Throughout the SDLC",
                "Static Testing",
                "Test Analysis and Design",
                "Managing the Test Activities",
                "Test Tools",
              ].map((chapter) => {
                const chapterQuestions = questionToRender.filter((q) => q.chapter === chapter)
                const chapterCorrect = chapterQuestions.filter((q, index) => {
                  const questionIndex = questionToRender.findIndex((mq) => mq.id === q.id)
                  const question = questionToRender[questionIndex]
                  if (question.type === "single") {
                    return answers[questionIndex] === q.correctAnswer
                  } else {
                    const userAnswers = Array.isArray(answers[questionIndex]) ? answers[questionIndex].sort() : []
                    const correctAnswersArray = question.correctAnswers.sort()
                    return JSON.stringify(userAnswers) === JSON.stringify(correctAnswersArray)
                  }
                }).length
                const chapterTotal = chapterQuestions.length
                const percentage = Math.round((chapterCorrect / chapterTotal) * 100)

                return (
                  <div key={chapter} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{chapter}</span>
                      <span className="text-gray-600">
                        {chapterCorrect}/{chapterTotal} ({percentage}%)
                      </span>
                    </div>
                    <Progress value={percentage} className="h-2" />
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card> */}

        {/* Review Answers */}
        <Card className="shadow-lg mb-8">
          <CardHeader>
            <CardTitle>Review Your Answers</CardTitle>
            <div className="flex gap-2">
              <Button
                variant={showExplanations ? "default" : "outline"}
                onClick={() => setShowExplanations(!showExplanations)}
                size="sm"
              >
                {showExplanations ? "Hide" : "Show"} Explanations
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {questionToRender.map((question, index) => {
                const userAnswer = answers[index]
                let isCorrectOverall = false

                if (question.type === "single") {
                  isCorrectOverall = userAnswer === question.correctAnswer
                } else {
                  const userAnswers = Array.isArray(userAnswer) ? userAnswer.sort() : []
                  const correctAnswersArray = question.correctAnswers.sort()
                  isCorrectOverall = JSON.stringify(userAnswers) === JSON.stringify(correctAnswersArray)
                }

                return (
                  <div key={question.id} className="border rounded-lg p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          isCorrectOverall ? "bg-green-500 text-white" : "bg-red-500 text-white"
                        }`}
                      >
                        {isCorrectOverall ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold">Question {index + 1}</span>
                          <Badge variant="secondary" className="text-xs">
                            {question.chapter}
                          </Badge>
                        </div>
                        <p className="text-gray-900 mb-3">{question.question}</p>

                        <div className="space-y-2">
                          {question.options.map((option, optionIndex) => {
                            let isCorrect, isUserAnswer

                            if (question.type === "single") {
                              isCorrect = optionIndex === question.correctAnswer
                              isUserAnswer = optionIndex === userAnswer
                            } else {
                              isCorrect = question.correctAnswers.includes(optionIndex)
                              isUserAnswer = Array.isArray(userAnswer) && userAnswer.includes(optionIndex)
                            }

                            return (
                              <div
                                key={optionIndex}
                                className={`p-2 rounded text-sm ${
                                  isCorrect
                                    ? "bg-green-100 text-green-800 border border-green-300"
                                    : isUserAnswer && !isCorrect
                                      ? "bg-red-100 text-red-800 border border-red-300"
                                      : "bg-gray-50"
                                }`}
                              >
                                <span className="font-medium mr-2">{String.fromCharCode(65 + optionIndex)}.</span>
                                {option}
                                {isCorrect && <span className="ml-2 text-green-600 font-medium">(Correct)</span>}
                                {isUserAnswer && !isCorrect && (
                                  <span className="ml-2 text-red-600 font-medium">(Your answer)</span>
                                )}
                              </div>
                            )
                          })}
                        </div>

                        {showExplanations && (
                          <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded">
                            <p className="text-sm text-blue-800">
                              <strong>Explanation:</strong> {question.explanation}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        {/* <div className="text-center space-x-4">
          <Button
            onClick={restartQuiz}
            className="bg-gradient-to-r from-red-600 to-blue-600 text-white hover:from-red-700 hover:to-blue-700"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Take Another Exam
          </Button>
          <Button variant="outline">Download Certificate</Button>
        </div> */}
      </div>
    </div>
  )
}
