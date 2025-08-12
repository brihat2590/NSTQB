export const mockQuestions1=[
  {
    id: 1,
    type: "single",
    question: "Which one of the following answers describes a test condition?",
    options: [
      "An attribute of a component or system specified or implied by requirements documentation.",
      "An aspect of the test basis that is relevant to achieve specific test objectives.",
      "The degree to which a software product provides functions which meet stated and implied needs when the software is used under specified conditions.",
      "The percentage of all single condition outcomes that independently affect a decision outcome that have been exercised by a test suite."
    ],
    correctAnswer: 1,
    correctAnswers: [],
    explanation: "A test condition is derived from the test basis and focuses on aspects relevant to test objectives."
  },
  {
    id: 2,
    type: "single",
    question: "Which of the following statements is a valid objective for testing?",
    options: [
      "The test should start as late as possible so that development had enough time to create a good product.",
      "To find as many failures as possible so that defects can be identified and corrected.",
      "To prove that all possible defects are identified.",
      "To prove that any remaining defects will not cause any failures."
    ],
    correctAnswer: 1,
    correctAnswers: [],
    explanation: "The primary objective of testing is to identify failures to facilitate defect resolution."
  },
  {
    id: 3,
    type: "single",
    question: "Which of the following is an example of a failure in a car cruise control system?",
    options: [
      "The developer of the system forgot to rename variables after a cut-and-paste operation.",
      "Unnecessary code that sounds an alarm when reversing was included in the system.",
      "The system stops maintaining a set speed when the radio volume is increased or decreased.",
      "The design specification for the system wrongly states speeds in km/h."
    ],
    correctAnswer: 2,
    correctAnswers: [],
    explanation: "A failure is an observable malfunction; here the system stops working when an unrelated action occurs."
  },
  {
    id: 4,
    type: "single",
    question: "Which of the following is a defect rather than a root cause in a fitness tracker?",
    options: [
      "Because he was unfamiliar with the domain of fitness training, the author of the requirements wrongly assumed that users wanted heartbeat in beats per hour.",
      "The tester of the smartphone interface had not been trained in state transition testing, so missed a major defect.",
      "An incorrect configuration variable implemented for the GPS function could cause location problems during daylight saving times.",
      "Because she had never worked on wearable devices before, the designer of the user interface misunderstood the effects of reflected sunlight."
    ],
    correctAnswer: 2,
    correctAnswers: [],
    explanation: "A defect is a flaw in the system itself; the incorrect configuration variable directly causes malfunction."
  },
  {
    id: 5,
    type: "single",
    question: "Mr. Test has been testing software applications on mobile devices for a period of 5 years. He has a wealth of experience in testing mobile applications and achieves better results in a shorter time than others. Over several months Mr. Test did not modify the existing automated test cases and did not create any new test cases. This leads to fewer and fewer defects being found by executing the tests. What principle of testing did Mr. Test not observe?",
    options: [
      "Testing depends on the environment.",
      "Exhaustive testing is not possible.",
      "Repeating of tests will not find new defects.",
      "Defects cluster together."
    ],
    correctAnswer: 2,
    correctAnswers: [],
    explanation: "Identical repeated tests become less effective over time as they don't target new areas or changes."
  },
  {
    id: 6,
    type: "single",
    question: "Given the following test activities and tasks:\n A. Test design \nB. Test implementation \nC. Test execution \nD. Test completion \n\n1. Entering change requests for open defect reports \n2. Identifying test data to support the test cases \n3. Prioritizing test procedures and creating test data \n4. Analyzing discrepancies to determine their cause Which of the following BEST matches the activities with the tasks?",
    options: [
      "A-2, B-3, C-4, D-1",
      "A-2, B-1, C-3, D-4",
      "A-3, B-2, C-4, D-1",
      "A-3, B-2, C-1, D-4"
    ],
    correctAnswer: 0,
    correctAnswers: [],
    explanation: "Test design identifies test data (A-2), implementation prioritizes/creates data (B-3), execution analyzes discrepancies (C-4), and completion handles change requests (D-1)."
  },
  {
    id: 7,
    type: "single",
    question: "Which of the following activities is part of the main activity \"test analysis\" in the test process?",
    options: [
      "Identifying any required infrastructure and tools.",
      "Creating test suites from test scripts.",
      "Analyzing lessons learned for process improvement.",
      "Evaluating the test basis for testability."
    ],
    correctAnswer: 3,
    correctAnswers: [],
    explanation: "Test analysis involves evaluating test basis documents for testability and other factors."
  },
  {
    id: 8,
    type: "single",
    question: `Match the following test work products (1-4) with the right description (A-D).   \n1. Test suite.\n2. Test case. \n 3. Test script. \n4. Test charter. \n\nA. A group of test scripts with a sequence of instructions. \nB. A set of instructions for the execution of a test. \nC. Contains expected results. \nD. An instruction of test goals and possible test ideas on how to test.`,
    options: [
      "1A, 2C, 3B, 4D",
      "1D, 2B, 3A, 4C",
      "1A, 2C, 3D, 4B",
      "1D, 2C, 3B, 4A"
    ],
    correctAnswer: 0,
    correctAnswers: [],
    explanation: "Test suite = group of scripts (1A), test case = contains expected results (2C), test script = execution instructions (3B), test charter = test goals/ideas (4D)."
  },
  {
    id: 9,
    type: "single",
    question: "How can white-box testing be applied during acceptance testing?",
    options: [
      "To check if large volumes of data can be transferred between integrated systems.",
      "To check if all code statements and code decision paths have been executed.",
      "To check if all work process flows have been covered.",
      "To cover all web page navigations."
    ],
    correctAnswer: 2,
    correctAnswers: [],
    explanation: "White-box techniques in acceptance testing validate coverage of business workflows/processes."
  },
  {
    id: 10,
    type: "single",
    question: "Which of the following statements comparing component testing and system testing is TRUE?",
    options: [
      "Component testing verifies the functionality of software modules, program objects, and classes that are separately testable, whereas system testing verifies interfaces between components and interactions between different parts of the system.",
      "Test cases for component testing are usually derived from component specifications, design specifications, or data models, whereas test cases for system testing are usually derived from requirement specifications or use cases.",
      "Component testing only focuses on functional characteristics, whereas system testing focuses on functional and non-functional characteristics.",
      "Component testing is the responsibility of the testers, whereas system testing typically is the responsibility of the users of the system."
    ],
    correctAnswer: 1,
    correctAnswers: [],
    explanation: "Component tests use technical docs (specs/models); system tests use requirements/use cases."
  },
  {
    id: 11,
    type: "single",
    question: "Which one of the following is TRUE?",
    options: [
      "The purpose of regression testing is to check if the correction has been successfully implemented, while the purpose of confirmation testing is to confirm that the correction has no side effects.",
      "The purpose of regression testing is to detect unintended side effects, while the purpose of confirmation testing is to check if the system is still working in a new environment.",
      "The purpose of regression testing is to detect unintended side effects, while the purpose of confirmation testing is to check if the original defect has been fixed.",
      "The purpose of regression testing is to check if the new functionality is working, while the purpose of confirmation testing is to check if the original defect has been fixed."
    ],
    correctAnswer: 2,
    correctAnswers: [],
    explanation: "Confirmation testing verifies defect fixes; regression testing checks for unintended impacts."
  },
  {
    id: 12,
    type: "single",
    question: "Which one of the following is the BEST definition of an incremental development model?",
    options: [
      "Defining requirements, designing software and testing are done in phases where in each phase a piece of the system is added.",
      "A phase in the development process should begins when the previous phase is complete.",
      "Testing is viewed as a separate phase which takes place after development has been completed.",
      "Testing is added to development as an increment."
    ],
    correctAnswer: 0,
    correctAnswers: [],
    explanation: "Incremental development adds functionality in phases with integrated testing."
  },
  {
    id: 13,
    type: "single",
    question: "Which of the following should NOT be a trigger for maintenance testing?",
    options: [
      "Decision to test the maintainability of the software.",
      "Decision to test the system after migration to a new operating platform.",
      "Decision to test if archived data is possible to be retrieved.",
      "Decision to test after “hot fixes”."
    ],
    correctAnswer: 0,
    correctAnswers: [],
    explanation: "Maintenance testing is triggered by changes (e.g., migration, hot fixes), not maintainability assessment."
  },
  {
    id: 14,
    type: "single",
    question: "Which of the following options are roles in a formal review?",
    options: [
      "Developer, Moderator, Review leader, Tester.",
      "Author, Moderator, Manager, Developer.",
      "Author, Manager, Review leader, Designer.",
      "Author, Moderator, Review leader, Scribe."
    ],
    correctAnswer: 3,
    correctAnswers: [],
    explanation: "Formal review roles include Author, Moderator, Review Leader, and Scribe."
  },
  {
    id: 15,
    type: "single",
    question: "Which activities are carried out within the planning of a formal review?",
    options: [
      "Collection of metrics for the evaluation of the effectiveness of the review.",
      "Answer any questions the participants may have.",
      "Verification of input criteria for the review.",
      "Evaluation of the review findings against the exit criteria."
    ],
    correctAnswer: 2,
    correctAnswers: [],
    explanation: "Planning includes verifying input criteria (e.g., document readiness) are met."
  },
  {
    id: 16,
    type: "single",
    question: "Which of the review types below is the BEST option to choose when the review must follow a formal process based on rules and checklists?",
    options: [
      "Informal Review.",
      "Technical Review.",
      "Inspection.",
      "Walkthrough."
    ],
    correctAnswer: 2,
    correctAnswers: [],
    explanation: "Inspections are the most formal review type, using strict rules and checklists."
  },
  {
    id: 17,
    type: "multiple",
    question: "Which TWO of the following statements about static testing are MOST true?",
    options: [
      "Static testing is a cheap way to detect and remove defects.",
      "Static testing makes dynamic testing less challenging.",
      "Static testing allows early validation of user requirements.",
      "Static testing makes it possible to find run-time problems early in the lifecycle.",
      "When testing safety-critical system, static testing has less value because dynamic testing finds the defects better."
    ],
    correctAnswer: -1,
    correctAnswers: [0, 2],
    explanation: "Static testing is cost-effective and enables early requirements validation."
  },
  {
    id: 18,
    type: "single",
    question: "You will be invited to a review. The work product to be reviewed is a description of the in-house document creation process. The aim of the description is to present the work distribution between the different roles involved in the process in a way that can be clearly understood by everyone. You will be invited to a checklist-based review. The checklist will also be sent to you. It includes the following points: i. Is the person who performs the activity clearly identified for each activity? ii. Is the entry criteria clearly defined for each activity? iii. Is the exit criteria clearly defined for each activity? iv. Are the supporting roles and their scope of work clearly defined for each activity? In the following we show an excerpt of the work result to be reviewed, for which you should use the checklist above: \"After checking the customer documentation for completeness and correctness, the software architect creates the system specification. Once the software architect has completed the system specification, he invites testers and verifiers to the review. A checklist describes the scope of the review. Each invited reviewer creates review comments - if necessary - and concludes the review with an official review done-comment.\" Which of the following statements about your review is correct?",
    options: [
      "Point ii) of the checklist has been violated because it is not clear which condition must be fulfilled in order to invite to the review.",
      "You notice that in addition to the tester and the verifier, the validator must also be invited. Since this item is not part of your checklist, you do not create a corresponding comment.",
      "Point iii) of the checklist has been violated as it is not clear what marks the review as completed.",
      "Point i) of the checklist has been violated because it is not clear who is providing the checklist for the invitation to the review."
    ],
    correctAnswer: 3,
    correctAnswers: [],
    explanation: "Checklist point i) requires clear identification of activity owners; the excerpt doesn't specify who provides the checklist."
  },
  {
    id: 19,
    type: "single",
    question: "What is checklist-based testing?",
    options: [
      "A test technique in which tests are derived based on the tester's knowledge of past faults, or general knowledge of failures.",
      "Procedure to derive and/or select test cases based on an analysis of the specification, either functional or non-functional, of a component or system without reference to its internal structure.",
      "An experience-based test technique whereby the experienced tester uses a list of items to be noted, checked, or remembered, or a set of rules or criteria against which a product has to be verified.",
      "An approach to testing where the testers dynamically design and execute tests based on their knowledge, exploration of the test item and the results of previous tests."
    ],
    correctAnswer: 2,
    correctAnswers: [],
    explanation: "Checklist-based testing uses predefined lists to guide verification."
  },
  {
    id: 20,
    type: "single",
    question: "Which one of the following options is categorized as a black-box test technique?",
    options: [
      "A technique based on analysis of the architecture.",
      "A technique checking that the test object is working according to the technical design.",
      "A technique based on the knowledge of past faults, or general knowledge of failures.",
      "A technique based on formal requirements."
    ],
    correctAnswer: 3,
    correctAnswers: [],
    explanation: "Black-box techniques derive tests from requirements without internal knowledge."
  },
  {
    id: 21,
    type: "single",
    question: "The following statement refers to decision coverage:\n\n “When the code contains only a single ‘if’ statement and no loops or CASE statements, and its execution is not nested within the test, any single test case we run will result in 50% decision coverage.”\n\n Which of the following statement is correct?",
    options: [
      "The statement is true. Any single test case provides 100% statement coverage and therefore 50% decision coverage.",
      "The statement is true. Any single test case would cause the outcome of the “if” statement to be either true or false.",
      "The statement is false. A single test case can only guarantee 25% decision coverage in this case.",
      "The statement is false. The statement is too broad. It may be correct or not, depending on the tested software."
    ],
    correctAnswer: 1,
    correctAnswers: [],
    explanation: "A single test covers one outcome (true/false), achieving 50% coverage for one decision."
  },
  {
    id: 22,
    type: "single",
    question: "Which one of the following is the description of statement coverage?",
    options: [
      "It is a metric, which is the percentage of test cases that have been executed.",
      "It is a metric, which is the percentage of statements in the source code that have been executed.",
      "It is a metric, which is the number of statements in the source code that have been executed by test cases that are passed.",
      "It is a metric, that gives a true/false confirmation if all statements are covered or not."
    ],
    correctAnswer: 1,
    correctAnswers: [],
    explanation: "Statement coverage measures the percentage of executable statements exercised by tests."
  },
  {
    id: 23,
    type: "single",
    question: "Which statement about the relationship between statement coverage and decision coverage is true?",
    options: [
      "100% decision coverage also guarantees 100% statement coverage.",
      "100% statement coverage also guarantees 100% decision coverage.",
      "50% decision coverage also guarantees 50% statement coverage.",
      "Decision coverage can never reach 100%."
    ],
    correctAnswer: 0,
    correctAnswers: [],
    explanation: "100% decision coverage implies all statements are executed."
  },
  {
    id: 24,
    type: "single",
    question: "For which of the following situations is explorative testing suitable?",
    options: [
      "When time pressure requires speeding up the execution of tests already specified.",
      "When the system is developed incrementally and no test charter is available.",
      "When testers are available who have sufficient knowledge of similar applications and technologies.",
      "When an advanced knowledge of the system already exists and evidence is to be provided that it should be tested intensively."
    ],
    correctAnswer: 2,
    correctAnswers: [],
    explanation: "Exploratory testing leverages tester expertise in domain/technology."
  },
  {
    id: 25,
    type: "single",
    question: "An employee’s bonus is to be calculated. It cannot be negative, but it can be calculated down to zero. The bonus is based on the length of employment:\n less than or equal to 2 years, more than 2 years but less than 5 years, 5 to 10 years inclusively or longer than 10 years.\n\n What is the minimum number of test cases required to cover all valid equivalence partitions for calculating the bonus?",
    options: [
      "3.",
      "5.",
      "2.",
      "4."
    ],
    correctAnswer: 3,
    correctAnswers: [],
    explanation: "Four valid partitions: ≤2 years, >2<5 years, 5-10 years, >10 years."
  },
  {
    id: 26,
    type: "single",
    question: "A speed control and reporting system has the following characteristics:\n If you drive 50 km/h or less, nothing will happen.\n If you drive faster than 50 km/h, but no more than 55 km/h, you will be warned.\n If you drive faster than 55 km/h but not more than 60 km/h, you will be fined.\n If you drive faster than 60 km/h, your driving license will be suspended.\n The speed in km/h is available to the system as an integer value.\n Which would be the most likely set of values (km/h) identified by applying the boundary value analysis, where only the boundary values on the boundaries of the equivalence classes are relevant?",
    options: [
      "0, 49, 50, 54, 59, 60.",
      "50, 55, 60.",
      "49, 50, 54, 55, 60, 62.",
      "50, 51, 55, 56, 60, 61."
    ],
    correctAnswer: 3,
    correctAnswers: [],
    explanation: "Boundary values: 50/51 (50-55 boundary), 55/56 (55-60 boundary), 60/61 (>60 boundary)."
  },
  {
    id:27,
    type:"single",
    question:"A company's employees are paid bonuses if they work more than a year in the company and achieve a target which is individually agreed before.These facts can be shown in a decision table:",
    options:["Condition1 = YES, Condition2 = NO, Condition3 = YES, Action= NO","Condition1 = YES, Condition2 = YES, Condition3 = NO, Action= YES","Condition1 = NO, Condition2 = NO, Condition3 = YES, Action= NO","Condition1 = NO, Condition2 = YES, Condition3 = NO, Action= NO"],
    correctAnswer:3,
    correctAnswers: [],
    explanation:"Option d is correct because it’s realistic for a new employee (<1 year) to have an agreed target but fail to achieve it, resulting in no bonus.The other options are unrealistic as they imply “achieved target” without an agreed target or paying a bonus without achievement.",
    image:"https://res.cloudinary.com/dlrpmew9d/image/upload/v1754980151/Screenshot_from_2025-08-12_11-58-45_loge6d.png"

  },
  {
    id:28,
    type:"single",
    question:"Which of the following statements about the given state transition diagram and table oftest cases is TRUE?",
    options:["The given test cases cover both valid and invalid transitions in the state transition diagram.","The given test cases represent all possible valid transitions in the state transition diagram.","The given test cases represent some of the valid transitions in the state transition diagram.","The given test cases represent pairs of transitions in the state transition diagram."],
    correctAnswer:2,
    correctAnswers: [],
    explanation:"",
    image:"https://res.cloudinary.com/dlrpmew9d/image/upload/v1754980151/Screenshot_from_2025-08-12_11-58-59_bvqkpy.png"

  },
  {
    id: 29,
    type: "single",
    question: "A video application has the following requirement: The application shall allow playing a video on the following display resolution: 1. 640x480. 2. 1280x720. 3. 1600x1200. 4. 1920x1080. Which of the following list of test cases is a result of applying the equivalence partitioning test technique to test this requirement?",
    options: [
      "Verify that the application can play a video on a display of size 1920x1080 (1 test case).",
      "Verify that the application can play a video on a display of size 640x480 and 1920x1080 (2 test cases).",
      "Verify that the application can play a video on each of the display sizes in the requirement (4 test cases).",
      "Verify that the application can play a video on any one of the display sizes in the requirement (1 test case)."
    ],
    correctAnswer: 2,
    correctAnswers: [],
    explanation: "Each resolution is a valid partition requiring a separate test."
  },
  {
    id: 30,
    type: "single",
    question: "Which of the following statements BEST describes how tasks are divided between the test manager and the tester?",
    options: [
      "The test manager plans testing activities and chooses the standards to be followed, while the tester chooses the tools and set the tools usage guidelines.",
      "The test manager plans testing activities and chooses the standards to be followed, while the tester chooses the tools and controls to be used.",
      "The test manager plans, monitors, and controls the testing activities, while the tester designs tests and decides on the release of the test object.",
      "The test manager plans, organizes, and controls the testing activities, while the tester specifies and executes tests."
    ],
    correctAnswer: 3,
    correctAnswers: [],
    explanation: "Test managers handle planning/organization/control; testers handle specification/execution."
  },
  {
    id: 31,
    type: "single",
    question: "Which of the following metrics would be MOST useful to monitor during test execution?",
    options: [
      "Percentage of executed test cases.",
      "Average number of testers involved in the test execution.",
      "Coverage of requirements by source code.",
      "Percentage of test cases already created and reviewed."
    ],
    correctAnswer: 0,
    correctAnswers: [],
    explanation: "Execution progress is tracked via percentage of tests executed."
  },
  {
    id: 32,
    type: "multiple",
    question: "Which TWO of the following can affect and be part of the (initial) test planning?",
    options: [
      "Budget limitations.",
      "Test objectives.",
      "Test log.",
      "Failure rate.",
      "Use cases."
    ],
    correctAnswer: -1,
    correctAnswers: [0, 1],
    explanation: "Budget and objectives are foundational inputs for test planning."
  },
  {
    id: 33,
    type: "single",
    question: "Which of the following lists contains only typical exit criteria from testing?",
    options: [
      "Reliability measures, test coverage, test cost, schedule and status about fixing errors and remaining risks.",
      "Reliability measures, test coverage, degree of tester’s independence and product completeness.",
      "Reliability measures, test coverage, test cost, availability of test environment, time to market and product completeness.",
      "Time to market, remaining defects, tester qualification, availability of testable use cases, test coverage and test cost."
    ],
    correctAnswer: 0,
    correctAnswers: [],
    explanation: "Exit criteria include coverage, cost, schedule, defect status, and risk."
  },
  {
    id: 34,
    type: "single",
    question: "Which one of the following is NOT included in a test summary report?",
    options: [
      "Defining pass/fail criteria and objectives of testing.",
      "Deviations from the test approach.",
      "Measurements of actual progress against exit criteria.",
      "Evaluation of the quality of the test item."
    ],
    correctAnswer: 0,
    correctAnswers: [],
    explanation: "Pass/fail criteria are defined in test planning, not the summary report."
  },
  {
    id: 35,
    type: "single",
    question: "The project develops a \"smart\" heating thermostat. The control algorithms of the thermostat were modeled as Matlab/Simulink models and run on the internet connected server. The thermostat uses the specifications of the server to trigger the heating valves. The test manager has defined the following test strategy/approach in the test plan:\n\n 1. The acceptance test for the whole system is executed as an experience-based test. \n2. The control algorithms on the server are tested during implementation using continuous integration.\n 3. The functional test of the thermostat is performed as risk-based testing. \n4. The security tests of data / communication via the internet are executed together with external security experts. \n\nWhat four common types of test strategies/approaches did the test manager implement in the test plan?",
    options: [
      "methodical, analytical, reactive and regression-averse.",
      "analytical, model-based, consultative and reactive.",
      "model-based, methodical, analytical and consultative.",
      "regression-averse, consultative, reactive and methodical."
    ],
    correctAnswer: 1,
    correctAnswers: [],
    explanation: "1=Reactive, 2=Analytical (CI), 3=Analytical (risk-based), 4=Consultative (external experts)."
  },
  {
    id: 36,
    type: "single",
    question: "Which one of the following is the characteristic of a metrics-based approach for test estimation?",
    options: [
      "Budget which was used by a previous similar test project.",
      "Overall experience collected in interviews with test managers.",
      "Estimation of effort for test automation agreed in the test team.",
      "Average of calculations collected from business experts."
    ],
    correctAnswer: 0,
    correctAnswers: [],
    explanation: "Metrics-based estimation uses historical data from similar projects."
  },
  {
    id: 37,
    type: "single",
    question: " As a test manager you are responsible for testing the following requirements:\n\nR1 - Process anomalies\nR2 - Synchronization\nR3 - Approval\nR4 - Problem solvin\nR5 - Financial data\nR6 - Diagram data\nR7 - Changes to the user profile\nNotation: Logical requirement dependencies (A -> B means, that depends on A):",
    options: [
      "R1 -> R3 -> R4 -> R7 -> R2 -> R5 -> R6 .","R1 -> R3 -> R2 -> R4 -> R7 -> R5 -> R6.","R1 -> R3 -> R2 -> R5 -> R6 -> R4 -> R7.","R1 -> R2 -> R5 -> R6 -> R3 -> R4 -> R7."
      
    ],
    correctAnswer: 2,
    correctAnswers: [],
    explanation: "",
    image:"https://res.cloudinary.com/dlrpmew9d/image/upload/v1754976148/Screenshot_from_2025-08-12_10-25-17_apblub.png"
  },
  {
    id: 38,
    type: "single",
    question: "You are testing a new version of software for a coffee machine. The machine can prepare different types of coffee based on four categories. i.e., coffee size, sugar, milk, and syrup. The criteria are as follows:\n\n Coffee size (small, medium, large),\n Sugar (none, 1 unit, 2 units, 3 units, 4 units),\n Milk (yes or no),\n Coffee flavor syrup (no syrup, caramel, hazelnut, vanilla).\n Now you are writing a defect report with the following information:\n Title: Low coffee temperature.\n Short summary: When you select coffee with milk, the time for preparing coffee is too long and the temperature of the beverage is too low (less than 40 °C ) \nExpected result: The temperature of coffee should be standard (about 75 °C). Degree of risk: Medium Priority: Normal\n\n What valuable information was omitted in the above defect report?",
    options: [
      "The actual test result.",
      "Data identifying the tested coffee machine.",
      "Status of the defect.",
      "Ideas for improving the test case."
    ],
    correctAnswer: 1,
    correctAnswers: [],
    explanation: "Defect reports must include environment/test item identification (e.g., device ID)."
  },
  {
    id: 39,
    type: "single",
    question: "Which one of the following is MOST likely to be a benefit of test execution tools?",
    options: [
      "It is easy to create regression tests.",
      "It is easy to maintain version control of test assets.",
      "It is easy to design tests for security testing.",
      "It is easy to run regression tests."
    ],
    correctAnswer: 3,
    correctAnswers: [],
    explanation: "Execution tools automate test runs, making regression testing efficient."
  },
  {
    id: 40,
    type: "single",
    question: "Which test tool (A-D) is characterized by the classification (1-4) below?\n 1. Tool support for management of testing and testware. \n2. Tool support for static testing.\n 3. Tool support for test execution and logging.\n 4. Tool support for performance measurement and dynamic analysis. \n\nA. Coverage tools.\n B. Configuration management tools.\n C. Review tools.\n D. Monitoring tools.",
    options: [
      "1A, 2B, 3D, 4C",
      "1B, 2C, 3D, 4A",
      "1A, 2C, 3D, 4B",
      "1B, 2C, 3A, 4D"
    ],
    correctAnswer: 1,
    correctAnswers: [],
    explanation: "1B=Config mgmt, 2C=Review tools, 3D=Execution/logging, 4A=Performance/dynamic (coverage)."
  }
]