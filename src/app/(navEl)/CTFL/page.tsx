import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Award,
  BookOpen,
  Clock,
  Users,
  CheckCircle,
  Target,
  Globe,
  TrendingUp,
  FileText,
  Calendar,
  Star,
  ArrowRight,
  Download,
} from "lucide-react"

const examDetails = {
  duration: "60 minutes",
  questions: "40 questions",
  passingScore: "65% (26 out of 40)",
  format: "Multiple choice",
  language: "English",
  delivery: "Online proctored",
  fee: "NPR 21,000/-",
  validity: "Lifetime",
}

const syllabusChapters = [
  {
    chapter: "Chapter 1: Fundamentals of Testing",
    duration: "175 minutes",
    percentage: "23%",
    topics: [
      "What is testing and why is it necessary?",
      "Seven testing principles",
      "Test process and activities",
      "Psychology of testing",
      "Code of ethics for testers",
    ],
  },
  {
    chapter: "Chapter 2: Testing Throughout the SDLC",
    duration: "100 minutes",
    percentage: "18%",
    topics: [
      "Software development lifecycle models",
      "Test levels and test types",
      "Maintenance testing",
      "Test planning and estimation",
    ],
  },
  {
    chapter: "Chapter 3: Static Testing",
    duration: "135 minutes",
    percentage: "18%",
    topics: ["Static testing basics", "Feedback and review process", "Review techniques", "Static analysis tools"],
  },
  {
    chapter: "Chapter 4: Test Analysis and Design",
    duration: "330 minutes",
    percentage: "33%",
    topics: [
      "Test development process",
      "Black-box test techniques",
      "White-box test techniques",
      "Experience-based test techniques",
    ],
  },
  {
    chapter: "Chapter 5: Managing the Test Activities",
    duration: "225 minutes",
    percentage: "15%",
    topics: [
      "Test planning and estimation",
      "Test monitoring and control",
      "Configuration management",
      "Risk and testing",
      "Defect management",
    ],
  },
  {
    chapter: "Chapter 6: Test Tools",
    duration: "40 minutes",
    percentage: "8%",
    topics: ["Tool support for testing", "Benefits and risks of test automation", "Effective use of tools"],
  },
]

const benefits = [
  {
    title: "Global Recognition",
    description: "Recognized by employers worldwide in 50+ countries",
    icon: <Globe className="h-6 w-6" />,
  },
  {
    title: "Career Advancement",
    description: "Opens doors to senior testing roles and higher salaries",
    icon: <TrendingUp className="h-6 w-6" />,
  },
  {
    title: "Industry Standard",
    description: "Most widely accepted software testing certification",
    icon: <Award className="h-6 w-6" />,
  },
  {
    title: "Professional Credibility",
    description: "Validates your testing knowledge and skills",
    icon: <Star className="h-6 w-6" />,
  },
]

