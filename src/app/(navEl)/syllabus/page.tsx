import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, BookOpen, Clock, Users, Award, CheckCircle } from "lucide-react"

const syllabusData = [
  {
    level: "foundation",
    title: "Foundation Level",
    duration: "40 Hours",
    examDuration: "60 Minutes (+25% Non-Native Language)",
    questions: "40 Questions",
    passingScore: "65%",
    prerequisites: "None",
    description: "Introduction to software testing fundamentals and basic testing techniques.",
    topics: [
      {
        chapter: "Chapter 1: Fundamentals of Testing",
        duration: "8 hours",
        topics: [
          "What is testing and why is it necessary?",
          "Testing principles",
          "Testing process and activities",
          "Psychology of testing",
          "Code of ethics",
        ],
      },
      {
        chapter: "Chapter 2: Testing Throughout the SDLC",
        duration: "6 hours",
        topics: ["Software development lifecycle models", "Test levels and test types", "Maintenance testing"],
      },
      {
        chapter: "Chapter 3: Static Testing",
        duration: "6 hours",
        topics: ["Static testing basics", "Feedback and review process", "Review techniques"],
      },
      {
        chapter: "Chapter 4: Test Analysis and Design",
        duration: "8 hours",
        topics: [
          "Test development process",
          "Black-box test techniques",
          "White-box test techniques",
          "Experience-based test techniques",
        ],
      },
      {
        chapter: "Chapter 5: Managing the Test Activities",
        duration: "6 hours",
        topics: [
          "Test planning and estimation",
          "Test monitoring and control",
          "Configuration management",
          "Risk and testing",
        ],
      },
      {
        chapter: "Chapter 6: Test Tools",
        duration: "6 hours",
        topics: ["Tool support for testing", "Benefits and risks of test automation", "Effective use of tools"],
      },
    ],
    downloadLinks: [
      { name: "Foundation Level Syllabus v4.0", size: "2.1 MB", format: "PDF" },
      { name: "Sample Questions", size: "856 KB", format: "PDF" },
      { name: "Glossary of Terms", size: "1.2 MB", format: "PDF" },
    ],
  },
]

export default function Syllabus() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-red-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12  text-gray-600  bg-gray-50 py-12 px-6 rounded-2xl shadow-lg">
          <h1 className="text-4xl font-bold mb-4">Certification Syllabus</h1>
          <p className="text-xl max-w-2xl mx-auto opacity-95">Nepal Software Testing Qualifications Body</p>
          <p className="mt-2 opacity-90">
            Comprehensive syllabus for all certification levels with downloadable resources
          </p>
        </div>

        {/* Syllabus Tabs */}
        <div className="mb-8">
          <Card className="shadow-lg bg-gradient-to-r from-red-50 to-blue-50">
            <CardContent className="pt-6 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Foundation Level Certification</h2>
              <p className="text-gray-600">Complete syllabus and course materials for software testing fundamentals</p>
            </CardContent>
          </Card>
        </div>

        {syllabusData.map((syllabus) => (
          <div key={syllabus.level}>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Syllabus Overview */}
              <div className="lg:col-span-1">
                <Card className="shadow-lg sticky top-4">
                  <CardHeader className="bg-gradient-to-r from-red-50 to-blue-50">
                    <CardTitle className="flex items-center gap-2 text-2xl">
                      <Award className="h-6 w-6 text-red-600" />
                      {syllabus.title}
                    </CardTitle>
                    <CardDescription>{syllabus.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium">Duration: {syllabus.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-red-600" />
                        <span className="text-sm font-medium">Exam: {syllabus.examDuration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium">{syllabus.questions}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium">Pass: {syllabus.passingScore}</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <h4 className="font-semibold text-gray-900 mb-2">Prerequisites</h4>
                      <Badge variant="outline" className="text-xs">
                        {syllabus.prerequisites}
                      </Badge>
                    </div>

                    <div className="pt-4 border-t">
                      <h4 className="font-semibold text-gray-900 mb-3">Download Resources</h4>
                      <div className="space-y-2">
                        {syllabus.downloadLinks.map((link, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            className="w-full justify-between hover:bg-gradient-to-r hover:from-red-50 hover:to-blue-50"
                          >
                            <div className="flex items-center gap-2">
                              <Download className="h-4 w-4" />
                              <span className="text-xs truncate">{link.name}</span>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                              <span>{link.format}</span>
                              <span>•</span>
                              <span>{link.size}</span>
                            </div>
                          </Button>
                        ))}
                        <span><a className="text-blue-700" href="https://www.istqb.org/certifications/certified-tester-foundation-level-ctfl-v4-0/"> Click here</a> for official documentation</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              

              {/* Detailed Topics */}
              <div className="lg:col-span-2">
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl">Course Content & Topics</CardTitle>
                    <CardDescription>Detailed breakdown of all chapters and learning objectives</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {syllabus.topics.map((topic, index) => (
                      <div key={index} className="border rounded-lg p-4 bg-gradient-to-r from-gray-50 to-blue-50">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-semibold text-gray-900">{topic.chapter}</h3>
                          <Badge variant="secondary">{topic.duration}</Badge>
                        </div>
                        <ul className="space-y-2">
                          {topic.topics.map((subtopic, subIndex) => (
                            <li key={subIndex} className="flex items-start gap-2 text-sm text-gray-700">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              {subtopic}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        ))}

        {/* Call to Action */}
        {/* <Card className="mt-12 shadow-lg bg-gradient-to-r from-red-600 to-blue-600 text-white">
          <CardContent className="pt-6 text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to Get Certified?</h3>
            <p className="mb-6 opacity-90">
              Start your software testing certification journey today with our comprehensive training programs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-red-600 hover:bg-gray-100">Register for Exam</Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-red-600">
                View Training Schedule
              </Button>
            </div>
          </CardContent>
        </Card> */}
        
      </div>
    </div>
  )
}
