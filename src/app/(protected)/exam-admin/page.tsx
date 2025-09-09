'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Trash2, Plus, Edit, Eye } from 'lucide-react';

interface QuestionSet {
  id: number;
  title: string;
  createdAt: string;
  questions: Question[];
}

interface Question {
  id: number;
 
  question: string;
  setId: number;
  options: string[];
  correctAnswer?: number;
  correctAnswers: number[];
  explanation: string;
  type: 'single' | 'multiple';
  image?: string;
}

export default function ExamAdmin() {
  const [questionSets, setQuestionSets] = useState<QuestionSet[]>([]);
  const [selectedSet, setSelectedSet] = useState<QuestionSet | null>(null);
  const [isCreatingSet, setIsCreatingSet] = useState(false);
  const [isCreatingQuestion, setIsCreatingQuestion] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [editingSet, setEditingSet] = useState<QuestionSet | null>(null);
  
  // Form states for question set
  const [setTitle, setSetTitle] = useState('');
  
  // Form states for question
  const [questionForm, setQuestionForm] = useState({
    chapter: '',
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    correctAnswers: [] as number[],
    explanation: '',
    type: 'single' as 'single' | 'multiple',
    image: ''
  });
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  useEffect(() => {
    fetchQuestionSets();
  }, []);

  const fetchQuestionSets = async () => {
    try {
      const response = await fetch('/api/sets');
      if (response.ok) {
        const data = await response.json();
        setQuestionSets(data);
      } else {
        console.error('Failed to fetch question sets');
      }
    } catch (error) {
      console.error('Error fetching question sets:', error);
    }
  };

  const createQuestionSet = async () => {
    if (!setTitle.trim()) return;
    
    try {
      const response = await fetch('/api/sets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: setTitle })
      });
      
      if (response.ok) {
        setSetTitle('');
        setIsCreatingSet(false);
        fetchQuestionSets();
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error || 'Failed to create question set'}`);
      }
    } catch (error) {
      console.error('Error creating question set:', error);
      alert('Failed to create question set. Please try again.');
    }
  };

  const updateQuestionSet = async () => {
    if (!editingSet || !setTitle.trim()) return;
    
    try {
      const response = await fetch(`/api/sets/${editingSet.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: setTitle })
      });
      
      if (response.ok) {
        setSetTitle('');
        setEditingSet(null);
        fetchQuestionSets();
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error || 'Failed to update question set'}`);
      }
    } catch (error) {
      console.error('Error updating question set:', error);
      alert('Failed to update question set. Please try again.');
    }
  };

  const createQuestion = async () => {
    if (!selectedSet || !questionForm.question.trim()  ) {
      alert('Please fill in all required fields');
      return;
    }

    // Validate that at least 2 options are filled
    const validOptions = questionForm.options.filter(option => option.trim().length > 0);
    if (validOptions.length < 2) {
      alert('Please provide at least 2 options');
      return;
    }

    // Validate correct answer selection
    if (questionForm.type === 'single' && questionForm.correctAnswer === undefined) {
      alert('Please select a correct answer');
      return;
    }

    if (questionForm.type === 'multiple' && questionForm.correctAnswers.length === 0) {
      alert('Please select at least one correct answer');
      return;
    }

    if (!questionForm.explanation.trim()) {
      alert('Please provide an explanation for the correct answer');
      return;
    }
    
    try {
      const questionData = {
        ...questionForm,
        setId: selectedSet.id,
        correctAnswer: questionForm.type === 'single' ? questionForm.correctAnswer : undefined,
        correctAnswers: questionForm.type === 'multiple' ? questionForm.correctAnswers : []
      };
      
      const response = await fetch('/api/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(questionData)
      });
      
      if (response.ok) {
        resetQuestionForm();
        setIsCreatingQuestion(false);
        fetchQuestionSets();
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error || 'Failed to create question'}`);
      }
    } catch (error) {
      console.error('Error creating question:', error);
      alert('Failed to create question. Please try again.');
    }
  };

  const updateQuestion = async () => {
    if (!editingQuestion) return;

    if (!questionForm.question.trim() ) {
      alert('Please fill in all required fields');
      return;
    }

    // Validate that at least 2 options are filled
    const validOptions = questionForm.options.filter(option => option.trim().length > 0);
    if (validOptions.length < 2) {
      alert('Please provide at least 2 options');
      return;
    }

    // Validate correct answer selection
    if (questionForm.type === 'single' && questionForm.correctAnswer === undefined) {
      alert('Please select a correct answer');
      return;
    }

    if (questionForm.type === 'multiple' && questionForm.correctAnswers.length === 0) {
      alert('Please select at least one correct answer');
      return;
    }

    if (!questionForm.explanation.trim()) {
      alert('Please provide an explanation for the correct answer');
      return;
    }
    
    try {
      const questionData = {
        ...questionForm,
        correctAnswer: questionForm.type === 'single' ? questionForm.correctAnswer : undefined,
        correctAnswers: questionForm.type === 'multiple' ? questionForm.correctAnswers : []
      };
      
      const response = await fetch(`/api/questions/${editingQuestion.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(questionData)
      });
      
      if (response.ok) {
        setEditingQuestion(null);
        resetQuestionForm();
        fetchQuestionSets();
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error || 'Failed to update question'}`);
      }
    } catch (error) {
      console.error('Error updating question:', error);
      alert('Failed to update question. Please try again.');
    }
  };

  const deleteQuestion = async (questionId: number) => {
    try {
      const response = await fetch(`/api/questions/${questionId}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        fetchQuestionSets();
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error || 'Failed to delete question'}`);
      }
    } catch (error) {
      console.error('Error deleting question:', error);
      alert('Failed to delete question. Please try again.');
    }
  };

  const deleteQuestionSet = async (setId: number) => {
    if (!confirm('Are you sure you want to delete this question set? This will also delete all questions in the set.')) {
      return;
    }
    
    try {
      const response = await fetch(`/api/sets/${setId}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        if (selectedSet?.id === setId) {
          setSelectedSet(null);
        }
        fetchQuestionSets();
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error || 'Failed to delete question set'}`);
      }
    } catch (error) {
      console.error('Error deleting question set:', error);
      alert('Failed to delete question set. Please try again.');
    }
  };

  const resetQuestionForm = () => {
    setQuestionForm({
      chapter: '',
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      correctAnswers: [],
      explanation: '',
      type: 'single',
      image: ''
    });
  };

  // Image upload handlers
  const handleQuestionImageUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    try {
      setIsUploadingImage(true);
      const form = new FormData();
      form.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: form });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error || 'Upload failed');
      }
      const data = await res.json();
      const url = data.secure_url || data.url;
      if (!url) throw new Error('Missing URL from upload response');
      setQuestionForm({ ...questionForm, image: url });
    } catch (e) {
      console.error('Image upload error:', e);
      alert('Failed to upload image');
    } finally {
      setIsUploadingImage(false);
    }
  };

  const clearQuestionImage = () => {
    setQuestionForm({ ...questionForm, image: '' });
  };

  const startEditingSet = (set: QuestionSet) => {
    setEditingSet(set);
    setSetTitle(set.title);
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...questionForm.options];
    newOptions[index] = value;
    setQuestionForm({ ...questionForm, options: newOptions });
  };

  const handleCorrectAnswerChange = (index: number, checked: boolean) => {
    if (questionForm.type === 'single') {
      setQuestionForm({ ...questionForm, correctAnswer: index });
    } else {
      const newCorrectAnswers = checked 
        ? [...questionForm.correctAnswers, index]
        : questionForm.correctAnswers.filter(i => i !== index);
      setQuestionForm({ ...questionForm, correctAnswers: newCorrectAnswers });
    }
  };

  const startEditingQuestion = (question: Question) => {
    setEditingQuestion(question);
    setQuestionForm({
      chapter: question.question.split(' ')[0], // Extract chapter name
      question: question.question,
      options: question.options,
      correctAnswer: question.correctAnswer || 0,
      correctAnswers: question.correctAnswers || [],
      explanation: question.explanation,
      type: question.type,
      image: question.image || ''
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Exam Administration</h1>
        <p className="text-gray-600 mt-2">Manage question sets and questions for exams</p>
      </div>

      <Tabs defaultValue="sets" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="sets">Question Sets</TabsTrigger>
          <TabsTrigger value="questions">Questions</TabsTrigger>
        </TabsList>

        <TabsContent value="sets" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Question Sets</CardTitle>
                <Button onClick={() => setIsCreatingSet(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Set
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {(isCreatingSet || editingSet) && (
                <div className="mb-6 p-4 border rounded-lg bg-gray-50">
                  <div className="flex gap-4 items-end">
                    <div className="flex-1">
                      <Label htmlFor="setTitle">Set Title</Label>
                      <Input
                        id="setTitle"
                        value={setTitle}
                        onChange={(e) => setSetTitle(e.target.value)}
                        placeholder="Enter question set title"
                        className="mt-1"
                      />
                    </div>
                    <Button 
                      onClick={editingSet ? updateQuestionSet : createQuestionSet} 
                      disabled={!setTitle.trim()}
                    >
                      {editingSet ? 'Update Set' : 'Create Set'}
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setIsCreatingSet(false);
                        setEditingSet(null);
                        setSetTitle('');
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}

              <div className="grid gap-4">
                {questionSets.map((set) => (
                  <div key={set.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold text-lg">{set.title}</h3>
                      <p className="text-sm text-gray-600">
                        {set.questions.length} questions • Created {new Date(set.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => startEditingSet(set)}
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteQuestionSet(set.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Set
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="questions" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Questions</CardTitle>
                <div className="flex gap-4 items-center">
                  <Select value={selectedSet?.id?.toString() || ''} onValueChange={(value) => {
                    const set = questionSets.find(s => s.id.toString() === value);
                    setSelectedSet(set || null);
                  }}>
                    <SelectTrigger className="w-64">
                      <SelectValue placeholder="Select a question set" />
                    </SelectTrigger>
                    <SelectContent>
                      {questionSets.map((set) => (
                        <SelectItem key={set.id} value={set.id.toString()}>
                          {set.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedSet && (
                    <Button onClick={() => setIsCreatingQuestion(true)}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Question
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {!selectedSet ? (
                <div className="text-center py-8 text-gray-500">
                  Please select a question set to manage questions
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <Badge variant="secondary">{selectedSet.title}</Badge>
                    <span className="text-sm text-gray-600">
                      {selectedSet.questions.length} questions
                    </span>
                  </div>

                  {(isCreatingQuestion || editingQuestion) && (
                    <div className="p-6 border rounded-lg bg-gray-50 space-y-4">
                      <h3 className="font-semibold text-lg">
                        {editingQuestion ? 'Edit Question' : 'Create New Question'}
                      </h3>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="chapter">Chapter</Label>
                          <Input
                            id="chapter"
                            value={questionForm.chapter}
                            onChange={(e) => setQuestionForm({ ...questionForm, chapter: e.target.value })}
                            placeholder="Enter chapter name"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="type">Question Type</Label>
                          <Select
                            value={questionForm.type}
                            onValueChange={(value: 'single' | 'multiple') => 
                              setQuestionForm({ ...questionForm, type: value })
                            }
                          >
                            <SelectTrigger className="mt-1">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="single">Single Choice</SelectItem>
                              <SelectItem value="multiple">Multiple Choice</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="question">Question</Label>
                        <Textarea
                          id="question"
                          value={questionForm.question}
                          onChange={(e) => setQuestionForm({ ...questionForm, question: e.target.value })}
                          placeholder="Enter your question"
                          className="mt-1"
                          rows={3}
                        />
                      </div>

                      <div>
                        <Label>Options</Label>
                        <div className="grid grid-cols-2 gap-4 mt-2">
                          {questionForm.options.map((option, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <Checkbox
                                id={`option-${index}`}
                                checked={
                                  questionForm.type === 'single'
                                    ? questionForm.correctAnswer === index
                                    : questionForm.correctAnswers.includes(index)
                                }
                                onCheckedChange={(checked) => 
                                  handleCorrectAnswerChange(index, checked as boolean)
                                }
                              />
                              <Input
                                value={option}
                                onChange={(e) => handleOptionChange(index, e.target.value)}
                                placeholder={`Option ${index + 1}`}
                                className="flex-1"
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="explanation">Explanation</Label>
                        <Textarea
                          id="explanation"
                          value={questionForm.explanation}
                          onChange={(e) => setQuestionForm({ ...questionForm, explanation: e.target.value })}
                          placeholder="Explain the correct answer"
                          className="mt-1"
                          rows={2}
                        />
                      </div>

                      <div>
                        <Label>Image (optional)</Label>
                        <div className="mt-2 flex items-center gap-4 flex-wrap">
                          {questionForm.image ? (
                            <div className="flex items-center gap-3">
                              <img src={questionForm.image} alt="question" className="h-20 w-20 object-cover rounded border" />
                              <Button variant="outline" onClick={clearQuestionImage}>Remove</Button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-3">
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleQuestionImageUpload(e.target.files)}
                              />
                              {isUploadingImage && <span className="text-sm text-gray-600">Uploading...</span>}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button onClick={editingQuestion ? updateQuestion : createQuestion}>
                          {editingQuestion ? 'Update Question' : 'Create Question'}
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => {
                            setIsCreatingQuestion(false);
                            setEditingQuestion(null);
                            resetQuestionForm();
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}

                  <div className="space-y-4">
                    {selectedSet.questions.map((question) => (
                      <div key={question.id} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center gap-2">
                            <Badge variant={question.type === 'single' ? 'default' : 'secondary'}>
                              {question.type === 'single' ? 'Single Choice' : 'Multiple Choice'}
                            </Badge>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => startEditingQuestion(question)}
                            >
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => deleteQuestion(question.id)}
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </Button>
                          </div>
                        </div>
                        
                        <p className="font-medium mb-3">{question.question}</p>

                        {question.image && (
                          <div className="mb-3">
                            <img src={question.image} alt="question" className="max-h-56 rounded border" />
                          </div>
                        )}
                        
                        <div className="grid grid-cols-2 gap-2 mb-3">
                          {question.options.map((option, index) => (
                            <div
                              key={index}
                              className={`p-2 rounded border ${
                                question.type === 'single'
                                  ? question.correctAnswer === index
                                    ? 'bg-green-100 border-green-300'
                                    : 'bg-gray-50'
                                  : question.correctAnswers.includes(index)
                                    ? 'bg-green-100 border-green-300'
                                    : 'bg-gray-50'
                              }`}
                            >
                              <span className="font-medium mr-2">{String.fromCharCode(65 + index)}.</span>
                              {option}
                            </div>
                          ))}
                        </div>
                        
                        {question.explanation && (
                          <div className="text-sm text-gray-600">
                            <strong>Explanation:</strong> {question.explanation}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
