# Admin Panel User Guide

This guide explains how to use the NSTQB website admin panel, with extra detail for exam schedules, the homepage exam calendar, exam registrations, and the exam question bank.

## Accessing the Admin Panel

1. Open the admin sign-in page.
2. Log in with an authorized admin account.
3. After login, the app redirects to `/admin`.
4. Use the dashboard cards to open the section you need:
   - Page Admin: `/page-admin`
   - Blog Admin: `/blog-admin`
   - Events Admin: `/events-admin`
   - Exam Registrations: `/registration-admin`
   - Notices: `/notice-admin`
   - Question Bank: `/exam-admin`

Use the Logout button in the top-right corner when finished.

## Page Admin

Open `/page-admin` from the Page Admin dashboard card. This page manages several public website sections:

- Certified Testers Management
- Hero Carousel Slides
- Exam Schedule & Dates
- Board Members Gallery
- Announcement Tickers

The exam calendar and public exam schedule are managed from the Exam Schedule & Dates section.

## Adding an Exam Date to the Calendar

1. Go to `/admin`.
2. Click Page Admin.
3. Scroll to Exam Schedule & Dates.
4. In Add New Exam, enter:
   - Exam Title: for example, `ISTQB CTFL 4.0`
   - Exam Date: the actual exam date
   - Registration Deadline: the last date candidates can register
   - Location: the exam venue or location note
5. Click Add Exam.

After adding the exam, the same record is used by:

- Homepage exam calendar component
- `/exam-schedule` public schedule page
- `/registration` exam date summary
- Registration confirmation email exam date/location lookup

The calendar highlights days where an exam exists. The Upcoming Exams list shows the exam title, exam date, registration deadline, and location. If the exam date has passed, it is shown as completed. If the registration deadline has passed, registration is shown as closed.

## Editing an Exam Date

1. Go to `/page-admin`.
2. Scroll to Exam Schedule & Dates.
3. Find the exam in the Exam Schedule list.
4. Click Edit.
5. Update the title, exam date, registration deadline, or location.
6. Click Save Changes.

Public pages refresh from the same `/api/exam-date` data, so the updated exam information appears wherever the exam schedule is shown.

## Deleting an Exam Date

1. Go to `/page-admin`.
2. Scroll to Exam Schedule & Dates.
3. Find the exam.
4. Click Delete.

Deleting removes the exam from the admin list, homepage calendar, public exam schedule, and registration date summary.

## Exam Registrations

Open `/registration-admin` from the Exam Registrations dashboard card.

This page is used to review CTFL registration submissions. Each registration card shows:

- Candidate name
- Email and phone number
- Company name
- Designation
- Citizenship number
- Application date
- Current status: `PENDING`, `COMPLETED`, or `REJECTED`
- Uploaded payment screenshot link

### Approving a Registration

1. Open `/registration-admin`.
2. Find a registration with `PENDING` status.
3. Click View Screenshot and verify the uploaded payment proof.
4. Click Approve.
5. Confirm the approval in the popup.

The registration status changes to `COMPLETED`. The system also sends the candidate a registration success email using the first available exam schedule record from `/api/exam-date`.

### Rejecting a Registration

1. Open `/registration-admin`.
2. Find a registration with `PENDING` status.
3. Click Reject.
4. Enter a rejection reason.
5. Confirm the rejection.

The registration status changes to `REJECTED`, and the rejection reason is shown on the registration card.

## Exam Question Bank

Open `/exam-admin` from the Question Bank dashboard card.

Use this section to manage mock exam or practice question sets.

Typical workflow:

1. Create a question set with a clear title.
2. Select the question set.
3. Add questions to the selected set.
4. Choose the question type:
   - Single answer
   - Multiple answer
5. Add at least two answer options.
6. Mark the correct answer or answers.
7. Add an explanation.
8. Save the question.

You can edit or delete existing questions and question sets from the same page.

## Exam Fee

The public exam fee display has been updated from `NPR 21,000` / `Rs.21,000` to `€130`.

The updated fee appears on:

- `/exam-schedule`
- `/registration` order summary

## Operational Notes

- Add the exam schedule before opening registration so candidates see the correct date.
- Keep the registration deadline earlier than or equal to the exam date.
- Use a clear location value, such as a venue name, `Online`, or `To be announced`.
- Review payment screenshots before approving registrations.
- If an approved candidate receives the wrong exam date in email, check the exam schedule list and ensure the intended upcoming exam exists correctly.
