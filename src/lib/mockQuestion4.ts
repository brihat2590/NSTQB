export const mockQuestions4=[
    {
      id: 1,
      chapter: "Fundamentals of Testing",
      type: "single",
      question: "Which of the following statements describe a valid test objective?",
      options: [
        "To prove that there are no unfixed defects in the system under test",
        "To prove that there will be no failures after the implementation of the system into production",
        "To reduce the risk level of the test object and to build confidence in the quality level",
        "To verify that there are no untested combinations of inputs"
      ],
      correctAnswer: 2,
      correctAnswers: [],
      explanation: "A valid test objective is to reduce risk and build confidence in quality, not to prove the absence of defects or failures."
    },
    {
      id: 2,
      chapter: "Fundamentals of Testing",
      type: "single",
      question: "Which of the following options shows an example of test activities that contribute to success?",
      options: [
        "Having testers involved during various software development lifecycle (SDLC) activities will help to detect defects in work products",
        "Testers try not to disturb the developers while coding, so that the developers write better code",
        "Testers collaborating with end users help to improve the quality of defect reports during component integration and system testing",
        "Certified testers will design much better test cases than non-certified testers"
      ],
      correctAnswer: 0,
      correctAnswers: [],
      explanation: "Early involvement of testers in SDLC activities helps detect defects early and contributes to project success."
    },
    {
      id: 3,
      chapter: "Fundamentals of Testing",
      type: "single",
      question: "You have been assigned as a tester to a team producing a new system incrementally. You have noticed that no changes have been made to the existing regression test cases for several iterations and no new regression defects were identified. Your manager is happy, but you are not. Which testing principle explains your skepticism?",
      options: [
        "Tests wear out",
        "Absence-of-defects fallacy",
        "Defects cluster together",
        "Exhaustive testing is impossible"
      ],
      correctAnswer: 0,
      correctAnswers: [],
      explanation: "'Tests wear out' means that unchanged tests may become less effective over time as the system evolves."
    },
    {
      id: 4,
      chapter: "Test Analysis",
      type: "single",
      question: "You work in a team that develops a mobile application for food ordering. In the current iteration the team decided to implement the payment functionality. Which of the following activities is a part of test analysis?",
      options: [
        "Estimating that testing the integration with the payment service will take 8 person-days",
        "Deciding that the team should test if it is possible to properly share payment between many users",
        "Using boundary value analysis (BVA) to derive the test data for the test cases that check the correct payment processing for the minimum allowed amount to be paid",
        "Analyzing the discrepancy between the actual result and expected result after executing a test case that checks the process of payment with a credit card, and reporting a defect"
      ],
      correctAnswer: 2,
      correctAnswers: [],
      explanation: "Using BVA to derive test data is a typical test analysis activity."
    },
    {
      id: 5,
      chapter: "Test Approaches",
      type: "single",
      question: "Which of the following factors have a SIGNIFICANT influence on the test approach?",
      options: [
        "i, ii have significant influence",
        "i, iii, iv have significant influence",
        "ii, iv, v have significant influence",
        "iii, v have significant influence"
      ],
      correctAnswer: 1,
      correctAnswers: [],
      explanation: "The SDLC, identified product risks, and new regulatory requirements forcing formal white-box testing significantly influence the test approach."
    },
    {
      id: 6,
      chapter: "Testing Roles",
      type: "multiple",
      question: "Which TWO of the following tasks belong MAINLY to a testing role?",
      options: [
        "Configure test environments",
        "Maintain the product backlog",
        "Design solutions to new requirements",
        "Create the test plan",
        "Analyze the test basis"
      ],
      correctAnswer: -1,
      correctAnswers: [0, 4],
      explanation: "Configuring test environments and analyzing the test basis are mainly testing responsibilities."
    },
    {
      id: 7,
      chapter: "Tester Skills",
      type: "single",
      question: "Which of the following skills (i-v) are the MOST important skills of a tester?",
      options: [
        "ii and iv are important",
        "i, iii and v are important",
        "i, ii and v are important",
        "iii and iv are important"
      ],
      correctAnswer: 1,
      correctAnswers: [],
      explanation: "Domain knowledge, being a good team player, and critical thinking are most important for testers."
    },
    {
      id: 8,
      chapter: "Team Collaboration",
      type: "single",
      question: "How is the whole team approach present in the interactions between testers and business representatives?",
      options: [
        "Business representatives decide on test automation approaches",
        "Testers help business representatives to define a test strategy",
        "Business representatives are not part of the whole team approach",
        "Testers help business representatives to create suitable acceptance tests"
      ],
      correctAnswer: 3,
      correctAnswers: [],
      explanation: "Testers assisting business representatives in creating acceptance tests exemplifies the whole team approach."
    },
    {
      id: 9,
      chapter: "SDLC and Testing",
      type: "single",
      question: "Consider the following rule: “for every SDLC activity there is a corresponding test activity”. In which SDLC models does this rule hold?",
      options: [
        "Only in sequential development models",
        "Only in iterative development models",
        "Only in iterative and incremental development models",
        "In sequential, incremental, and iterative development models"
      ],
      correctAnswer: 3,
      correctAnswers: [],
      explanation: "The rule applies to sequential, incremental, and iterative development models."
    },
    {
      id: 10,
      chapter: "ATDD",
      type: "single",
      question: "Which of the following statements BEST describes the acceptance test-driven development (ATDD) approach?",
      options: [
        "In ATDD, acceptance criteria are typically created based on the given/when/then format",
        "In ATDD, test cases are mainly created at component testing and are code-oriented",
        "In ATDD, tests are created, based on acceptance criteria to drive the development of the related software",
        "in ATDD, tests are based on the desired behavior of the software, which makes it easier for team members to understand them"
      ],
      correctAnswer: 2,
      correctAnswers: [],
      explanation: "ATDD uses acceptance criteria to create tests that drive software development."
    },
    {
      id: 11,
      chapter: "Shift-Left Testing",
      type: "single",
      question: "Which of the following is NOT an example of the shift-left approach?",
      options: [
        "Reviewing the user requirements before they are formally accepted by the stakeholders",
        "Writing a component test before the corresponding code is written",
        "Executing a performance efficiency test for a component during component testing",
        "Writing a test script before setting up the configuration management process"
      ],
      correctAnswer: 2,
      correctAnswers: [],
      explanation: "Executing a performance efficiency test during component testing is not an example of shift-left testing."
    },
    {
      id: 12,
      chapter: "Process Improvement",
      type: "single",
      question: "Which of the arguments below would you use to convince your manager to organize retrospectives at the end of each release cycle?",
      options: [
        "Retrospectives are very popular these days and clients would appreciate it if we added them to our processes",
        "Organizing retrospectives will save the organization money because without them end user representatives do not provide immediate feedback about the product",
        "Process weaknesses identified during the retrospective can be analyzed and serve as a to do list for the organization’s continuous process improvement program",
        "Retrospectives embrace five values including courage and respect, which are crucial to maintain continuous improvement in the organization"
      ],
      correctAnswer: 2,
      correctAnswers: [],
      explanation: "Retrospectives help identify process weaknesses and support continuous improvement."
    },
    {
      id: 13,
      chapter: "Test Levels",
      type: "single",
      question: "Which types of failures (1-4) fit which test levels (A-D) BEST?",
      options: [
        "1D, 2B, 3A, 4C",
        "1D, 2B, 3C, 4A",
        "1B, 2A, 3D, 4C",
        "1C, 2B, 3A, 4D"
      ],
      correctAnswer: 0,
      correctAnswers: [],
      explanation: "Failures in system behavior (D), communication between components (B), logic in code (A), and business rules (C) best fit the respective test levels."
    },
    {
      id: 14,
      chapter: "Regression Testing",
      type: "single",
      question: "Which of the above tests are executed as regression tests?",
      options: [
        "Only 4, 7, 8, 9",
        "Only 5, 7",
        "Only 4, 6, 8, 9",
        "Only 5, 6"
      ],
      correctAnswer: 0,
      correctAnswers: [],
      explanation: "Regression tests are those repeated after defects are fixed and a new version is available."
    },
    {
      id: 15,
      chapter: "Static Testing",
      type: "single",
      question: "Which of the following is NOT a benefit of static testing?",
      options: [
        "Having less expensive defect management due to the ease of detecting defects later in the SDLC",
        "Fixing defects found during static testing is generally much less expensive than fixing defects found during dynamic testing",
        "Finding coding defects that might not have been found by only performing dynamic testing",
        "Detecting gaps and inconsistencies in requirements"
      ],
      correctAnswer: 0,
      correctAnswers: [],
      explanation: "Static testing helps find defects early, not later in the SDLC."
    },
    {
      id: 16,
      chapter: "Feedback",
      type: "single",
      question: "Which of the following is a benefit of early and frequent feedback?",
      options: [
        "It improves the test process for future projects",
        "It forces customers to prioritize their requirements based on agreed risks",
        "It provides a measure for the quality of changes",
        "It helps avoid requirements misunderstandings"
      ],
      correctAnswer: 3,
      correctAnswers: [],
      explanation: "Early and frequent feedback helps avoid misunderstandings in requirements."
    },
    {
      id: 17,
      chapter: "Reviews",
      type: "single",
      question: "The reviews being used in your organization have the following attributes: There is the role of a scribe, the main purpose is to evaluate quality, the meeting is led by the author of the work product, there is individual preparation, and a review report is produced. Which of the following review types is MOST likely being used?",
      options: [
        "Informal review",
        "Walkthrough",
        "Technical review",
        "Inspection"
      ],
      correctAnswer: 1,
      correctAnswers: [],
      explanation: "A walkthrough is characterized by the author leading the review and producing a report."
    },
    {
      id: 18,
      chapter: "Reviews",
      type: "single",
      question: "Which of these statements is NOT a factor that contributes to successful reviews?",
      options: [
        "Participants should dedicate adequate time for the review",
        "Splitting large work products into small parts to make the required effort less intense",
        "Participants should avoid behaviors that might indicate boredom, exasperation, or hostility to other participants",
        "Failures found should be acknowledged, appreciated, and handled objectively"
      ],
      correctAnswer: 1,
      correctAnswers: [],
      explanation: "Splitting large work products into small parts is a technique, not a contributing factor to review success."
    },
    {
      id: 19,
      chapter: "Test Techniques",
      type: "single",
      question: "Which of the following is a characteristic of experience-based test techniques?",
      options: [
        "Test cases are created based on detailed design information",
        "Items tested within the interface code section are used to measure coverage",
        "The test techniques heavily rely on the tester’s knowledge of the software and the business domain",
        "The test cases are used to identify deviations from the requirements"
      ],
      correctAnswer: 2,
      correctAnswers: [],
      explanation: "Experience-based techniques rely on the tester's knowledge and experience."
    },
    {
      id: 20,
      chapter: "Equivalence Partitioning",
      type: "single",
      question: "You are testing a simplified apartment search form which has only two search criteria: floor and garden type. Each apartment on the ground floor has a garden; apartments on higher floors don’t. What is the minimal number of test cases to achieve 100% EP coverage for valid partitions?",
      options: [
        "3",
        "4",
        "5",
        "6"
      ],
      correctAnswer: 1,
      correctAnswers: [],
      explanation: "Four test cases are needed to cover each valid partition for both criteria."
    },
    {
      id: 21,
      chapter: "Boundary Value Analysis",
      type: "single",
      question: "What is the 2-value boundary value analysis (BVA) coverage for the final result that is achieved with the existing test cases?",
      options: [
        "50%",
        "60%",
        "33.3%",
        "100%"
      ],
      correctAnswer: 3,
      correctAnswers: [],
      explanation: "All boundaries are covered, achieving 100% BVA coverage."
    },
    {
      id: 22,
      chapter: "Decision Tables",
      type: "single",
      question: "Based ONLY on the feature description of the Customer Relationship Management system, which of the above rules describes an impossible situation?",
      options: [
        "R4",
        "R2",
        "R6",
        "R8"
      ],
      correctAnswer: 2,
      correctAnswers: [],
      explanation: "R6 describes a non-member receiving a gift, which is not possible based on the rules."
    },
    {
      id: 23,
      chapter: "State Transition Testing",
      type: "single",
      question: "You test a system whose lifecycle is modeled by the state transition diagram. What is the MINIMAL number of test cases to achieve valid transitions coverage?",
      options: [
        "4",
        "2",
        "7",
        "3"
      ],
      correctAnswer: 0,
      correctAnswers: [],
      explanation: "Four test cases are required to cover all valid transitions."
    },
    {
      id: 24,
      chapter: "Code Coverage",
      type: "single",
      question: "Your test suite achieved 100% statement coverage. What is the consequence of this fact?",
      options: [
        "Each instruction in the code that contains a defect has been executed at least once",
        "Any test suite containing more test cases than your test suite will also achieve 100% statement coverage",
        "Each path in the code has been executed at least once",
        "Every combination of input values has been tested at least once"
      ],
      correctAnswer: 0,
      correctAnswers: [],
      explanation: "100% statement coverage means every instruction was executed at least once."
    },
    {
      id: 25,
      chapter: "White-Box Testing",
      type: "single",
      question: "Which of the following is NOT true for white-box testing?",
      options: [
        "During white-box testing the entire software implementation is considered",
        "White-box coverage metrics can help identify additional tests to increase code coverage",
        "White-box test techniques can be used in static testing",
        "White-box testing can help identify gaps in requirements implementation"
      ],
      correctAnswer: 2,
      correctAnswers: [],
      explanation: "White-box techniques are not used in static testing, which is not code-executing."
    },
    {
      id: 26,
      chapter: "Test Techniques",
      type: "single",
      question: "Which of the following BEST describes the concept behind error guessing?",
      options: [
        "Error guessing involves using your knowledge and experience of defects found in the past and typical errors made by developers",
        "Error guessing involves using your personal experience of development and the errors you made as a developer",
        "Error guessing requires you to imagine that you are the user of the test object and to guess errors the user could make interacting with it",
        "Error guessing requires you to rapidly duplicate the development task to identify the sort of errors a developer might make"
      ],
      correctAnswer: 0,
      correctAnswers: [],
      explanation: "Error guessing is based on knowledge and experience of past defects and common mistakes."
    },
    {
      id: 27,
      chapter: "Test Techniques",
      type: "single",
      question: "In your project there has been a delay in the release of a brand-new application and test execution started late, but you have very detailed domain knowledge and good analytical skills. The full list of requirements has not yet been shared with the team, but management is asking for some test results to be presented. Which test technique fits BEST in this situation?",
      options: [
        "Checklist-based testing",
        "Error guessing",
        "Exploratory testing",
        "Branch testing"
      ],
      correctAnswer: 2,
      correctAnswers: [],
      explanation: "Exploratory testing is best when requirements are incomplete and testers have strong domain knowledge."
    }
  ]
  