export default function CTFL() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-red-50">
      
      
      {/* <section className="bg-gray-50 text-gray-600 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <Badge className="bg-white/20 text-white border-white/30 mb-4">
              ISTQB® Certified Tester Foundation Level
            </Badge>
            <h1 className="text-5xl font-bold mb-6">CTFL Certification</h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
              The ISTQB® Certified Tester Foundation Level (CTFL) is the gateway certification for software testing
              professionals. It provides essential knowledge and skills needed to excel in software testing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link href="/exam-schedule"><Button size="lg" className="bg-white text-red-600 hover:bg-gray-100 font-semibold">
                <Calendar className="mr-2 h-5 w-5" />
                View Exam Schedule
              </Button></Link>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-red-600">
                <Download className="mr-2 h-5 w-5" />
                Download Syllabus
              </Button>
            </div>
          </div>
        </div>
      </section> */}

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Quick Facts */}
        <section className="mb-12">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-red-50 to-blue-50">
              <CardTitle className="text-2xl text-center">CTFL Exam Quick Facts</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-4 gap-6">
                {Object.entries(examDetails).map(([key, value], index) => (
                  <div key={index} className="text-center">
                    <div className="bg-gradient-to-r from-red-100 to-blue-100 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                      {key === "duration" && <Clock className="h-6 w-6 text-red-600" />}
                      {key === "questions" && <FileText className="h-6 w-6 text-blue-600" />}
                      {key === "passingScore" && <Target className="h-6 w-6 text-red-600" />}
                      {key === "format" && <CheckCircle className="h-6 w-6 text-blue-600" />}
                      {key === "language" && <Globe className="h-6 w-6 text-red-600" />}
                      {key === "delivery" && <Users className="h-6 w-6 text-blue-600" />}
                      {key === "fee" && <Award className="h-6 w-6 text-red-600" />}
                      {key === "validity" && <Star className="h-6 w-6 text-blue-600" />}
                    </div>
                    <h3 className="font-semibold text-gray-900 capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</h3>
                    <p className="text-gray-600 text-sm">{value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 bg-gray-100">
            <TabsTrigger value="overview" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
              Overview
            </TabsTrigger>
            <TabsTrigger value="syllabus" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Syllabus
            </TabsTrigger>
            <TabsTrigger value="benefits" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
              Benefits
            </TabsTrigger>
            <TabsTrigger value="preparation" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Preparation
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <BookOpen className="h-6 w-6 text-red-600" />
                  What is CTFL?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  The ISTQB® Certified Tester Foundation Level (CTFL) is an entry-level certification that provides a
                  solid foundation in software testing. It covers fundamental testing concepts, techniques, and
                  processes that are essential for anyone working in software testing.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  This certification is designed for professionals who want to demonstrate their knowledge of software
                  testing fundamentals and establish credibility in the field. It serves as a stepping stone to advanced
                  ISTQB certifications.
                </p>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Users className="h-6 w-6 text-blue-600" />
                    Who Should Take This Exam?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">Software testers and QA professionals</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">Test analysts and test engineers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">Test consultants and test managers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">Developers interested in testing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">Project managers and business analysts</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Target className="h-6 w-6 text-red-600" />
                    Prerequisites
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <h4 className="font-semibold text-green-800 mb-2">No Prerequisites Required</h4>
                      <p className="text-green-700 text-sm">
                        The CTFL certification has no formal prerequisites. However, some basic understanding of
                        software development is helpful.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-900">Recommended Experience:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Basic understanding of software development</li>
                        <li>• Familiarity with software applications</li>
                        <li>• Interest in quality assurance</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Syllabus Tab */}
          <TabsContent value="syllabus" className="space-y-8">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-center">CTFL v4.0 Syllabus Breakdown</CardTitle>
                <CardDescription className="text-center">
                  Total study time: approximately 18 hours of lectures
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {syllabusChapters.map((chapter, index) => (
                    <Card key={index} className="border border-gray-200">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-bold text-gray-900">{chapter.chapter}</h3>
                          <div className="flex items-center gap-4">
                            <Badge variant="outline">{chapter.percentage}</Badge>
                            <Badge variant="secondary">{chapter.duration}</Badge>
                          </div>
                        </div>
                        <ul className="space-y-2">
                          {chapter.topics.map((topic, topicIndex) => (
                            <li key={topicIndex} className="flex items-start gap-2 text-sm text-gray-700">
                              <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                              {topic}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Benefits Tab */}
          <TabsContent value="benefits" className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              {benefits.map((benefit, index) => (
                <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-8 text-center">
                    <div className="bg-gradient-to-r from-red-100 to-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                      <div className="text-red-600">{benefit.icon}</div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="shadow-lg bg-gradient-to-r from-red-50 to-blue-50">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-center text-gray-900 mb-6">Career Impact</h3>
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div>
                    <h4 className="text-3xl font-bold text-red-600 mb-2">25%</h4>
                    <p className="text-gray-700">Average salary increase</p>
                  </div>
                  <div>
                    <h4 className="text-3xl font-bold text-blue-600 mb-2">130+</h4>
                    <p className="text-gray-700">Countries recognize ISTQB</p>
                  </div>
                  <div>
                    <h4 className="text-3xl font-bold text-red-600 mb-2">1M+</h4>
                    <p className="text-gray-700">Certified professionals worldwide</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preparation Tab */}
          <TabsContent value="preparation" className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <BookOpen className="h-6 w-6 text-red-600" />
                    Study Materials
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <a href="/istqbSyllabus.pdf" download={true} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <FileText className="h-5 w-5 text-blue-600" />
                      <span className="text-gray-700">Official ISTQB Syllabus v4.0</span>
                    </a>
                    <a href="https://glossary.istqb.org"target="_blank"
  rel="noopener noreferrer"className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <BookOpen className="h-5 w-5 text-red-600" />
                      <span className="text-gray-700">ISTQB Glossary of Testing Terms</span>
                    </a>
                    <a href="/istqbSampleQ.pdf" download={true} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <FileText className="h-5 w-5 text-blue-600" />
                      <span className="text-gray-700">Sample Question Papers</span>
                    </a>
                    <a href="https://www.istqb.org/certifications/certified-tester-foundation-level-ctfl-v4-0/" target="_blank"
  rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <BookOpen className="h-5 w-5 text-red-600" />
                      <span className="text-gray-700">Go to Docs</span>
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Calendar className="h-6 w-6 text-blue-600" />
                    Study Plan
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                        1
                      </div>
                      <span className="text-gray-700">Read the official syllabus (Week 1-2)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                        2
                      </div>
                      <span className="text-gray-700">Study each chapter thoroughly (Week 3-6)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                        3
                      </div>
                      <span className="text-gray-700">Practice with sample questions (Week 7-8)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                        4
                      </div>
                      <span className="text-gray-700">Take mock exams and review (Week 9-10)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-center">Exam Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Before the Exam:</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        Review all chapters thoroughly
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        Practice with sample questions
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        Understand key terminology
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        Get adequate rest before exam
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">During the Exam:</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        Read questions carefully
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        Manage your time effectively
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        Answer all questions
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        Review answers if time permits
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        {/* <section className="mt-16">
          <Card className="shadow-lg bg-gradient-to-r from-red-600 to-blue-600 text-white">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Get CTFL Certified?</h2>
              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                Start your software testing career with the globally recognized ISTQB Foundation Level certification.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100 font-semibold">
                  Register for Exam
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-red-600"
                >
                  View Registration Process
                </Button>
              </div>
            </CardContent>
          </Card>
        </section> */}
      </div>
    </div>
  )
}
