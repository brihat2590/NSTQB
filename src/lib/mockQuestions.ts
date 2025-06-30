export const mockQuestions = [
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
  export const mockQuestions2 = [
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
  
export const mockQuestions3=[
  
    {
      id: 1,
      chapter: "Fundamentals of Testing",
      type: "single",
      question: "Software testing activities should start:",
      options: [
        "as soon as the code is written",
        "during the design stage",
        "when the requirements have been formally documented",
        "as soon as possible in the development life cycle"
      ],
      correctAnswer: 3,
      correctAnswers: [],
      explanation: "Testing should begin early in the SDLC to identify defects when they're least expensive to fix."
    },
    {
      id: 2,
      chapter: "Fundamentals of Testing",
      type: "single",
      question: "Faults found by users are due to:",
      options: [
        "Poor quality software",
        "Poor software and poor testing",
        "bad luck",
        "insufficient time for testing"
      ],
      correctAnswer: 1,
      correctAnswers: [],
      explanation: "Faults found in production typically result from inadequate testing processes combined with software quality issues."
    },
    {
      id: 3,
      chapter: "Fundamentals of Testing",
      type: "single",
      question: "What is the main reason for testing software before releasing it?",
      options: [
        "To show that software will always work correctly",
        "To demonstrate that no defects remain",
        "To gain confidence in its quality",
        "To satisfy contractual requirements"
      ],
      correctAnswer: 2,
      correctAnswers: [],
      explanation: "Testing provides objective information about quality to support decision-making."
    },
    {
      id: 4,
      chapter: "Testing Throughout the SDLC",
      type: "single",
      question: "Which statement about component testing is FALSE?",
      options: [
        "May cover functional and non-functional characteristics",
        "Tests are derived from component specifications",
        "Usually done by testers",
        "May be done in isolation from other components"
      ],
      correctAnswer: 2,
      correctAnswers: [],
      explanation: "Component testing is typically performed by developers, not dedicated testers."
    },
    {
      id: 5,
      chapter: "Test Management",
      type: "single",
      question: "Which is the BEST practice when reporting faults found during testing?",
      options: [
        "Write detailed steps including all possible data combinations",
        "Include suggestions for fixing the fault",
        "Write clear, concise, and factual reports",
        "Only report faults that will definitely be fixed"
      ],
      correctAnswer: 2,
      correctAnswers: [],
      explanation: "Effective incident reports should be objective, specific, and focus on reproducibility."
    },
    {
      id: 6,
      chapter: "Test Management",
      type: "single",
      question: "What is the correct order of test execution?",
      options: [
        "System, Integration, Component, Acceptance",
        "Component, Integration, System, Acceptance",
        "Component, System, Integration, Acceptance",
        "Acceptance, System, Integration, Component"
      ],
      correctAnswer: 1,
      correctAnswers: [],
      explanation: "Testing typically progresses from component to integration to system to acceptance levels."
    },
    {
      id: 7,
      chapter: "Fundamentals of Testing",
      type: "single",
      question: "When is the cost to fix a defect typically highest?",
      options: [
        "During component testing",
        "During acceptance testing",
        "During requirements analysis",
        "During maintenance after release"
      ],
      correctAnswer: 3,
      correctAnswers: [],
      explanation: "Defect correction costs increase exponentially through the SDLC, peaking after release."
    },
    {
      id: 8,
      chapter: "Test Techniques",
      type: "single",
      question: "Which is a black box test design technique?",
      options: [
        "Statement testing",
        "Branch testing",
        "Equivalence partitioning",
        "LCSAJ testing"
      ],
      correctAnswer: 2,
      correctAnswers: [],
      explanation: "Equivalence partitioning uses specification-based information without internal implementation details."
    },
    {
      id: 9,
      chapter: "Test Management",
      type: "single",
      question: "Which term describes test documentation?",
      options: [
        "Test policy",
        "Test strategy",
        "Test plan",
        "Testware"
      ],
      correctAnswer: 3,
      correctAnswers: [],
      explanation: "Testware includes all artifacts produced during the test process."
    },
    {
      id: 10,
      chapter: "Test Management",
      type: "single",
      question: "Which is a key purpose of configuration management?",
      options: [
        "To manage test execution schedules",
        "To track test results",
        "To identify test procedures",
        "To uniquely identify testware versions"
      ],
      correctAnswer: 3,
      correctAnswers: [],
      explanation: "Configuration management ensures version control and traceability of test artifacts."
    },
    {
      id: 11,
      chapter: "Test Management",
      type: "single",
      question: "Which is a key benefit of incident logging systems?",
      options: [
        "Automatically fix defects",
        "Provide statistics for progress tracking",
        "Prioritize business requirements",
        "Generate test data"
      ],
      correctAnswer: 1,
      correctAnswers: [],
      explanation: "Incident metrics support test monitoring and control activities."
    },
    {
      id: 12,
      chapter: "Fundamentals of Testing",
      type: "single",
      question: "What is the impact of poor software quality on testing time?",
      options: [
        "Reduces testing time",
        "Increases testing time",
        "No impact on testing time",
        "Eliminates need for testing"
      ],
      correctAnswer: 1,
      correctAnswers: [],
      explanation: "Higher defect density requires more test execution and retesting cycles."
    },
    {
      id: 13,
      chapter: "Test Management",
      type: "single",
      question: "Which is a valid coverage measure?",
      options: [
        "Percentage of requirements tested",
        "Number of test cases executed",
        "Number of defects found",
        "Time spent testing"
      ],
      correctAnswer: 0,
      correctAnswers: [],
      explanation: "Requirements coverage quantifies how thoroughly requirements are tested."
    },
    {
      id: 14,
      chapter: "Test Techniques",
      type: "single",
      question: "Which is a non-functional test?",
      options: [
        "Testing menu options",
        "Testing calculation results",
        "Testing response times",
        "Testing boundary values"
      ],
      correctAnswer: 2,
      correctAnswers: [],
      explanation: "Performance testing evaluates system characteristics like speed and scalability."
    },
    {
      id: 15,
      chapter: "Test Tools",
      type: "single",
      question: "Which tool detects memory leaks?",
      options: [
        "Coverage tool",
        "Static analyzer",
        "Dynamic analyzer",
        "Test comparator"
      ],
      correctAnswer: 2,
      correctAnswers: [],
      explanation: "Dynamic analysis tools monitor runtime behavior including memory allocation."
    },
    {
      id: 16,
      chapter: "Test Management",
      type: "single",
      question: "Which is a standard for software testing?",
      options: [
        "ISO 9000",
        "ISO 9126",
        "IEEE 829",
        "BS 7925-2"
      ],
      correctAnswer: 3,
      correctAnswers: [],
      explanation: "BS 7925-2 specifically addresses software component testing standards."
    },
    {
      id: 17,
      chapter: "Test Techniques",
      type: "single",
      question: "Which test design technique uses boundary value analysis?",
      options: [
        "Specification-based",
        "Structure-based",
        "Experience-based",
        "Fault-based"
      ],
      correctAnswer: 0,
      correctAnswers: [],
      explanation: "Boundary analysis derives tests from specification boundaries."
    },
    {
      id: 18,
      chapter: "Testing Throughout the SDLC",
      type: "single",
      question: "Which is a static testing technique?",
      options: [
        "Control flow analysis",
        "Decision table testing",
        "Exploratory testing",
        "Use case testing"
      ],
      correctAnswer: 0,
      correctAnswers: [],
      explanation: "Static analysis examines code without execution."
    },
    {
      id: 19,
      chapter: "Test Techniques",
      type: "single",
      question: "Which is a form of logic coverage?",
      options: [
        "Statement coverage",
        "Path coverage",
        "Decision coverage",
        "Boundary value coverage"
      ],
      correctAnswer: 2,
      correctAnswers: [],
      explanation: "Decision coverage measures boolean expression evaluation completeness."
    },
    {
      id: 20,
      chapter: "Test Management",
      type: "single",
      question: "Which ISO 9126 characteristic covers maintainability?",
      options: [
        "Functionality",
        "Reliability",
        "Efficiency",
        "Maintainability"
      ],
      correctAnswer: 3,
      correctAnswers: [],
      explanation: "Maintainability directly addresses modifiability characteristics."
    },
    {
      id: 21,
      chapter: "Test Tools",
      type: "single",
      question: "What replaces components called by the test object?",
      options: [
        "Driver",
        "Stub",
        "Emulator",
        "Simulator"
      ],
      correctAnswer: 1,
      correctAnswers: [],
      explanation: "Stubs simulate called components during integration testing."
    },
    {
      id: 22,
      chapter: "Test Management",
      type: "single",
      question: "What is the basis for acceptance test cases?",
      options: [
        "Technical specifications",
        "Business requirements",
        "Code structure",
        "Test strategy"
      ],
      correctAnswer: 1,
      correctAnswers: [],
      explanation: "Acceptance testing validates fitness for purpose from business perspective."
    },
    {
      id: 23,
      chapter: "Fundamentals of Testing",
      type: "single",
      question: "Which is a key testing principle?",
      options: [
        "Testing can prove absence of defects",
        "Exhaustive testing is possible",
        "Testing is context-dependent",
        "Defects cluster in untested code"
      ],
      correctAnswer: 2,
      correctAnswers: [],
      explanation: "Testing approaches vary based on system type and risk factors."
    },
    {
      id: 24,
      chapter: "Test Techniques",
      type: "single",
      question: "Which technique uses invalid inputs?",
      options: [
        "Equivalence partitioning",
        "Boundary value analysis",
        "Decision tables",
        "State transition"
      ],
      correctAnswer: 0,
      correctAnswers: [],
      explanation: "Equivalence partitioning includes invalid input classes."
    },
    {
      id: 25,
      chapter: "Test Management",
      type: "single",
      question: "Which is a regression test strategy?",
      options: [
        "Test all affected areas",
        "Test only new functionality",
        "Test everything",
        "Test based on risk"
      ],
      correctAnswer: 3,
      correctAnswers: [],
      explanation: "Risk-based regression prioritizes tests by business impact."
    },
    {
      id: 26,
      chapter: "Test Techniques",
      type: "single",
      question: "Which is structure-based testing?",
      options: [
        "Equivalence partitioning",
        "Boundary value analysis",
        "Statement coverage",
        "Decision tables"
      ],
      correctAnswer: 2,
      correctAnswers: [],
      explanation: "Code coverage metrics require internal structure knowledge."
    },
    {
      id: 27,
      chapter: "Testing Throughout the SDLC",
      type: "single",
      question: "When should test planning begin?",
      options: [
        "After coding starts",
        "During test execution",
        "At project inception",
        "After requirements approval"
      ],
      correctAnswer: 2,
      correctAnswers: [],
      explanation: "Test planning should align with overall project planning phases."
    },
    {
      id: 28,
      chapter: "Test Management",
      type: "single",
      question: "Which metric measures test effectiveness?",
      options: [
        "Test cases designed/hour",
        "Defects found/test hour",
        "Percentage of passed tests",
        "Requirements coverage"
      ],
      correctAnswer: 1,
      correctAnswers: [],
      explanation: "Defect detection efficiency indicates test suite effectiveness."
    },
    {
      id: 29,
      chapter: "Test Techniques",
      type: "single",
      question: "Which technique tests combinations?",
      options: [
        "Boundary value",
        "Decision tables",
        "Equivalence partitioning",
        "State transition"
      ],
      correctAnswer: 1,
      correctAnswers: [],
      explanation: "Decision tables systematically combine input conditions."
    },
    {
      id: 30,
      chapter: "Test Management",
      type: "single",
      question: "What is a key test closure activity?",
      options: [
        "Writing test cases",
        "Executing tests",
        "Archiving testware",
        "Reporting defects"
      ],
      correctAnswer: 2,
      correctAnswers: [],
      explanation: "Test closure includes preserving assets for future projects."
    },
    {
      id: 31,
      chapter: "Fundamentals of Testing",
      type: "single",
      question: "Which is a test objective?",
      options: [
        "Prevent defects",
        "Fix defects",
        "Prove correctness",
        "Reduce development time"
      ],
      correctAnswer: 0,
      correctAnswers: [],
      explanation: "Early testing prevents defect propagation."
    },
    {
      id: 32,
      chapter: "Test Techniques",
      type: "single",
      question: "Which technique uses state diagrams?",
      options: [
        "Equivalence partitioning",
        "Boundary value analysis",
        "State transition",
        "Decision tables"
      ],
      correctAnswer: 2,
      correctAnswers: [],
      explanation: "State transition testing models system behavior changes."
    },
    {
      id: 33,
      chapter: "Test Management",
      type: "single",
      question: "Which is a test control activity?",
      options: [
        "Writing test plans",
        "Prioritizing tests",
        "Designing test cases",
        "Reporting test status"
      ],
      correctAnswer: 3,
      correctAnswers: [],
      explanation: "Test control involves monitoring and reporting progress."
    },
    {
      id: 34,
      chapter: "Testing Throughout the SDLC",
      type: "single",
      question: "Which review type is most formal?",
      options: [
        "Walkthrough",
        "Technical review",
        "Inspection",
        "Peer review"
      ],
      correctAnswer: 2,
      correctAnswers: [],
      explanation: "Inspections follow rigorous defect detection processes."
    },
    {
      id: 35,
      chapter: "Test Tools",
      type: "single",
      question: "Which tool supports test execution?",
      options: [
        "Requirements management",
        "Test data preparation",
        "Test harness",
        "Coverage measurement"
      ],
      correctAnswer: 2,
      correctAnswers: [],
      explanation: "Test harnesses provide execution environments for components."
    },
    {
      id: 36,
      chapter: "Test Techniques",
      type: "single",
      question: "Which technique uses input partitions?",
      options: [
        "Statement coverage",
        "Equivalence partitioning",
        "Decision coverage",
        "Condition coverage"
      ],
      correctAnswer: 1,
      correctAnswers: [],
      explanation: "Equivalence partitioning groups similar input values."
    },
    {
      id: 37,
      chapter: "Test Management",
      type: "single",
      question: "Which is a test estimation technique?",
      options: [
        "Boundary value analysis",
        "Equivalence partitioning",
        "Metrics-based",
        "State transition"
      ],
      correctAnswer: 2,
      correctAnswers: [],
      explanation: "Estimation uses historical metrics like test case productivity."
    },
    {
      id: 38,
      chapter: "Fundamentals of Testing",
      type: "single",
      question: "Which testing principle is correct?",
      options: [
        "Testing eliminates defects",
        "Testing reduces failure probability",
        "Testing proves correctness",
        "Exhaustive testing is achievable"
      ],
      correctAnswer: 1,
      correctAnswers: [],
      explanation: "Testing reduces but doesn't eliminate failure risks."
    },
    {
      id: 39,
      chapter: "Test Techniques",
      type: "single",
      question: "Which technique tests invalid boundaries?",
      options: [
        "Equivalence partitioning",
        "Boundary value analysis",
        "Decision tables",
        "State transition"
      ],
      correctAnswer: 1,
      correctAnswers: [],
      explanation: "Boundary analysis includes values immediately outside valid ranges."
    },
    {
      id: 40,
      chapter: "Test Management",
      type: "single",
      question: "Which factor influences test effort most?",
      options: [
        "Team experience",
        "Defect density",
        "Project schedule",
        "Test tools used"
      ],
      correctAnswer: 1,
      correctAnswers: [],
      explanation: "Higher defect density requires more test execution and retesting cycles."
    }
  
  
  
]





