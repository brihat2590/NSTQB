'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Clock, BookOpen, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

interface QuestionSet {
  id: number;
  title: string;
  createdAt: string;
  questions: Question[];
}

interface Question {
  id: number;
  chapter: string;
  question: string;
  setId: number;
  options: string[];
  correctAnswer?: number;
  correctAnswers: number[];
  explanation: string;
  type: 'single' | 'multiple';
  image?: string;
}

interface UserAnswer {
  questionId: number;
  selectedAnswers: number[];
  isCorrect: boolean;
  timeSpent: number;
}

export default function TakeExam() {
  const [questionSets, setQuestionSets] = useState<QuestionSet[]>([]);
  const [selectedSet, setSelectedSet] = useState<QuestionSet | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [examStarted, setExamStarted] = useState(false);
  const [examCompleted, setExamCompleted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchQuestionSets();
  }, []);

  useEffect(() => {
    if (examStarted && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            completeExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [examStarted, timeRemaining]);

  const fetchQuestionSets = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/sets');
      if (response.ok) {
        const data = await response.json();
        setQuestionSets(data);
      }
    } catch (error) {
      console.error('Error fetching question sets:', error);
    } finally {
      setLoading(false);
    }
  };

  const startExam = () => {
    if (!selectedSet) return;
    
    // Set exam duration (e.g., 60 minutes = 3600 seconds)
    const examDuration = 3600; // 1 hour
    setTimeRemaining(examDuration);
    setExamStarted(true);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setExamCompleted(false);
    setShowResults(false);
  };

  const completeExam = () => {
    setExamStarted(false);
    setExamCompleted(true);
    setTimeRemaining(0);
  };

  const handleAnswerSelect = (questionId: number, answerIndex: number, isMultiple: boolean) => {
    setUserAnswers(prev => {
      const existingAnswer = prev.find(a => a.questionId === questionId);
      
      if (existingAnswer) {
        if (isMultiple) {
          const newSelectedAnswers = existingAnswer.selectedAnswers.includes(answerIndex)
            ? existingAnswer.selectedAnswers.filter(i => i !== answerIndex)
            : [...existingAnswer.selectedAnswers, answerIndex];
          
          return prev.map(a => 
            a.questionId === questionId 
              ? { ...a, selectedAnswers: newSelectedAnswers }
              : a
          );
        } else {
          return prev.map(a => 
            a.questionId === questionId 
              ? { ...a, selectedAnswers: [answerIndex] }
              : a
          );
        }
      } else {
        return [...prev, {
          questionId,
          selectedAnswers: [answerIndex],
          isCorrect: false,
          timeSpent: 0
        }];
      }
    });
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < selectedSet!.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const submitExam = () => {
    // Calculate results
    const results = selectedSet!.questions.map(question => {
      const userAnswer = userAnswers.find(a => a.questionId === question.id);
      const selectedAnswers = userAnswer?.selectedAnswers || [];
      
      let isCorrect = false;
      if (question.type === 'single') {
        isCorrect = question.correctAnswer === selectedAnswers[0];
      } else {
        isCorrect = question.correctAnswers.length === selectedAnswers.length &&
                   question.correctAnswers.every(ans => selectedAnswers.includes(ans));
      }
      
      return {
        questionId: question.id,
        selectedAnswers,
        isCorrect,
        timeSpent: userAnswer?.timeSpent || 0
      };
    });
    
    setUserAnswers(results);
    setShowResults(true);
    completeExam();
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const getCurrentQuestion = () => {
    if (!selectedSet || currentQuestionIndex >= selectedSet.questions.length) return null;
    return selectedSet.questions[currentQuestionIndex];
  };

  const getProgressPercentage = () => {
    if (!selectedSet) return 0;
    return ((currentQuestionIndex + 1) / selectedSet.questions.length) * 100;
  };

  const getAnsweredQuestionsCount = () => {
    return userAnswers.length;
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading question sets...</p>
        </div>
      </div>
    );
  }

  if (!examStarted) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Take Exam</h1>
          <p className="text-gray-600 mt-2">Select a question set to begin your exam</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Select Question Set</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="questionSet">Question Set</Label>
              <Select value={selectedSet?.id?.toString() || ''} onValueChange={(value) => {
                const set = questionSets.find(s => s.id.toString() === value);
                setSelectedSet(set || null);
              }}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Choose a question set" />
                </SelectTrigger>
                <SelectContent>
                  {questionSets.map((set) => (
                    <SelectItem key={set.id} value={set.id.toString()}>
                      {set.title} ({set.questions.length} questions)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedSet && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">{selectedSet.title}</h3>
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    <span>{selectedSet.questions.length} questions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>60 minutes</span>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  This exam contains questions from various chapters. Make sure you have enough time to complete all questions.
                </p>
              </div>
            )}

            <Button 
              onClick={startExam} 
              disabled={!selectedSet}
              className="w-full"
              size="lg"
            >
              Start Exam
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentQuestion = getCurrentQuestion();
  if (!currentQuestion) return null;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header with Progress and Timer */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-900">{selectedSet?.title}</h1>
          <div className="flex items-center gap-4">
            <Badge variant="secondary">
              Question {currentQuestionIndex + 1} of {selectedSet?.questions.length}
            </Badge>
            <div className="flex items-center gap-2 text-red-600 font-semibold">
              <Clock className="w-4 h-4" />
              {formatTime(timeRemaining)}
            </div>
          </div>
        </div>
        
        <Progress value={getProgressPercentage()} className="h-2" />
        <div className="flex justify-between text-sm text-gray-600 mt-2">
          <span>Progress: {Math.round(getProgressPercentage())}%</span>
          <span>Answered: {getAnsweredQuestionsCount()}/{selectedSet?.questions.length}</span>
        </div>
      </div>

      {/* Question Card */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <Badge variant="outline" className="mb-2">{currentQuestion.chapter}</Badge>
              <CardTitle className="text-lg">
                Question {currentQuestionIndex + 1}
              </CardTitle>
            </div>
            <Badge variant={currentQuestion.type === 'single' ? 'default' : 'secondary'}>
              {currentQuestion.type === 'single' ? 'Single Choice' : 'Multiple Choice'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-800 mb-6 leading-relaxed">{currentQuestion.question}</p>
          
          {currentQuestion.type === 'single' ? (
            <RadioGroup
              value={userAnswers.find(a => a.questionId === currentQuestion.id)?.selectedAnswers[0]?.toString() || ''}
              onValueChange={(value) => handleAnswerSelect(currentQuestion.id, parseInt(value), false)}
            >
              {currentQuestion.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 mb-3">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                    <span className="font-medium mr-2">{String.fromCharCode(65 + index)}.</span>
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          ) : (
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Checkbox
                    id={`option-${index}`}
                    checked={userAnswers.find(a => a.questionId === currentQuestion.id)?.selectedAnswers.includes(index) || false}
                    onCheckedChange={(checked) => handleAnswerSelect(currentQuestion.id, index, true)}
                  />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                    <span className="font-medium mr-2">{String.fromCharCode(65 + index)}.</span>
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={previousQuestion}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </Button>
        
        <div className="flex gap-2">
          {currentQuestionIndex < selectedSet!.questions.length - 1 ? (
            <Button onClick={nextQuestion}>
              Next Question
            </Button>
          ) : (
            <Button onClick={submitExam} className="bg-green-600 hover:bg-green-700">
              Submit Exam
            </Button>
          )}
        </div>
      </div>

      {/* Results Modal */}
      {showResults && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">Exam Results</h2>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {Math.round((userAnswers.filter(a => a.isCorrect).length / userAnswers.length) * 100)}%
                  </div>
                  <div className="text-sm text-gray-600">Score</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {userAnswers.filter(a => a.isCorrect).length}/{userAnswers.length}
                  </div>
                  <div className="text-sm text-gray-600">Correct Answers</div>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                {userAnswers.map((answer, index) => {
                  const question = selectedSet!.questions.find(q => q.id === answer.questionId);
                  return (
                    <div key={answer.questionId} className="p-3 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium">Q{index + 1}:</span>
                        {answer.isCorrect ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-600" />
                        )}
                      </div>
                      <p className="text-sm text-gray-700 mb-2">{question?.question}</p>
                      <div className="text-xs text-gray-500">
                        Your answer: {answer.selectedAnswers.map(i => String.fromCharCode(65 + i)).join(', ')}
                        {!answer.isCorrect && question && (
                          <span className="ml-2 text-red-600">
                            Correct: {question.type === 'single' 
                              ? String.fromCharCode(65 + (question.correctAnswer || 0))
                              : question.correctAnswers.map(i => String.fromCharCode(65 + i)).join(', ')
                            }
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={() => {
                    setShowResults(false);
                    setExamCompleted(false);
                    setSelectedSet(null);
                  }}
                  className="flex-1"
                >
                  Take Another Exam
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => {
                    setShowResults(false);
                    setExamCompleted(false);
                    setSelectedSet(null);
                    setUserAnswers([]);
                    setCurrentQuestionIndex(0);
                  }}
                  className="flex-1"
                >
                  Review Answers
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Time Warning Alert */}
      {timeRemaining <= 300 && timeRemaining > 0 && (
        <Alert className="fixed bottom-4 right-4 w-80 bg-red-50 border-red-200">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <strong>Time Warning:</strong> Only {formatTime(timeRemaining)} remaining!
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
} 