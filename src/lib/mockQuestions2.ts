export const mockQuestions2 = [
    {
      id: 1,
      type: "single",
      question: "Which of the following provides the BEST description of a test case?",
      options: [
        "A document specifying a sequence of actions for the execution of a test. Also known as test script or manual test script.",
        "A set of input values and expected results, with execution preconditions and execution postconditions, developed for a particular test condition.",
        "An attribute of a system specified by requirements documentation (for example reliability, usability or design constraints) that is executed in a test.",
        "An item or event of a system that could be verified by one or more test conditions, e.g., a function, transaction, feature, quality attribute, or structural element."
      ],
      correctAnswer: 1,
      correctAnswers: [],
      explanation: "A test case is defined as a set of inputs, execution conditions, and expected results developed for a specific test objective or condition. It validates specific behaviors or requirements of the system under test."
    },
    {
      id: 2,
      type: "single",
      question: "Which of the following is a major objective of testing?",
      options: [
        "To prevent defects.",
        "To validate the project plan works as required.",
        "To gain confidence in the development team.",
        "To make release decisions for the system under test."
      ],
      correctAnswer: 0,
      correctAnswers: [],
      explanation: "Testing aims to prevent defects by identifying issues early in the development lifecycle, such as during requirements or design reviews, reducing the cost and effort of fixing them later."
    },
    {
      id: 3,
      type: "single",
      question: "Which of the following statements correctly describes the difference between testing and debugging?",
      options: [
        "Testing identifies the source of defects; debugging analyzes the defects and proposes prevention activities.",
        "Dynamic testing shows failures caused by defects; debugging finds, analyzes, and removes the causes of failures in the software.",
        "Testing removes defects; debugging identifies the causes of failures.",
        "Dynamic testing prevents the causes of failures; debugging removes the failures."
      ],
      correctAnswer: 1,
      correctAnswers: [],
      explanation: "Testing (especially dynamic testing) reveals failures resulting from defects, while debugging is a development activity focused on locating, analyzing, and fixing the root causes of those failures."
    },
    {
      id: 4,
      type: "single",
      question: "Which one of the statements below describes the most common situation for a failure discovered during testing or in production?",
      options: [
        "The product crashed when the user selected an option in a dialog box.",
        "The wrong version of a compiled source code file was included in the build.",
        "The computation algorithm used the wrong input variables.",
        "The developer misinterpreted the requirement for the algorithm."
      ],
      correctAnswer: 0,
      correctAnswers: [],
      explanation: "A failure is an observable deviation from expected behavior (e.g., a crash). This is the most direct manifestation users encounter, unlike underlying defects like code errors or misinterpretations."
    },
    {
      id: 5,
      type: "single",
      question: "As a result of risk analysis, more testing is being directed to those areas of the system under test where initial testing found more defects than average. Which of the following testing principles is being applied?",
      options: [
        "Beware of the pesticide paradox.",
        "Testing is context dependent.",
        "Absence-of-errors is a fallacy.",
        "Defects cluster together."
      ],
      correctAnswer: 3,
      correctAnswers: [],
      explanation: "The principle 'Defects cluster together' states that defects tend to aggregate in specific modules or areas. Focusing testing on these high-yield areas improves efficiency."
    },
    {
      id: 6,
      type: "single",
      question: "In what way can testing be part of Quality Assurance?",
      options: [
        "It ensures that requirements are detailed enough.",
        "It contributes to the achievement of quality in a variety of ways.",
        "It ensures that standards in the organization are followed.",
        "It measures the quality of software in terms of number of executed test cases."
      ],
      correctAnswer: 1,
      correctAnswers: [],
      explanation: "Testing supports Quality Assurance by providing feedback on quality, identifying defects for improvement, verifying compliance, and ensuring the product meets stakeholder needs."
    },
    {
      id: 7,
      type: "single",
      question: "Which of the following BEST describes how value is added by maintaining traceability between the test basis and test artifacts?",
      options: [
        "Maintenance testing can be fully automated based on changes to the initial requirements.",
        "It is possible to determine if a new test case has increased coverage of the requirements.",
        "Test managers can identify which testers found the highest severity defects.",
        "Areas that may be impacted by side-effects of a change can be targeted by confirmation testing."
      ],
      correctAnswer: 1,
      correctAnswers: [],
      explanation: "Traceability links tests to requirements, enabling clear visibility of coverage. This allows assessment of whether new tests enhance requirement coverage and identifies gaps."
    },
    {
      id: 8,
      type: "single",
      question: "Which of the following qualities is MORE likely to be found in a tester\u2019s mindset rather than in a developer\u2019s?",
      options: [
        "Experience on which to base their efforts.",
        "Ability to see what might go wrong.",
        "Good communication with team members.",
        "Attention to detail."
      ],
      correctAnswer: 1,
      correctAnswers: [],
      explanation: "Testers cultivate 'professional pessimism'—a focus on anticipating failures, edge cases, and potential weaknesses, whereas developers often prioritize building and creating functionality."
    },
    {
      id: 9,
      type: "single",
      question: "Given the following statements about the relationships between software development activities and test activities in the software development lifecycle:\n1. Each development activity should have a corresponding testing activity.\n2. Reviewing should start as soon as final versions of documents become available.\n3. The design and implementation of tests should start during the corresponding development activity\n4. Testing activities should start in the early stages of the software development lifecycle.\nWhich of the following CORRECTLY shows which are true and false?",
      options: [
        "True \u2013 1, 2; False \u2013 3, 4",
        "True \u2013 2, 3; False \u2013 1, 2",
        "True \u2013 1, 2, 4; False \u2013 3",
        "True \u2013 1, 4; False \u2013 2, 3"
      ],
      correctAnswer: 3,
      correctAnswers: [],
      explanation: "Statement 1 (testing parallels development) and 4 (early testing) are true. Statement 2 is false because reviews should start on drafts, not final versions. Statement 3 is false because test implementation (e.g., scripting) often occurs after development, though design starts early."
    },
    {
      id: 10,
      type: "single",
      question: "Given that the testing being performed has the following attributes:\nbased on interface specifications; focused on finding failures in communication; the test approach uses both functional and structural test types. Which of the following test levels is MOST likely being performed?",
      options: [
        "Component integration testing.",
        "Acceptance testing.",
        "System testing.",
        "Component testing."
      ],
      correctAnswer: 0,
      correctAnswers: [],
      explanation: "Component integration testing verifies interactions between components via interfaces, often using functional (interface specs) and structural (code paths) techniques to find communication failures."
    },
    {
      id: 11,
      type: "single",
      question: "Which of the following statements about test types and test levels is CORRECT?",
      options: [
        "Functional and non-functional testing can be performed at system and acceptance test levels, while white-box testing is restricted to component and integration testing.",
        "Functional testing can be performed at any test level, while white-box testing is restricted to component testing.",
        "It is possible to perform functional, non-functional and white-box testing at any test level.",
        "Functional and non-functional testing can be performed at any test level, while white-box testing is restricted to component and integration testing."
      ],
      correctAnswer: 2,
      correctAnswers: [],
      explanation: "Functional, non-functional, and white-box (structural) testing techniques can be applied at any test level (component, integration, system, acceptance), depending on context and objectives."
    },
    {
      id: 12,
      type: "single",
      question: "Which of the following statements BEST compares the purposes of confirmation testing and regression testing?",
      options: [
        "The purpose of regression testing is to ensure that all previously run tests still work correctly, while the purpose of confirmation testing is to ensure that any fixes made to one part of the system have not adversely affected other parts.",
        "The purpose of confirmation testing is to check that a previously found defect has been fixed, while the purpose of regression testing is to ensure that no other parts of the system have been adversely affected by the fix.",
        "The purpose of regression testing is to ensure that any changes to one part of the system have not caused another part to fail, while the purpose of confirmation testing is to check that all previously run tests still provide the same results as before.",
        "The purpose of confirmation testing is to confirm that changes to the system were made successfully, while the purpose of regression testing is to run tests that previously failed to ensure that they now work correctly."
      ],
      correctAnswer: 1,
      correctAnswers: [],
      explanation: "Confirmation testing (re-testing) verifies a specific fix. Regression testing checks for unintended side-effects in other areas due to changes, ensuring existing functionality remains intact."
    },
    {
      id: 13,
      type: "single",
      question: "Which of the following statements CORRECTLY describes a role of impact analysis in Maintenance Testing?",
      options: [
        "Impact analysis is used when deciding if a fix to a maintained system is worthwhile.",
        "Impact analysis is used to identify how data should be migrated into the maintained system.",
        "Impact analysis is used to decide which hot fixes are of most value to the user.",
        "Impact analysis is used to determine the effectiveness of new maintenance test cases."
      ],
      correctAnswer: 0,
      correctAnswers: [],
      explanation: "Impact analysis assesses the scope, cost, and risk of changes in maintenance. It helps decide whether a fix is justified by weighing benefits against potential disruptions and testing effort."
    },
    {
      id: 14,
      type: "single",
      question: "Which of the following statements CORRECTLY reflects the value of static testing?",
      options: [
        "By introducing reviews, we have found that both the quality of specifications and the time required for development and testing have increased.",
        "Using static testing means we have better control and cheaper defect management due to the ease of removing defects later in the life cycle.",
        "Now that we require the use of static analysis, missed requirements have decreased and communication between testers and developers has improved.",
        "Since we started using static analysis, we find coding defects that might have not been found by performing only dynamic testing."
      ],
      correctAnswer: 3,
      correctAnswers: [],
      explanation: "Static analysis tools detect code defects (e.g., security vulnerabilities, syntax errors) early without execution. These might escape dynamic testing, especially complex or rarely executed paths."
    },
    {
      id: 15,
      type: "single",
      question: "Which of the following sequences BEST shows the main activities of the work product review process?",
      options: [
        "Initiate review \u2013 Reviewer selection \u2013 Individual review \u2013 Issue communication and analysis \u2013 Rework",
        "Planning & preparation \u2013 Overview meeting \u2013 Individual review \u2013 Fix\u2013 Report",
        "Preparation \u2013 Issue Detection \u2013 Issue communication and analysis \u2013 Rework \u2013 Report",
        "Plan \u2013 Initiate review \u2013 Individual review \u2013 Issue communication and analysis \u2013 Fix defects & report"
      ],
      correctAnswer: 3,
      correctAnswers: [],
      explanation: "The standard formal review process flows: Planning (scope, resources), Initiate Review (kick-off), Individual Review (preparation), Issue Communication/Analysis (meeting/discussion), Fixing & Reporting (correct defects and document outcomes)."
    },
    {
      id: 16,
      type: "single",
      question: "Which of the following CORRECTLY matches the roles and responsibilities in a formal review?",
      options: [
        "Manager \u2013 Decides on the execution of reviews",
        "Review Leader - Ensures effective running of review meetings",
        "Scribe \u2013 Fixes defects in the work product under review",
        "Moderator \u2013 Monitors ongoing cost-effectiveness"
      ],
      correctAnswer: 0,
      correctAnswers: [],
      explanation: "The Manager role approves review execution, allocates resources, and defines policies. The Review Leader (or Moderator) manages meetings, while the Scribe records issues (doesn't fix them)."
    },
    {
      id: 17,
      type: "single",
      question: "The reviews being used in your organization have the following attributes:\nThere is a role of a scribe\nThe purpose is to detect potential defects\nThe review meeting is led by the author\nReviewers find potential defects by individual review\nA review report is produced\nWhich of the following review types is MOST likely being used?",
      options: [
        "Informal Review",
        "Walkthrough",
        "Technical Review",
        "Inspection"
      ],
      correctAnswer: 1,
      correctAnswers: [],
      explanation: "Walkthroughs are led by the author, involve individual preparation by reviewers, use a scribe, focus on defect detection, and produce a report. They are less formal than inspections."
    },
    {
      id: 18,
      type: "single",
      question: "You have been asked to take part in a checklist-based review of the following excerpt from the requirements specification for a library system:\nLibrarians can:\n1. Register new borrowers.\n2. Return books from borrowers.\n3. Accept fines from borrowers.\n4. Add new books to the system with their ISBN, author and title.\n5. Remove books from the system.\n6. Get system responses within 5 seconds.\nBorrowers can:\n7. Borrow a maximum of 3 books at one time.\n8. View the history of books they have borrowed/reserved.\n9. Be fined for failing to return a book within 3 weeks.\n10. Get system responses within 3 seconds.\n11. Borrow a book at no cost for a maximum of 4 weeks.\n12. Reserve books (if they are on-loan).\nAll users (librarians and borrowers):\n13. Can search for books by ISBN, author, or title.\n14. Can browse the system catalogue.\n15. The system shall respond to user requests within 3 seconds.\n16. The user interface shall be easy-to-use.\nYou have been assigned the checklist entry that requires you to review the specification for inconsistencies between individual requirements (i.e. conflicts between requirements).\nWhich of the following CORRECTLY identifies inconsistencies between pairs of requirements?",
      options: [
        "6-10, 6-15, 7-12",
        "6-15, 9-11",
        "6-10, 6-15, 9-11",
        "6-15, 7-12"
      ],
      correctAnswer: 1,
      correctAnswers: [],
      explanation: "Inconsistencies: 6 (librarians: 5s response) vs 15 (all users: 3s response); 9 (fine after 3 weeks) vs 11 (free borrowing for 4 weeks). Pairs 6-15 and 9-11 conflict."
    },
    {
      id: 19,
      type: "single",
      question: "Which of the following provides the BEST description of exploratory testing?",
      options: [
        "A testing practice in which an in-depth investigation of the background of the test object is used to identify potential weaknesses that are examined by test cases.",
        "An approach to testing whereby the testers dynamically design and execute tests based on their knowledge, exploration of the test item and the results of previous tests.",
        "An approach to test design in which test activities are planned as uninterrupted sessions of test analysis and design, often used in conjunction with checklist-based testing.",
        "Testing based on the tester's experience, knowledge and intuition."
      ],
      correctAnswer: 1,
      correctAnswers: [],
      explanation: "Exploratory testing combines concurrent test design, execution, and learning. Testers adapt in real-time using their skills, prior results, and interactions with the system, without predefined scripts."
    },
    {
      id: 20,
      type: "single",
      question: "Which of the following BEST matches the descriptions with the different categories of test techniques?\na1. Coverage is measured based on a selected structure of the test object.\n2. The processing within the test object is checked.\n3. Tests are based on defects' likelihood and their distribution.\n4. Deviations from the requirements are checked.\n5. User stories are used as the test basis.\nBlack - Black-box test techniques\nWhite - White-box test techniques\nExperience - Experience-based test techniques",
      options: [
        "Black \u2013 4, 5 White \u2013 1, 2 Experience \u2013 3",
        "Black \u2013 3 White \u2013 1, 2 Experience \u2013 4, 5",
        "Black \u2013 4 White \u2013 1, 2 Experience \u2013 3, 5",
        "Black \u2013 1, 3, 5 White \u2013 2 Experience \u2013 4"
      ],
      correctAnswer: 0,
      correctAnswers: [],
      explanation: "Black-box (4,5): Checks requirements (4) and uses user stories (5). White-box (1,2): Measures structural coverage (1) and examines internal processing (2). Experience-based (3): Leverages defect patterns (3)."
    },
    {
      id: 21,
      type: "single",
      question: "A fitness app measures the number of steps that are walked each day and provides feedback to encourage the user to keep fit. The feedback for different numbers of steps should be:\nUp to 1000 - Couch Potato!\nAbove 1000, up to 2000 - Lazy Bones!\nAbove 2000, up to 4000 - Getting There!\nAbove 4000, up to 6000 - Not Bad!\nAbove 6000 - Way to Go!\nWhich of the following sets of test inputs would achieve the highest equivalence partition coverage?",
      options: [
        "0, 1000, 2000, 3000, 4000",
        "1000, 2001, 4000, 4001, 6000",
        "123, 2345, 3456, 4567, 5678",
        "666, 999, 2222, 5555, 6666"
      ],
      correctAnswer: 3,
      correctAnswers: [],
      explanation: "Covers 4 partitions: [0-1000] (666,999), (2000-4000] (2222), (4000-6000] (5555), >6000 (6666). Only misses (1000-2000], the most coverage among options."
    },
    {
      id: 22,
      type: "single",
      question: "A daily radiation recorder for plants produces a sunshine score based on a combination of thenumber of hours a plant is exposed to the sun (below 3 hours, 3 to 6 hours or above 6 hours)and the average intensity of the sunshine (very low, low, medium, high).\n Given the following test cases:",
      options: [
        "1",
        "2",
        "3",
        "4"
      ],
      image: "https://res.cloudinary.com/dlrpmew9d/image/upload/v1754983214/Screenshot_from_2025-08-12_12-49-26_kgy08s.png",
      correctAnswer: 1,
      correctAnswers: [],
      explanation: ""
    },
    {
      id: 23,
      type: "single",
      question: "A smart home app measures the average temperature in the house over the previous week and provides feedback to the occupants on their environmental-friendliness based on this temperature. The feedback for different average temperature ranges (to the nearest \u00b0C) should be:\nUp to 10\u00b0C - Icy Cool!\n11\u00b0C to 15\u00b0C - Chilled Out!\n16\u00b0C to 19\u00b0C - Cool Man!\n20\u00b0C to 22\u00b0C - Too Warm!\nAbove 22\u00b0C - Hot & Sweaty!\nUsing two-point BVA, which of the following sets of test inputs provides the highest level of boundary coverage?",
      options: [
        "0\u00b0C, 11\u00b0C, 20\u00b0C, 22\u00b0C, 23\u00b0C",
        "9\u00b0C, 15\u00b0C, 19\u00b0C, 23\u00b0C, 100\u00b0C",
        "10\u00b0C, 16\u00b0C, 19\u00b0C, 22\u00b0C, 23\u00b0C",
        "14\u00b0C, 15\u00b0C, 18\u00b0C, 19\u00b0C, 21\u00b0C, 22\u00b0C"
      ],
      correctAnswer: 2,
      correctAnswers: [],
      explanation: "Covers 5 boundaries: 10 (Icy Cool/Chilled Out), 16 (Chilled Out/Cool Man), 19 (Cool Man/Too Warm), 22 (Too Warm/Hot & Sweaty), 23 (Hot & Sweaty). Highest coverage among options."
    },
    {
      id: 24,
      type: "single",
      question: "Decision table testing is being performed on a speeding fine system. Two test caseshave already been generated for rules 1 and 4, which are shown below:",
      options: [
        "DT1, DT2",
        "DT2, DT3",
        "DT2, DT4",
        "DT3, DT4"
      ],
      correctAnswer: 2,
      correctAnswers: [],
      image: "https://res.cloudinary.com/dlrpmew9d/image/upload/v1754976149/Screenshot_from_2025-08-12_10-26-58_s2dlgo.png",
      explanation: ""
    },
    {
      id: 25,
      type: "single",
      question: "Given the following state model of a battery charger software: (diagram description: states OFF, WAIT, TRICKLE, CHARGE, HIGH, LOW with transitions)\nWhich of the following sequences of transitions provides the highest level of transition coverage for the model?",
      options: [
        "OFF \u2192 WAIT \u2192 OFF \u2192 WAIT \u2192 TRICKLE \u2192 CHARGE \u2192 HIGH \u2192 CHARGE \u2192 LOW",
        "WAIT \u2192 TRICKLE \u2192 WAIT \u2192 OFF \u2192 WAIT \u2192 TRICKLE \u2192 CHARGE \u2192 LOW \u2192 CHARGE",
        "HIGH \u2192 CHARGE \u2192 LOW \u2192 CHARGE \u2192 TRICKLE \u2192 WAIT \u2192 TRICKLE \u2192 WAIT \u2192 TRICKLE",
        "WAIT \u2192 TRICKLE \u2192 CHARGE \u2192 HIGH \u2192 CHARGE \u2192 TRICKLE \u2192 WAIT \u2192 OFF \u2192 WAIT"
      ],
      correctAnswer: 3,
      correctAnswers: [],
      explanation: "The sequence covers 8 unique transitions: WAIT→TRICKLE, TRICKLE→CHARGE, CHARGE→HIGH, HIGH→CHARGE, CHARGE→TRICKLE, TRICKLE→WAIT, WAIT→OFF, OFF→WAIT. This achieves the highest transition coverage.",
      image: "https://res.cloudinary.com/dlrpmew9d/image/upload/v1754976149/Screenshot_from_2025-08-12_10-26-41_nddvnt.png"
    },
    {
      id: 26,
      type: "single",
      question: "Which of the following statements BEST describes how test cases are derived from a use case?",
      options: [
        "Test cases are created to exercise defined basic, exceptional and error behaviors performed by the system under test in collaboration with actors.",
        "Test cases are derived by identifying the components included in the use case and creating integration tests that exercise the interactions of these components.",
        "Test cases are generated by analyzing the interactions of the actors with the system to ensure the user interfaces are easy to use.",
        "Test cases are derived to exercise each of the decision points in the business process flows of the use case, to achieve 100% decision coverage of these flows."
      ],
      correctAnswer: 0,
      correctAnswers: [],
      explanation: "Use cases describe system-actor interactions. Test cases validate the main success scenario (basic flow), alternate paths (exceptional flows), and error handling (error flows) within these interactions."
    },
    {
      id: 27,
      type: "single",
      question: "Which of the following descriptions of statement coverage is CORRECT?",
      options: [
        "Statement coverage is a measure of the number of lines of source code (minus comments) exercised by tests.",
        "Statement coverage is a measure of the proportion of executable statements in the source code exercised by tests.",
        "Statement coverage is a measure of the percentage of lines of source code exercised by tests.",
        "Statement coverage is a measure of the number of executable statements in the source code exercised by tests."
      ],
      correctAnswer: 1,
      correctAnswers: [],
      explanation: "Statement coverage = (Number of executed statements / Total executable statements) * 100%. It measures the percentage of executable statements (not lines or comments) covered by tests."
    },
    {
      id: 28,
      type: "single",
      question: "Which of the following descriptions of decision coverage is CORRECT?",
      options: [
        "Decision coverage is a measure of the percentage of possible paths through the source code exercised by tests.",
        "Decision coverage is a measure of the percentage of business flows through the component exercised by tests.",
        "Decision coverage is a measure of the \u2018if\u2019 statements in the code that are exercised with both the true and false outcomes.",
        "Decision coverage is a measure of the proportion of decision outcomes in the source code exercised by tests."
      ],
      correctAnswer: 3,
      correctAnswers: [],
      explanation: "Decision coverage = (Number of exercised decision outcomes / Total decision outcomes) * 100%. Each decision (e.g., if, case) has TRUE/FALSE outcomes that must be covered."
    },
    {
      id: 29,
      type: "single",
      question: "Which of the following BEST describes the concept behind error guessing?",
      options: [
        "Error guessing requires you to imagine you are the user of the test object and guess mistakes the user could make interacting with it.",
        "Error guessing involves using your personal experience of development and the mistakes you made as a developer.",
        "Error guessing involves using your knowledge and experience of defects found in the past and typical mistakes made by developers.",
        "Error guessing requires you to rapidly duplicate the development task to identify the sort of mistakes a developer might make."
      ],
      correctAnswer: 2,
      correctAnswers: [],
      explanation: "Error guessing leverages a tester's expertise with common defect patterns, historical failures, and developer tendencies to design tests targeting probable error areas without formal techniques."
    },
    {
      id: 30,
      type: "single",
      question: "Which of the following BEST explains a benefit of independent testing?",
      options: [
        "The use of an independent test team allows project management to assign responsibility for the quality of the final deliverable to the test team, so ensuring everyone is aware that quality is the test team\u2019s overall responsibility.",
        "If a test team external to the organization can be afforded, then there are distinct benefits in terms of this external team not being so easily swayed by the delivery concerns of project management and the need to meet strict delivery deadlines.",
        "An independent test team can work totally separately from the developers, need not be distracted with changing project requirements, and can restrict communication with the developers to defect reporting through the defect management system.",
        "When specifications contain ambiguities and inconsistencies, assumptions are made on their interpretation, and an independent tester can be useful in questioning those assumptions and the interpretation made by the developer."
      ],
      correctAnswer: 3,
      correctAnswers: [],
      explanation: "Independent testers provide unbiased scrutiny. They challenge assumptions in requirements/design, identify ambiguities, and offer fresh perspectives that developers or involved parties might overlook."
    },
    {
      id: 31,
      type: "single",
      question: "Which of the following tasks is MOST LIKELY to be performed by the test manager?",
      options: [
        "Write test summary reports based on the information gathered during testing.",
        "Review tests developed by others.",
        "Create the detailed test execution schedule.",
        "Analyze, review, and assess requirements, specifications and models for testability."
      ],
      correctAnswer: 0,
      correctAnswers: [],
      explanation: "The test manager compiles test summary reports, synthesizing results, metrics, and risks for stakeholders. Other tasks are often delegated to test leads/analysts."
    },
    {
      id: 32,
      type: "single",
      question: "Given the following examples of entry and exit criteria:\n1. The original testing budget of $30,000 plus contingency of $7,000 has been spent.\n2. 96% of planned tests for the drawing package have been executed and the remaining tests are now out of scope.\n3. The trading performance test environment has been designed, set-up and verified.\n4. Current status is no outstanding critical defects and two high-priority ones.\n5. The autopilot design specifications have been reviewed and reworked.\n6. The tax rate calculation component has passed unit testing.\nWhich of the following BEST categorizes them as entry and exit criteria:",
      options: [
        "Entry criteria \u2013 5, 6 Exit criteria \u2013 1, 2, 3, 4",
        "Entry criteria \u2013 2, 3, 6 Exit criteria \u2013 1, 4, 5",
        "Entry criteria \u2013 1, 3 Exit criteria \u2013 2, 4, 5, 6",
        "Entry criteria \u2013 3, 5, 6 Exit criteria \u2013 1, 2, 4"
      ],
      correctAnswer: 3,
      correctAnswers: [],
      explanation: "Entry criteria (prerequisites): Test environment ready (3), specs reviewed (5), unit testing passed (6). Exit criteria (completion): Budget spent (1), tests executed/out-of-scope (2), defect levels acceptable (4)."
    },
    {
      id: 33,
      type: "single",
      question: "Given the following priorities and dependencies for these test cases:\nTest Case Priority Technical Dependency on Logical Dependency on:\nTC1 High TC4\nTC2 Low\nTC3 High TC2\nTC4 Medium\nTC5 Low TC2\nTC6 Medium TC5\nWhich of the following test execution schedules BEST considers the priorities and technical and logical dependencies?",
      options: [
        "TC1 \u2013 TC3 \u2013 TC4 \u2013 TC6 \u2013 TC2 \u2013 TC5",
        "TC4 \u2013 TC3 \u2013 TC1 \u2013 TC2 \u2013 TC5 \u2013 TC6",
        "TC4 \u2013 TC1 \u2013 TC3 \u2013 TC5 \u2013 TC6 \u2013 TC2",
        "TC4 \u2013 TC2 \u2013 TC5 \u2013 TC1 \u2013 TC3 \u2013 TC6"
      ],
      correctAnswer: 1,
      correctAnswers: [],
      explanation: "",
      image: "https://res.cloudinary.com/dlrpmew9d/image/upload/v1754983214/Screenshot_from_2025-08-12_12-49-39_ioyqmu.png"
    },
    {
      id: 34,
      type: "single",
      question: "Which of the following statements about test estimation approaches is CORRECT?",
      options: [
        "With the metrics-based approach, the estimate is based on test measures from the project and so this estimate is only available after the testing starts.",
        "With the expert-based approach, a group of expert users identified by the client recommends the necessary testing budget.",
        "With the expert-based approach, the test managers responsible for the different testing activities predict the expected testing effort.",
        "With the metrics-based approach, an average of the testing costs recorded from several past projects is used as the testing budget."
      ],
      correctAnswer: 2,
      correctAnswers: [],
      explanation: "Expert-based estimation relies on predictions from experienced test managers/leads. They break down tasks, estimate effort for each, and aggregate based on their expertise and historical knowledge."
    },
    {
      id: 35,
      type: "single",
      question: "Which of the following BEST defines risk level?",
      options: [
        "Risk level is calculated by adding together the probabilities of all problem situations and the financial harm that results from them.",
        "Risk level is estimated by multiplying the likelihood of a threat to the system by the chance that the threat will occur and will result in financial damage",
        "Risk level is determined by a combination of the probability of an undesirable event and the expected impact of that event.",
        "Risk level is the sum of all potential hazards to a system multiplied by the sum of all potential losses from that system."
      ],
      correctAnswer: 2,
      correctAnswers: [],
      explanation: "Risk Level = Probability (likelihood of occurrence) × Impact (severity of consequences). This product determines the magnitude of risk for prioritization."
    },
    {
      id: 36,
      type: "single",
      question: "Which of the following is MOST likely to be an example of a PRODUCT risk?",
      options: [
        "The expected security features may not be supported by the system architecture.",
        "The developers may not have time to fix all the defects found by the test team.",
        "The test cases may not provide full coverage of the specified requirements.",
        "The performance test environment may not be ready before the system is due for delivery."
      ],
      correctAnswer: 0,
      correctAnswers: [],
      explanation: "Product risks relate directly to software quality (e.g., security, reliability). Here, inadequate architecture threatens security functionality—a quality attribute of the product."
    },
    {
      id: 37,
      type: "single",
      question: "Which of the following is LEAST likely to be an example of product risk analysis CORRECTLY influencing the testing?",
      options: [
        "The potential impact of security flaws has been identified as being particularly high, so security testing has been prioritized ahead of some other testing activities.",
        "Testing has found the quality of the network module to be higher than expected, so additional testing will now be performed in that area.",
        "The users had problems with the user interface of the previous system, so additional usability testing is planned for the replacement system.",
        "The time needed to load web pages is crucial to the success of the new website, so an expert in performance testing has been employed for this project."
      ],
      correctAnswer: 1,
      correctAnswers: [],
      explanation: "Risk-based testing focuses resources on high-risk areas. Adding tests to a low-risk area (high-quality module) contradicts this principle; effort should shift to higher-risk components."
    },
    {
      id: 38,
      type: "single",
      question: "You are performing system testing of a train booking system and have found that occasionally the system reports that there are no available trains when you believe that there should be, based on the test cases you have run. You have provided the development manager with a summary of the defect and the version of the system you are testing. The developers recognize the urgency of the defect and are now waiting for you to provide more details so that they can fix it. Given the following pieces of information:\n1. Degree of impact (severity) of the defect.\n2. Identification of the test item.\n3. Details of the test environment.\n4. Urgency/priority to fix.\n5. Actual results.\n6. Reference to test case specification.\nApart from the description of the defect, which includes a database dump and screenshots, which of the pieces of information would be MOST useful to include in the initial defect report?",
      options: [
        "1, 2, 6",
        "1, 4, 5, 6",
        "2, 3, 4, 5",
        "3, 5, 6"
      ],
      correctAnswer: 3,
      correctAnswers: [],
      explanation: "Critical for debugging: Test item ID (2) to locate the component, test environment (3) to replicate, priority (4) to triage, and actual results (5) to understand the failure. Severity (1) is often inferred; test case ref (6) is secondary."
    },
    {
      id: 39,
      type: "single",
      question: "Given the following test activities and test tools:\n1. Performance measurement and dynamic analysis.\n2. Test execution and logging.\n3. Management of testing and testware.\n4. Test design.\nA. Requirements coverage tools.\nB. Dynamic analysis tools.\nC. Test data preparation tools.\nD. Defect management tools.\nWhich of the following BEST matches the activities and tools?",
      options: [
        "1 \u2013 B, 2 \u2013 C, 3 \u2013 D, 4 \u2013 A",
        "1 \u2013 B, 2 \u2013 A, 3 \u2013 C, 4 \u2013 D",
        "1 \u2013 B, 2 \u2013 A, 3 \u2013 D, 4 \u2013 C",
        "1 \u2013 A, 2 \u2013 B, 3 \u2013 D, 4 \u2013 C"
      ],
      correctAnswer: 2,
      correctAnswers: [],
      explanation: "Matching: 1→B (Dynamic analysis tools for performance), 2→A (Requirements tools track coverage during execution), 3→D (Defect tools manage testware/process), 4→C (Data tools aid test design)."
    },
    {
      id: 40,
      type: "single",
      question: "Which of the following is MOST likely to be used as a reason for using a pilot project to introduce a tool into an organization?",
      options: [
        "The need to evaluate how the tool fits with existing processes and practices and determining what would need to change.",
        "The need to evaluate the test automation skills and training, mentoring and coaching needs of the testers who will use the tool.",
        "The need to evaluate whether the tool provides the required functionality and does not duplicate existing test tools.",
        "The need to evaluate the tool vendor in terms of the training and other support they provide."
      ],
      correctAnswer: 0,
      correctAnswers: [],
      explanation: "A pilot project assesses real-world tool integration. It evaluates process alignment, identifies necessary changes, and reveals organizational impacts before full-scale rollout."
    }
  ];