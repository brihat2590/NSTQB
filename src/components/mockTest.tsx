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
  Infinity,
} from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { mockQuestions,mockQuestions2,mockQuestions3 } from "@/lib/mockQuestions"
import { useRouter } from "next/navigation"
import { mockQuestions4 } from "@/lib/mockQuestion4"
import ExamGuard from "./ExamGuard"
import {motion} from "framer-motion"
import { set } from "date-fns"
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
  const [showConfirmation, setShowConfirmation] = useState(false);
  const[selectedSet,setSelectedSet]=useState("set1");
  type SetKey = "set1" | "set2" | "set3"|"set4";
  const[examStarted,setExamStarted]=useState(false);
  const router=useRouter();

const questionSets: Record<SetKey, Question[]> = {
  set1: mockQuestions, 
  set2: mockQuestions2,
  set3: mockQuestions3,
  set4:mockQuestions4
};

const questionToRender = questionSets[selectedSet as SetKey] ?? questionSets["set1"];
const [showModal, setShowModal] = useState(false);



  

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
    const question = questionToRender[currentQuestion]

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
      const question = questionToRender[index]

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
      <div className="min-h-screen bg-white">
  <div className="max-w-4xl mx-auto px-4 py-12">
    {/* Header with fade-in animation */}
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center mb-12"
    >
      <h1 className="text-5xl font-semibold text-gray-800 mb-3">ISTQB CTFL Mock Exam</h1>
      <p className="bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent max-w-2xl mx-auto mt-5 mb-2" >
        Test your knowledge with our comprehensive Foundation Level practice exam
      </p>
    </motion.div>

    {/* Instructions with slide-up animation */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="border-b pb-6 mb-8"
    >
      <div className="flex items-center gap-3 mb-4 md:mb-6 mt-2">
        <BookOpen className="h-5 w-5 text-blue-600" />
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
            <Award className="h-5 w-5 text-yellow-600 mt-0.5" />
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

    {/* Question Set Selection with smooth transitions */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="mb-8 flex flex-col items-center justify-center"
    >
      <p className="text-gray-800 mb-3">Choose Question Set:</p>
      <div className="flex flex-wrap gap-2">
        {['set1', 'set2', 'set3', 'set4'].map((set) => (
          <motion.button
            key={set}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedSet(set)}
            className={`px-4 py-2 font-medium border transition-all duration-300 ${
              selectedSet === set
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            {set.replace('set', 'Set ')}
          </motion.button>
        ))}
      </div>
    </motion.div>

    {/* Start Button with subtle animation */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="text-center"
    >
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() =>{ setExamStarted(true)
          setShowModal(true);
          ;
        }}
        className="bg-blue-600 text-white px-8 py-3 font-medium"
      >
        Start Exam
      </motion.button>
      {showModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-neutral-900/80 backdrop-blur-sm z-50">
    <div className="bg-white rounded-xl shadow-xl p-8 max-w-lg w-full mx-4 border border-gray-100">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-3">Examination Confirmation</h2>
        <div className="h-1 w-20 bg-blue-500 mx-auto rounded-full"></div>
      </div>

      <p className="text-gray-600 mb-7 text-center leading-relaxed">
        You are about to initiate a timed assessment. The examination duration is 60 minutes and cannot be paused once started.
      </p>
      

      

      <div className="flex justify-center space-x-4">
        <button
          onClick={() => setShowModal(false)}
          className="px-6 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 font-medium shadow-sm hover:shadow"
        >
          Return
        </button>
        <button
          onClick={startQuiz}
          className="px-6 py-2.5 text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 font-medium shadow-md hover:shadow-lg"
        >
          Commence Examination
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
    const progress = ((currentQuestion + 1) / 40) * 100

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-red-50 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <ExamGuard/>
          {/* Header with Timer and Progress */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 flex-wrap">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full sm:w-auto">
                <a href="/mock-test"><ArrowLeft/></a>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 text-center sm:text-left flex-shrink">
                    ISTQB CTFL Mock Exam
                  </h1>

                <Badge variant="outline" className="text-blue-600 text-center sm:text-left ">
                  Question {currentQuestion + 1} of 40
                </Badge>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full sm:w-auto">
                <div className="flex items-center gap-2 justify-center sm:justify-start whitespace-nowrap">
                  <Clock className="h-5 w-5 text-red-600" />
                  <span className={`font-mono text-lg font-bold ${timeLeft < 300 ? "text-red-600" : "text-gray-900"}`}>
                    {formatTime(timeLeft)}
                  </span>
                </div>
                {/* <Button variant="outline" onClick={submitQuiz} className="bg-green-600 text-white hover:bg-green-700">
                  <Flag className="h-4 w-4 mr-2" />
                  Submit Exam
                </Button> */}
                          <div>
                {/* Submit Button */}
                <button
                    onClick={() => setShowConfirmation(true)}
                    className="w-full sm:w-auto flex items-center justify-center px-3 sm:px-4 py-2 text-sm sm:text-base bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors border border-transparent focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    <Flag className="h-4 w-4 mr-2 shrink-0" />
                    <span className="truncate">Submit Exam</span>
                  </button>


                {/* Confirmation Popup */}
                {showConfirmation && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                      <div className="text-center">
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          Confirm Submission
                        </h3>
                        <p className="text-gray-500 mb-6">
                          Are you sure you want to submit the exam? You have  done {answeredQuestions} questions You won't be able to make changes after submission.
                        </p>
                        
                        <div className="flex justify-center space-x-3">
                          <button
                            onClick={() => setShowConfirmation(false)}
                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={submitQuiz}
                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                          >
                            Submit Anyway
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
                

                
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
    <div className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="relative mb-12">
          <div className="flex items-center justify-between">
            <a
              href="/mock-test"
              className="group flex items-center gap-2 text-indigo-600 hover:text-indigo-800 transition-colors duration-300"
            >
              <ArrowLeft className="w-6 h-6 transform group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back to Test</span>
            </a>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
              Your Test Results
            </h1>
            <div className="w-24"></div> {/* Spacer for alignment */}
          </div>
          <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mt-4 rounded-full"></div>
        </div>

        {/* Score Summary Section */}
        <div className="bg-gradient-to-b from-gray-50 to-white p-8 mb-12 rounded-3xl shadow-sm">
          <div className="text-center space-y-6">
            <div className="space-y-4">
              <div className={`text-6xl sm:text-7xl font-extrabold ${getScoreColor(score)} tracking-tight`}>
                {score}/40
              </div>
              <div className="text-2xl sm:text-3xl text-gray-500 font-medium">
                {Math.round((score / 40) * 100)}%
              </div>
              <div className={`text-xl sm:text-2xl font-semibold ${getScoreColor(score)} animate-pulse`}>
                {getScoreMessage(score)}
              </div>
            </div>
            <div className="grid sm:grid-cols-3 gap-6 sm:gap-12 pt-8">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-emerald-700">{score}</div>
                <div className="text-gray-500 text-sm sm:text-base">Correct Answers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-rose-600">{40 - score}</div>
                <div className="text-gray-500 text-sm sm:text-base">Incorrect Answers</div>
              </div>
              <div className="text-center">
                <div className={`text-3xl sm:text-4xl font-bold ${score >= 26 ? 'text-indigo-600' : 'text-rose-600'}`}>
                  {score >= 26 ? 'PASS' : 'FAIL'}
                </div>
                <div className="text-gray-500 text-sm sm:text-base">Result</div>
              </div>
            </div>
          </div>
        </div>

        {/* Review Answers Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Answer Review</h2>
            <button
              className={`px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base font-medium transition-all duration-300 ${
                showExplanations
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setShowExplanations(!showExplanations)}
            >
              {showExplanations ? 'Hide Explanations' : 'Show Explanations'}
            </button>
          </div>
          {questionToRender.map((question, index) => {
            const userAnswer = answers[index];
            let isCorrectOverall = false;

            if (question.type === 'single') {
              isCorrectOverall = userAnswer === question.correctAnswer;
            } else {
              const userAnswers = Array.isArray(userAnswer) ? userAnswer.sort() : [];
              const correctAnswersArray = question.correctAnswers.sort();
              isCorrectOverall = JSON.stringify(userAnswers) === JSON.stringify(correctAnswersArray);
            }

            return (
              <div key={question.id} className="p-5 hover:bg-gray-50 transition-colors duration-200 rounded-2xl">
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      isCorrectOverall ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
                    }`}
                  >
                    {isCorrectOverall ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <XCircle className="h-5 w-5" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-semibold text-gray-900 text-lg">Question {index + 1}</span>
                      <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-3 py-1 rounded-full">
                        {question.chapter}
                      </span>
                    </div>
                    <p className="text-gray-800 mb-4 font-medium text-base sm:text-lg">{question.question}</p>
                    <div className="space-y-2">
                      {question.options.map((option, optionIndex) => {
                        let isCorrect, isUserAnswer;

                        if (question.type === 'single') {
                          isCorrect = optionIndex === question.correctAnswer;
                          isUserAnswer = optionIndex === userAnswer;
                        } else {
                          isCorrect = question.correctAnswers.includes(optionIndex);
                          isUserAnswer = Array.isArray(userAnswer) && userAnswer.includes(optionIndex);
                        }

                        return (
                          <div
                            key={optionIndex}
                            className={`p-3 rounded-lg text-sm sm:text-base flex items-center transition-colors duration-200 ${
                              isCorrect
                                ? 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                                : isUserAnswer && !isCorrect
                                ? 'bg-rose-50 text-rose-800 hover:bg-rose-100'
                                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                            }`}
                          >
                            <span className="font-medium mr-2">{String.fromCharCode(65 + optionIndex)}.</span>
                            <span className="flex-1">{option}</span>
                            {isCorrect && (
                              <span className="ml-2 text-emerald-600 font-medium">(Correct)</span>
                            )}
                            {isUserAnswer && (
                              <span
                                className={`ml-2 font-medium ${
                                  isCorrect ? 'text-indigo-600' : 'text-rose-600'
                                }`}
                              >
                                (Your answer)
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                    {showExplanations && (
                      <div className="mt-4 p-4 bg-indigo-50 rounded-lg">
                        <p className="text-sm sm:text-base text-indigo-800">
                          <strong>Explanation:</strong> {question.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
    
    
    
  )
}
