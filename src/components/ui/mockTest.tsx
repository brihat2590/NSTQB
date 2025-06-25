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

// Add question type and update the structure
const mockQuestions = [
  {
    id: 1,
    chapter: "Fundamentals of Testing",
    type: "single", // or "multiple"
    question: "Which of the following is NOT a fundamental principle of testing?",
    options: [
      "Testing shows the presence of defects",
      "Exhaustive testing is possible",
      "Early testing saves time and money",
      "Testing is context dependent",
    ],
    correctAnswer: 1, // for single choice
    correctAnswers: [], // for multiple choice
    explanation: "Exhaustive testing is not possible due to the infinite number of test cases that would be required.",
  },
  {
    id: 2,
    chapter: "Fundamentals of Testing",
    type: "single",
    question: "What is the primary objective of testing?",
    options: [
      "To prove that the software works correctly",
      "To find as many defects as possible",
      "To provide information about the quality of the software",
      "To ensure 100% code coverage",
    ],
    correctAnswer: 2,
    correctAnswers: [],
    explanation:
      "The primary objective of testing is to provide information about the quality of the software to stakeholders.",
  },
  {
    id: 3,
    chapter: "Testing Throughout the SDLC",
    type: "single",
    question: "In which development model are the development phases and testing phases most clearly separated?",
    options: ["Agile model", "V-model", "Iterative model", "Spiral model"],
    correctAnswer: 1,
    correctAnswers: [],
    explanation:
      "The V-model clearly shows the relationship between development phases and corresponding testing phases.",
  },
  {
    id: 4,
    chapter: "Testing Throughout the SDLC",
    type: "single",
    question: "Which test level focuses on testing the interactions between integrated components?",
    options: ["Unit testing", "Integration testing", "System testing", "Acceptance testing"],
    correctAnswer: 1,
    correctAnswers: [],
    explanation:
      "Integration testing focuses on testing the interfaces and interactions between integrated components.",
  },
  {
    id: 5,
    chapter: "Static Testing",
    type: "single",
    question: "Which of the following is a benefit of static testing?",
    options: [
      "It can only find defects in code",
      "It requires test execution",
      "It can find defects early in the development lifecycle",
      "It is only applicable to functional testing",
    ],
    correctAnswer: 2,
    correctAnswers: [],
    explanation: "Static testing can find defects early in the development lifecycle without executing the code.",
  },
  {
    id: 6,
    chapter: "Static Testing",
    type: "single",
    question: "What is the main difference between static and dynamic testing?",
    options: [
      "Static testing is automated, dynamic testing is manual",
      "Static testing examines code without execution, dynamic testing requires execution",
      "Static testing is cheaper than dynamic testing",
      "Static testing finds more defects than dynamic testing",
    ],
    correctAnswer: 1,
    correctAnswers: [],
    explanation:
      "Static testing examines the code, requirements, and design documents without executing the software, while dynamic testing requires execution.",
  },
  {
    id: 7,
    chapter: "Test Analysis and Design",
    type: "single",
    question: "Which black-box test technique is based on the specification of the component or system?",
    options: ["Statement coverage", "Equivalence partitioning", "Branch coverage", "Path coverage"],
    correctAnswer: 1,
    correctAnswers: [],
    explanation:
      "Equivalence partitioning is a black-box technique that divides input data into equivalent partitions based on the specification.",
  },
  {
    id: 8,
    chapter: "Test Analysis and Design",
    type: "single",
    question: "What is boundary value analysis?",
    options: [
      "Testing at the boundaries of equivalence partitions",
      "Testing the system boundaries",
      "Testing network boundaries",
      "Testing database boundaries",
    ],
    correctAnswer: 0,
    correctAnswers: [],
    explanation:
      "Boundary value analysis focuses on testing at the boundaries of equivalence partitions where defects are more likely to occur.",
  },
  {
    id: 9,
    chapter: "Managing the Test Activities",
    type: "single",
    question: "What is the purpose of test planning?",
    options: [
      "To write test cases",
      "To define the scope, approach, resources, and schedule of testing activities",
      "To execute tests",
      "To report defects",
    ],
    correctAnswer: 1,
    correctAnswers: [],
    explanation: "Test planning defines the scope, approach, resources, and schedule of intended test activities.",
  },
  {
    id: 10,
    chapter: "Managing the Test Activities",
    type: "single",
    question: "Which of the following is a test exit criterion?",
    options: [
      "All test cases have been designed",
      "All planned tests have been executed",
      "All testers are available",
      "All requirements are documented",
    ],
    correctAnswer: 1,
    correctAnswers: [],
    explanation:
      "Test exit criteria define when to stop testing. 'All planned tests have been executed' is a common exit criterion.",
  },
  {
    id: 11,
    chapter: "Test Tools",
    type: "single",
    question: "What is the primary benefit of test automation?",
    options: [
      "It eliminates the need for manual testing",
      "It finds more defects than manual testing",
      "It enables efficient execution of repetitive tests",
      "It reduces the cost of testing to zero",
    ],
    correctAnswer: 2,
    correctAnswers: [],
    explanation: "Test automation enables efficient execution of repetitive tests, especially for regression testing.",
  },
  {
    id: 12,
    chapter: "Test Tools",
    type: "single",
    question: "Which type of tool would be most appropriate for managing test cases and test execution?",
    options: ["Static analysis tool", "Performance testing tool", "Test management tool", "Coverage measurement tool"],
    correctAnswer: 2,
    correctAnswers: [],
    explanation:
      "Test management tools are specifically designed for managing test cases, test execution, and test results.",
  },
  {
    id: 13,
    chapter: "Fundamentals of Testing",
    type: "single",
    question: "What does the pesticide paradox principle state?",
    options: [
      "Testing can prove the absence of defects",
      "The same tests repeated over and over will eventually find no new defects",
      "More testing always leads to better quality",
      "Defects cluster together in certain modules",
    ],
    correctAnswer: 1,
    correctAnswers: [],
    explanation:
      "The pesticide paradox states that if the same tests are repeated, they will eventually stop finding new defects.",
  },
  {
    id: 14,
    chapter: "Fundamentals of Testing",
    type: "single",
    question: "Which statement about defect clustering is correct?",
    options: [
      "Defects are evenly distributed across all modules",
      "A small number of modules usually contain most of the defects",
      "Defect clustering only occurs in large systems",
      "Defect clustering is not a recognized testing principle",
    ],
    correctAnswer: 1,
    correctAnswers: [],
    explanation:
      "The Pareto principle applies to defect distribution - a small number of modules usually contain most of the defects.",
  },
  {
    id: 15,
    chapter: "Testing Throughout the SDLC",
    type: "multiple",
    question: "Which of the following are characteristics of good testing? (Select all that apply)",
    options: [
      "Testing should start as early as possible",
      "Testing should be exhaustive to find all defects",
      "Testing should be risk-based",
      "Testing should provide feedback about quality",
    ],
    correctAnswer: -1, // not used for multiple choice
    correctAnswers: [0, 2, 3], // indices of correct answers
    explanation:
      "Good testing starts early, is risk-based, and provides quality feedback. Exhaustive testing is not possible.",
  },
  {
    id: 16,
    chapter: "Testing Throughout the SDLC",
    type: "single",
    question: "Which testing type focuses on testing the system's ability to handle expected load?",
    options: ["Functional testing", "Performance testing", "Security testing", "Usability testing"],
    correctAnswer: 1,
    correctAnswers: [],
    explanation: "Performance testing evaluates the system's ability to handle expected load and response times.",
  },
  {
    id: 17,
    chapter: "Static Testing",
    type: "single",
    question: "Which of the following can be reviewed using static testing techniques?",
    options: [
      "Only source code",
      "Only test cases",
      "Requirements, design documents, code, and test cases",
      "Only design documents",
    ],
    correctAnswer: 2,
    correctAnswers: [],
    explanation:
      "Static testing can be applied to requirements, design documents, source code, test cases, and other work products.",
  },
  {
    id: 18,
    chapter: "Static Testing",
    type: "single",
    question: "What is the main purpose of a formal review?",
    options: [
      "To find defects and improve quality",
      "To approve the document",
      "To train new team members",
      "To satisfy audit requirements",
    ],
    correctAnswer: 0,
    correctAnswers: [],
    explanation: "The main purpose of formal reviews is to find defects and improve the quality of work products.",
  },
  {
    id: 19,
    chapter: "Test Analysis and Design",
    type: "single",
    question: "Which white-box testing technique measures the percentage of decision outcomes tested?",
    options: ["Statement coverage", "Branch coverage", "Path coverage", "Condition coverage"],
    correctAnswer: 1,
    correctAnswers: [],
    explanation: "Branch coverage measures the percentage of decision outcomes (true/false) that have been tested.",
  },
  {
    id: 20,
    chapter: "Test Analysis and Design",
    type: "single",
    question: "What is exploratory testing?",
    options: [
      "Testing without any preparation",
      "Simultaneous learning, test design, and test execution",
      "Testing only the user interface",
      "Automated testing",
    ],
    correctAnswer: 1,
    correctAnswers: [],
    explanation:
      "Exploratory testing is an approach where learning, test design, and test execution happen simultaneously.",
  },
  {
    id: 21,
    chapter: "Managing the Test Activities",
    type: "single",
    question: "What is a test oracle?",
    options: ["A testing tool", "A source to determine expected results", "A test manager", "A type of test case"],
    correctAnswer: 1,
    correctAnswers: [],
    explanation: "A test oracle is a source to determine whether test execution results are pass or fail.",
  },
  {
    id: 22,
    chapter: "Managing the Test Activities",
    type: "single",
    question: "Which factor should be considered when estimating test effort?",
    options: [
      "Only the number of test cases",
      "Characteristics of the product, process, and people",
      "Only the project timeline",
      "Only the budget available",
    ],
    correctAnswer: 1,
    correctAnswers: [],
    explanation:
      "Test effort estimation should consider product characteristics, development process, and people involved.",
  },
  {
    id: 23,
    chapter: "Test Tools",
    type: "single",
    question: "What is a key consideration when introducing test automation?",
    options: [
      "Automate everything immediately",
      "Consider the return on investment",
      "Replace all manual testers",
      "Use the most expensive tools",
    ],
    correctAnswer: 1,
    correctAnswers: [],
    explanation: "Return on investment should be carefully considered when introducing test automation.",
  },
  {
    id: 24,
    chapter: "Test Tools",
    type: "single",
    question: "Which tool would be most appropriate for measuring code coverage?",
    options: ["Test management tool", "Static analysis tool", "Coverage measurement tool", "Performance testing tool"],
    correctAnswer: 2,
    correctAnswers: [],
    explanation:
      "Coverage measurement tools are specifically designed to measure how much of the code has been exercised by tests.",
  },
  {
    id: 25,
    chapter: "Fundamentals of Testing",
    type: "single",
    question: "What is the relationship between testing and quality assurance?",
    options: [
      "They are the same thing",
      "Testing is part of quality assurance",
      "Quality assurance is part of testing",
      "They are completely unrelated",
    ],
    correctAnswer: 1,
    correctAnswers: [],
    explanation:
      "Testing is one of the activities within quality assurance, which encompasses the entire software development process.",
  },
  {
    id: 26,
    chapter: "Testing Throughout the SDLC",
    type: "single",
    question: "What is regression testing?",
    options: [
      "Testing new functionality",
      "Testing to confirm that recent changes haven't adversely affected existing features",
      "Testing the user interface",
      "Testing performance",
    ],
    correctAnswer: 1,
    correctAnswers: [],
    explanation:
      "Regression testing confirms that recent program or code changes haven't adversely affected existing features.",
  },
  {
    id: 27,
    chapter: "Static Testing",
    type: "single",
    question: "Which role is responsible for recording defects found during a review?",
    options: ["Author", "Moderator", "Scribe", "Reviewer"],
    correctAnswer: 2,
    correctAnswers: [],
    explanation:
      "The scribe is responsible for recording defects found during reviews and documenting review decisions.",
  },
  {
    id: 28,
    chapter: "Test Analysis and Design",
    type: "single",
    question: "What is the main advantage of decision table testing?",
    options: [
      "It's easy to automate",
      "It systematically covers complex business rules",
      "It requires no documentation",
      "It's the fastest technique",
    ],
    correctAnswer: 1,
    correctAnswers: [],
    explanation: "Decision table testing systematically covers complex business rules and their combinations.",
  },
  {
    id: 29,
    chapter: "Managing the Test Activities",
    type: "single",
    question: "What is the purpose of configuration management in testing?",
    options: [
      "To manage test tools",
      "To control and track changes to test work products",
      "To manage the test team",
      "To configure test environments",
    ],
    correctAnswer: 1,
    correctAnswers: [],
    explanation:
      "Configuration management controls and tracks changes to test work products and maintains their integrity.",
  },
  {
    id: 30,
    chapter: "Test Tools",
    type: "single",
    question: "What is the main risk of over-reliance on test automation?",
    options: [
      "Increased costs",
      "Reduced test coverage",
      "Missing defects that manual testing might find",
      "Slower test execution",
    ],
    correctAnswer: 2,
    correctAnswers: [],
    explanation:
      "Over-reliance on automation might miss defects that human intuition and exploratory testing could find.",
  },
  {
    id: 31,
    chapter: "Fundamentals of Testing",
    type: "single",
    question: "Which testing principle suggests that testing should start as early as possible?",
    options: [
      "Testing shows presence of defects",
      "Early testing saves time and money",
      "Exhaustive testing is impossible",
      "Testing is context dependent",
    ],
    correctAnswer: 1,
    correctAnswers: [],
    explanation: "Early testing saves time and money by finding defects when they are cheaper to fix.",
  },
  {
    id: 32,
    chapter: "Testing Throughout the SDLC",
    type: "single",
    question: "What is the main focus of system testing?",
    options: [
      "Testing individual components",
      "Testing component interactions",
      "Testing the complete integrated system",
      "Testing user acceptance",
    ],
    correctAnswer: 2,
    correctAnswers: [],
    explanation: "System testing focuses on testing the behavior of the complete integrated system.",
  },
  {
    id: 33,
    chapter: "Static Testing",
    type: "single",
    question: "What is the main benefit of using checklists in reviews?",
    options: [
      "They guarantee finding all defects",
      "They provide systematic guidance for reviewers",
      "They eliminate the need for training",
      "They automate the review process",
    ],
    correctAnswer: 1,
    correctAnswers: [],
    explanation:
      "Checklists provide systematic guidance to help reviewers focus on important aspects and common defect types.",
  },
  {
    id: 34,
    chapter: "Test Analysis and Design",
    type: "single",
    question: "What is state transition testing used for?",
    options: [
      "Testing database transactions",
      "Testing systems that exhibit different behavior based on current state",
      "Testing network connections",
      "Testing user interfaces only",
    ],
    correctAnswer: 1,
    correctAnswers: [],
    explanation:
      "State transition testing is used for systems that exhibit different behavior depending on their current state.",
  },
  {
    id: 35,
    chapter: "Managing the Test Activities",
    type: "single",
    question: "What should be included in a test summary report?",
    options: [
      "Only the number of test cases executed",
      "Test results, defects found, and recommendations",
      "Only failed test cases",
      "Only performance metrics",
    ],
    correctAnswer: 1,
    correctAnswers: [],
    explanation:
      "A test summary report should include test results, defects found, test coverage achieved, and recommendations.",
  },
  {
    id: 36,
    chapter: "Test Tools",
    type: "single",
    question: "Which type of tool helps in managing defects throughout their lifecycle?",
    options: ["Test execution tool", "Defect management tool", "Performance testing tool", "Static analysis tool"],
    correctAnswer: 1,
    correctAnswers: [],
    explanation: "Defect management tools help track, manage, and control defects throughout their lifecycle.",
  },
  {
    id: 37,
    chapter: "Fundamentals of Testing",
    type: "single",
    question: "What does 'absence-of-errors fallacy' mean?",
    options: [
      "Testing can prove software is error-free",
      "Finding no defects doesn't mean the software is ready for release",
      "Errors are always present in software",
      "Testing is not necessary if no errors are expected",
    ],
    correctAnswer: 1,
    correctAnswers: [],
    explanation:
      "The absence-of-errors fallacy means that finding no defects doesn't prove the software meets user needs and expectations.",
  },
  {
    id: 38,
    chapter: "Testing Throughout the SDLC",
    type: "single",
    question: "What is maintenance testing?",
    options: [
      "Testing during system maintenance",
      "Testing triggered by modifications to deployed software",
      "Testing the maintenance procedures",
      "Testing backup and recovery",
    ],
    correctAnswer: 1,
    correctAnswers: [],
    explanation: "Maintenance testing is triggered by modifications, migration, or retirement of deployed software.",
  },
  {
    id: 39,
    chapter: "Test Analysis and Design",
    type: "single",
    question: "What is the main purpose of test case design techniques?",
    options: [
      "To automate test execution",
      "To systematically derive test cases from test conditions",
      "To manage test data",
      "To report test results",
    ],
    correctAnswer: 1,
    correctAnswers: [],
    explanation:
      "Test case design techniques help systematically derive test cases from test conditions to achieve specific test objectives.",
  },
  {
    id: 40,
    chapter: "Managing the Test Activities",
    type: "single",
    question: "What is risk-based testing?",
    options: [
      "Testing only high-risk areas",
      "An approach where testing is prioritized based on risk analysis",
      "Testing without any planning",
      "Testing that focuses only on security risks",
    ],
    correctAnswer: 1,
    correctAnswers: [],
    explanation:
      "Risk-based testing is an approach where testing activities are prioritized based on the analysis of risk.",
  },
]
const mockQuestions2 = [
    {
      id: 1,
      chapter: "Fundamentals of Testing",
      type: "single",
      question: "Which of the following is a fundamental principle of testing?",
      options: [
        "Testing shows the absence of defects",
        "Testing can be started only after development",
        "Exhaustive testing is possible",
        "Defect clustering",
      ],
      correctAnswer: 3,
      correctAnswers: [],
      explanation: "Defect clustering states that most defects are typically found in a small number of modules.",
    },
    {
      id: 2,
      chapter: "Fundamentals of Testing",
      type: "single",
      question: "What is the main objective of testing?",
      options: [
        "To detect software failures",
        "To ensure 100% defect-free software",
        "To prove code correctness",
        "To reduce project duration",
      ],
      correctAnswer: 0,
      correctAnswers: [],
      explanation: "Testing's main goal is to find failures so that defects can be identified and fixed.",
    },
    {
      id: 3,
      chapter: "Testing Throughout the SDLC",
      type: "single",
      question: "Which test level focuses on verifying the entire system against requirements?",
      options: ["Unit testing", "Integration testing", "System testing", "Acceptance testing"],
      correctAnswer: 2,
      correctAnswers: [],
      explanation: "System testing verifies that the complete integrated system meets specified requirements.",
    },
    {
      id: 4,
      chapter: "Testing Throughout the SDLC",
      type: "single",
      question: "In which SDLC model are testing activities carried out in parallel with development?",
      options: ["V-model", "Waterfall", "Iterative", "Agile"],
      correctAnswer: 3,
      correctAnswers: [],
      explanation: "Agile promotes continuous testing and development simultaneously.",
    },
    {
      id: 5,
      chapter: "Static Testing",
      type: "single",
      question: "What is the main purpose of static testing?",
      options: [
        "To execute the software code",
        "To find defects in runtime",
        "To review work products without executing code",
        "To perform performance testing",
      ],
      correctAnswer: 2,
      correctAnswers: [],
      explanation: "Static testing involves reviews, walkthroughs, and inspections without code execution.",
    },
    {
      id: 6,
      chapter: "Static Testing",
      type: "single",
      question: "Which role is responsible for moderating a review meeting?",
      options: ["Author", "Scribe", "Moderator", "Manager"],
      correctAnswer: 2,
      correctAnswers: [],
      explanation: "The moderator facilitates the review meeting and ensures that the process is followed.",
    },
    {
      id: 7,
      chapter: "Test Analysis and Design",
      type: "single",
      question: "Which test technique is based on the software's internal structure?",
      options: ["Black-box", "White-box", "Behavioral", "Exploratory"],
      correctAnswer: 1,
      correctAnswers: [],
      explanation: "White-box testing is based on the internal structure and logic of the software.",
    },
    {
      id: 8,
      chapter: "Test Analysis and Design",
      type: "single",
      question: "What does equivalence partitioning help with?",
      options: [
        "Maximizing test coverage with fewer test cases",
        "Testing user interfaces",
        "Improving code readability",
        "Reducing code complexity",
      ],
      correctAnswer: 0,
      correctAnswers: [],
      explanation: "Equivalence partitioning reduces the number of test cases while maintaining test coverage.",
    },
    {
      id: 9,
      chapter: "Managing the Test Activities",
      type: "single",
      question: "What is the purpose of entry criteria in test planning?",
      options: [
        "To define when a test level is complete",
        "To specify when testing can begin",
        "To assign responsibilities to testers",
        "To define testing tools",
      ],
      correctAnswer: 1,
      correctAnswers: [],
      explanation: "Entry criteria define the conditions that must be met to start testing.",
    },
    {
      id: 10,
      chapter: "Managing the Test Activities",
      type: "single",
      question: "Which document outlines the overall test approach and schedule?",
      options: [
        "Test case",
        "Test summary report",
        "Test plan",
        "Defect report",
      ],
      correctAnswer: 2,
      correctAnswers: [],
      explanation: "The test plan outlines the scope, approach, resources, and schedule of testing.",
    },
  
    // 11–20
    {
      id: 11,
      chapter: "Test Tools",
      type: "single",
      question: "Which tool helps evaluate the non-functional behavior of software?",
      options: ["Test management", "Defect tracking", "Performance testing", "Static analysis"],
      correctAnswer: 2,
      correctAnswers: [],
      explanation: "Performance testing tools evaluate response time, load handling, etc.",
    },
    {
      id: 12,
      chapter: "Test Tools",
      type: "single",
      question: "What is the main use of a static analysis tool?",
      options: [
        "To track defects",
        "To execute performance tests",
        "To analyze code without executing it",
        "To measure user satisfaction",
      ],
      correctAnswer: 2,
      correctAnswers: [],
      explanation: "Static analysis tools help detect defects early by analyzing code structure.",
    },
    {
      id: 13,
      chapter: "Fundamentals of Testing",
      type: "single",
      question: "Which testing principle addresses repeating the same tests and no longer finding new defects?",
      options: [
        "Early testing",
        "Exhaustive testing",
        "Defect clustering",
        "Pesticide paradox",
      ],
      correctAnswer: 3,
      correctAnswers: [],
      explanation: "The pesticide paradox suggests updating test cases to find new defects.",
    },
    {
      id: 14,
      chapter: "Fundamentals of Testing",
      type: "single",
      question: "Which principle suggests that a small number of modules contain most defects?",
      options: [
        "Defect clustering",
        "Early testing",
        "Exhaustive testing",
        "Risk-based testing",
      ],
      correctAnswer: 0,
      correctAnswers: [],
      explanation: "Defect clustering aligns with the Pareto principle (80/20 rule).",
    },
    {
      id: 15,
      chapter: "Testing Throughout the SDLC",
      type: "multiple",
      question: "Which of the following are typical exit criteria? (Select all that apply)",
      options: [
        "All test cases passed",
        "No defects found",
        "Test coverage reached 90%",
        "All planned tests executed",
      ],
      correctAnswer: -1,
      correctAnswers: [0, 2, 3],
      explanation: "Exit criteria are based on test coverage, execution, and defect resolution.",
    },
    {
      id: 16,
      chapter: "Testing Throughout the SDLC",
      type: "single",
      question: "Which testing level focuses on individual components?",
      options: [
        "Unit testing",
        "Integration testing",
        "System testing",
        "Acceptance testing",
      ],
      correctAnswer: 0,
      correctAnswers: [],
      explanation: "Unit testing tests individual modules or functions in isolation.",
    },
    {
      id: 17,
      chapter: "Static Testing",
      type: "single",
      question: "Which of the following is a benefit of static testing?",
      options: [
        "It detects memory leaks",
        "It prevents all bugs",
        "It finds defects early in the lifecycle",
        "It replaces the need for reviews",
      ],
      correctAnswer: 2,
      correctAnswers: [],
      explanation: "Static testing is effective early, before code execution starts.",
    },
    {
      id: 18,
      chapter: "Static Testing",
      type: "single",
      question: "What type of review is typically led by the author?",
      options: ["Walkthrough", "Inspection", "Technical review", "Formal review"],
      correctAnswer: 0,
      correctAnswers: [],
      explanation: "In walkthroughs, the author guides participants through the product.",
    },
    {
      id: 19,
      chapter: "Test Analysis and Design",
      type: "single",
      question: "Which technique is most useful for validating logic paths?",
      options: [
        "Boundary value analysis",
        "State transition testing",
        "Decision table testing",
        "Statement coverage",
      ],
      correctAnswer: 3,
      correctAnswers: [],
      explanation: "Statement coverage validates whether each statement has been executed.",
    },
    {
      id: 20,
      chapter: "Test Analysis and Design",
      type: "single",
      question: "Which testing technique is most appropriate for business rules?",
      options: [
        "Equivalence partitioning",
        "Decision table testing",
        "State transition testing",
        "Error guessing",
      ],
      correctAnswer: 1,
      correctAnswers: [],
      explanation: "Decision tables are ideal for complex business rules with multiple conditions.",
    },
    {
        id: 21,
        chapter: "Managing the Test Activities",
        type: "single",
        question: "What is the main purpose of a test summary report?",
        options: [
          "To provide detailed test case steps",
          "To summarize testing activities and results",
          "To log defects found during testing",
          "To define the test environment",
        ],
        correctAnswer: 1,
        correctAnswers: [],
        explanation:
          "A test summary report provides an overview of testing activities, coverage, and outcomes.",
      },
      {
        id: 22,
        chapter: "Managing the Test Activities",
        type: "single",
        question: "Which activity is part of configuration management in testing?",
        options: [
          "Tracking defects",
          "Controlling changes to test artifacts",
          "Executing test cases",
          "Performing risk analysis",
        ],
        correctAnswer: 1,
        correctAnswers: [],
        explanation: "Configuration management controls and tracks changes to test documents and tools.",
      },
      {
        id: 23,
        chapter: "Test Tools",
        type: "single",
        question: "Which test tool type helps automate regression testing?",
        options: [
          "Static analysis tool",
          "Test execution tool",
          "Test management tool",
          "Defect tracking tool",
        ],
        correctAnswer: 1,
        correctAnswers: [],
        explanation: "Test execution tools automate running tests and comparing actual vs expected results.",
      },
      {
        id: 24,
        chapter: "Test Tools",
        type: "single",
        question: "What is a key consideration before adopting test automation?",
        options: [
          "Automate all tests immediately",
          "ROI (Return on Investment)",
          "Replacing all manual testers",
          "Using only open-source tools",
        ],
        correctAnswer: 1,
        correctAnswers: [],
        explanation:
          "Test automation should be evaluated based on return on investment and test suitability.",
      },
      {
        id: 25,
        chapter: "Fundamentals of Testing",
        type: "single",
        question: "Which statement best describes the 'absence-of-errors fallacy'?",
        options: [
          "If no errors are found, the software is ready for release",
          "Absence of defects means high quality",
          "Finding no defects does not mean the software meets user needs",
          "Errors will always be present",
        ],
        correctAnswer: 2,
        correctAnswers: [],
        explanation:
          "The absence-of-errors fallacy highlights that no defects does not guarantee fitness for purpose.",
      },
      {
        id: 26,
        chapter: "Testing Throughout the SDLC",
        type: "single",
        question: "What is maintenance testing?",
        options: [
          "Testing a system after deployment",
          "Testing new functionality",
          "Testing during development",
          "Testing migration and patches",
        ],
        correctAnswer: 3,
        correctAnswers: [],
        explanation:
          "Maintenance testing is performed after modifications, such as patches or migrations.",
      },
      {
        id: 27,
        chapter: "Static Testing",
        type: "single",
        question: "What is the role of the scribe during a review?",
        options: [
          "Author of the document",
          "Facilitator of the meeting",
          "Recorder of defects and decisions",
          "Reviewer of the content",
        ],
        correctAnswer: 2,
        correctAnswers: [],
        explanation: "The scribe documents defects found and decisions made during reviews.",
      },
      {
        id: 28,
        chapter: "Test Analysis and Design",
        type: "single",
        question: "Which technique helps test systems with multiple input combinations?",
        options: [
          "Decision table testing",
          "Boundary value analysis",
          "Equivalence partitioning",
          "Exploratory testing",
        ],
        correctAnswer: 0,
        correctAnswers: [],
        explanation:
          "Decision table testing systematically covers combinations of inputs and their expected outputs.",
      },
      {
        id: 29,
        chapter: "Managing the Test Activities",
        type: "single",
        question: "Why is risk-based testing important?",
        options: [
          "It tests all components equally",
          "It prioritizes testing based on risk impact",
          "It removes the need for planning",
          "It focuses only on security testing",
        ],
        correctAnswer: 1,
        correctAnswers: [],
        explanation: "Risk-based testing helps focus efforts on the most critical and risky parts of the software.",
      },
      {
        id: 30,
        chapter: "Test Tools",
        type: "single",
        question: "What can be a risk of over-reliance on test automation?",
        options: [
          "Reduced testing costs",
          "Missing defects that require human intuition",
          "Faster test execution",
          "More consistent test results",
        ],
        correctAnswer: 1,
        correctAnswers: [],
        explanation:
          "Automation may miss defects that exploratory or manual testing can detect through intuition.",
      },
      {
        id: 31,
        chapter: "Fundamentals of Testing",
        type: "single",
        question: "What does the principle 'Testing is context dependent' mean?",
        options: [
          "Testing methods are the same for all projects",
          "Testing must adapt based on project context and risks",
          "Testing is optional for small projects",
          "Testing always finds the same number of defects",
        ],
        correctAnswer: 1,
        correctAnswers: [],
        explanation: "Testing approaches vary based on factors such as project type, risks, and technology.",
      },
      {
        id: 32,
        chapter: "Testing Throughout the SDLC",
        type: "single",
        question: "What is the main goal of system testing?",
        options: [
          "Testing individual modules",
          "Testing interfaces between modules",
          "Validating the complete integrated system",
          "User acceptance testing",
        ],
        correctAnswer: 2,
        correctAnswers: [],
        explanation: "System testing verifies that the fully integrated system meets requirements.",
      },
      {
        id: 33,
        chapter: "Static Testing",
        type: "single",
        question: "What is the benefit of using checklists in reviews?",
        options: [
          "They guarantee defect-free products",
          "They provide systematic guidance for reviewers",
          "They eliminate the need for training",
          "They automate review processes",
        ],
        correctAnswer: 1,
        correctAnswers: [],
        explanation:
          "Checklists help reviewers focus on common defect types and ensure consistency.",
      },
      {
        id: 34,
        chapter: "Test Analysis and Design",
        type: "single",
        question: "State transition testing is most useful for testing?",
        options: [
          "Systems with multiple states and transitions",
          "Database connections",
          "User interface only",
          "Network protocols",
        ],
        correctAnswer: 0,
        correctAnswers: [],
        explanation: "State transition testing is used for systems where behavior depends on current state.",
      },
      {
        id: 35,
        chapter: "Managing the Test Activities",
        type: "single",
        question: "What should a test summary report contain?",
        options: [
          "Test design details",
          "Defect status and test results summary",
          "Test tool configurations",
          "Only passed test cases",
        ],
        correctAnswer: 1,
        correctAnswers: [],
        explanation:
          "It includes test results, defects found, coverage, and recommendations for next steps.",
      },
      {
        id: 36,
        chapter: "Test Tools",
        type: "single",
        question: "What is the main purpose of a defect management tool?",
        options: [
          "Execute tests automatically",
          "Track and manage defects through their lifecycle",
          "Measure code quality",
          "Manage test cases",
        ],
        correctAnswer: 1,
        correctAnswers: [],
        explanation: "Defect management tools help log, track, and report defects.",
      },
      {
        id: 37,
        chapter: "Fundamentals of Testing",
        type: "single",
        question: "What is the 'absence-of-errors fallacy'?",
        options: [
          "No errors means software is perfect",
          "No defects found doesn't mean software is ready",
          "Errors always exist in software",
          "Testing can prove software is error-free",
        ],
        correctAnswer: 1,
        correctAnswers: [],
        explanation:
          "Finding no defects does not guarantee the software meets business needs.",
      },
      {
        id: 38,
        chapter: "Testing Throughout the SDLC",
        type: "single",
        question: "What triggers maintenance testing?",
        options: [
          "System deployment",
          "New development",
          "Modifications to existing software",
          "User acceptance",
        ],
        correctAnswer: 2,
        correctAnswers: [],
        explanation: "Maintenance testing is done after software changes such as fixes or enhancements.",
      },
      {
        id: 39,
        chapter: "Test Analysis and Design",
        type: "single",
        question: "What is the goal of test case design techniques?",
        options: [
          "To automate test execution",
          "To systematically derive effective test cases",
          "To design test environments",
          "To write test reports",
        ],
        correctAnswer: 1,
        correctAnswers: [],
        explanation:
          "Test case design techniques help derive test cases from test conditions to meet test objectives.",
      },
      {
        id: 40,
        chapter: "Managing the Test Activities",
        type: "single",
        question: "What does risk-based testing prioritize?",
        options: [
          "Test cases with the lowest cost",
          "Testing based on areas of highest risk",
          "Only functional requirements",
          "All requirements equally",
        ],
        correctAnswer: 1,
        correctAnswers: [],
        explanation:
          "Risk-based testing focuses on areas with higher risk to improve test efficiency and effectiveness.",
      },
    
  
    // 21–40 (continued in next message due to space limits)
  ];
  

type QuizState = "not-started" | "in-progress" | "completed"

export default function MockTest() {
  const [quizState, setQuizState] = useState<QuizState>("not-started")
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<any[]>(new Array(40).fill(-1))
  const [timeLeft, setTimeLeft] = useState(60 * 60) // 60 minutes in seconds
  const [score, setScore] = useState(0)
  const [showExplanations, setShowExplanations] = useState(false)
  const[selectedSet,setSelectedSet]=useState("set1");
  const questionToRender=selectedSet==="set1"?mockQuestions:mockQuestions2;

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
                    className={`px-6 py-2 rounded-md font-semibold transition-colors duration-300
                        ${
                        selectedSet === "set2"
                            ? "bg-blue-600 text-white shadow-lg"
                            : "bg-white text-blue-600 border border-blue-600 hover:bg-blue-100"
                        }`}
                    >
                    Set 2
                    </button>

              

              

                
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
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Progress: {Math.round(progress)}%</span>
                <span>Answered: {answeredQuestions}/40</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
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
            <Link href="/" className="flex items-start"><ArrowLeft/></Link>
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
        <Card className="shadow-lg mb-8">
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
        </Card>

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
