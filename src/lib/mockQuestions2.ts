export const mockQuestions2=[
  
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
      explanation: "Component testing is typically performed by testers"
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
