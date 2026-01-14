# RITVerse Backend API Documentation

## Table of Contents

1. [Overview](#overview)
2. [Base URL](#base-url)
3. [API Endpoints](#api-endpoints)
   - [Health Check](#1-health-check)
   - [Get Questions](#2-get-questions)
   - [Submit Quiz Answers](#3-submit-quiz-answers)
   - [Add Student to Sheets](#4-add-student-to-sheets)
4. [Data Models](#data-models)
5. [Enums](#enums)
6. [Error Handling](#error-handling)
7. [Rate Limiting](#rate-limiting)
8. [Example Integration](#example-integration)

---

## Overview

The RITVerse Backend API is a NestJS-based REST API designed to support a career exploration quiz application. The API allows students to:

- Retrieve quiz questions
- Submit quiz answers and receive personalized career recommendations
- Register student information

The API processes quiz responses to determine student interests and personality traits, then generates an "Explorer Pass" with career path recommendations, strengths, and skills.

---

## Base URL

```
https://students-persona-backend.onrender.com
```

**Production URL:** (Update with your production URL)

**Note:** The API supports CORS and accepts requests from any origin. The server runs on port 3000 by default (configurable via `PORT` environment variable).

---

## API Endpoints

### 1. Health Check

Check if the API server is running.

**Endpoint:** `GET /`

**Description:** Returns a simple "Hello World!" message to verify the API is operational.

**Request:**

```http
GET / HTTP/1.1
Host: localhost:3000
```

**Response:**

```json
"Hello World!"
```

**Status Code:** `200 OK`

---

### 2. Get Questions

Retrieve all quiz questions to start the quiz.

**Endpoint:** `GET /question/start`

**Description:** Returns an array of all quiz questions. Each question includes its ID, planet category, question text, multi-select configuration, and available options with their corresponding interest buckets and personality traits.

**Request:**

```http
GET /question/start HTTP/1.1
Host: localhost:3000
```

**Response:**

```json
[
  {
    "id": 1,
    "planet": "NEUTRON",
    "text": "🚀 Which subjects do you enjoy learning?",
    "multiSelect": true,
    "maxSelect": 3,
    "options": {
      "A": {
        "text": "➗ Maths",
        "mapsTo": ["LOGICAL"]
      },
      "B": {
        "text": "🔬 Science",
        "mapsTo": ["LOGICAL"]
      },
      "C": {
        "text": "💻 Computers",
        "mapsTo": ["LOGICAL"]
      },
      "D": {
        "text": "📚 English ",
        "mapsTo": ["CREATIVE"]
      },
      "E": {
        "text": "✨ Social",
        "mapsTo": ["CREATIVE"]
      },
      "F": {
        "text": "🏅 Sports",
        "mapsTo": ["CREATIVE"]
      }
    }
  },
  {
    "id": 2,
    "planet": "NEUTRON",
    "text": "📘 How do you learn best?",
    "multiSelect": false,
    "options": {
      "A": {
        "text": "🎮 By trying it myself",
        "mapsTo": ["INDEPENDENT"]
      },
      "B": {
        "text": "👀 By watching videos",
        "mapsTo": ["PEOPLE_FRIENDLY"]
      },
      "C": {
        "text": "📖 By reading books",
        "mapsTo": ["PLANNED"]
      },
      "D": {
        "text": "👂 By listening to explanations",
        "mapsTo": ["PEOPLE_FRIENDLY"]
      }
    }
  }
  // ... more questions
]
```

**Response Fields:**

- `id` (number): Unique identifier for the question
- `planet` (string): Category of the question. Possible values: `"NEUTRON"`, `"TALENT"`, `"ORBIT"`, `"FUTURIA"`
- `text` (string): The question text
- `multiSelect` (boolean): Whether multiple options can be selected
- `maxSelect` (number, optional): Maximum number of options that can be selected (only present if `multiSelect` is `true`)
- `options` (object): Available answer options. Keys are `"A"`, `"B"`, `"C"`, `"D"`, `"E"`, `"F"` (not all keys may be present)
  - Each option contains:
    - `text` (string): The option text
    - `mapsTo` (string[]): Array of interest buckets or personality traits this option maps to

**Status Code:** `200 OK`

**Example JavaScript Fetch:**

```javascript
const response = await fetch('http://localhost:3000/question/start');
const questions = await response.json();
console.log(questions);
```

---

### 3. Submit Quiz Answers

Submit quiz answers and receive personalized career recommendations.

**Endpoint:** `POST /quiz/submit`

**Description:** Processes quiz answers along with student profile information. Calculates interest scores and personality traits, then generates an Explorer Pass with career path recommendations, strengths, and skills. The student data is also saved to Google Sheets (unless in demo mode).

**Request:**

```http
POST /quiz/submit HTTP/1.1
Host: localhost:3000
Content-Type: application/json
```

**Request Body:**

```json
{
  "student": {
    "name": "John Doe",
    "class": "10",
    "section": "A",
    "school": "ABC High School",
    "city": "Mumbai",
    "email": "john.doe@example.com",
    "mobile": "9876543210"
  },
  "answers": [
    {
      "questionId": 1,
      "selectedOptions": ["A", "B", "C"]
    },
    {
      "questionId": 2,
      "selectedOptions": ["A"]
    },
    {
      "questionId": 3,
      "selectedOptions": ["A"]
    },
    {
      "questionId": 4,
      "selectedOptions": ["A", "B"]
    },
    {
      "questionId": 5,
      "selectedOptions": ["A"]
    },
    {
      "questionId": 6,
      "selectedOptions": ["A"]
    },
    {
      "questionId": 7,
      "selectedOptions": ["D"]
    },
    {
      "questionId": 8,
      "selectedOptions": ["A"]
    }
  ]
}
```

**Request Body Schema:**

**Student Profile (`student`):**

- `name` (string, required): Student's full name
- `class` (string, required): Student's class/grade
- `section` (string, required): Student's section
- `school` (string, required): School name
- `city` (string, required): City name
- `email` (string, required): Valid email address
- `mobile` (string, required): Mobile number (as string, numeric)

**Answer Array (`answers`):**

- Array of answer objects, each containing:
  - `questionId` (number, required): The ID of the question being answered
  - `selectedOptions` (string[], required): Array of selected option letters. Valid values: `"A"`, `"B"`, `"C"`, `"D"`, `"E"`, `"F"`
    - For single-select questions, array should contain one element
    - For multi-select questions, array can contain multiple elements (respecting `maxSelect` if specified)

**Response:**

```json
{
  "status": "APPROVED",
  "explorerType": "Stem Tech",
  "careerPath": "STEM_TECH",
  "strengths": ["Logical thinking", "Problem solving"],
  "skills": ["Basic coding", "Math practice", "STEM projects"],
  "message": "You've unlocked entry into RITverse 🌌"
}
```

**Response Fields:**

- `status` (string): Always `"APPROVED"` for successful submissions
- `explorerType` (string): Human-readable career family name (e.g., `"Stem Tech"`, `"Creative Media"`, `"Education Helping"`, `"Skilled Action"`, `"Business Leadership"`)
- `careerPath` (string): Career family enum value. Possible values: `"STEM_TECH"`, `"CREATIVE_MEDIA"`, `"EDUCATION_HELPING"`, `"SKILLED_ACTION"`, `"BUSINESS_LEADERSHIP"`
- `strengths` (string[]): Array of identified strengths based on the career path
- `skills` (string[]): Array of recommended skills to develop
- `message` (string): Success message

**Status Codes:**

- `200 OK`: Successful submission
- `400 Bad Request`: Invalid request data (see Error Handling section)

**Example JavaScript Fetch:**

```javascript
const submitData = {
  student: {
    name: 'John Doe',
    class: '10',
    section: 'A',
    school: 'ABC High School',
    city: 'Mumbai',
    email: 'john.doe@example.com',
    mobile: '9876543210',
  },
  answers: [
    { questionId: 1, selectedOptions: ['A', 'B'] },
    { questionId: 2, selectedOptions: ['A'] },
    // ... more answers
  ],
};

const response = await fetch('http://localhost:3000/quiz/submit', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(submitData),
});

const result = await response.json();
console.log(result);
```

**Error Responses:**

**Invalid Question ID:**

```json
{
  "statusCode": 400,
  "message": "Invalid question ID",
  "error": "Bad Request"
}
```

**Invalid Option:**

```json
{
  "statusCode": 400,
  "message": "Invalid option A for question 1",
  "error": "Bad Request"
}
```

**Validation Error:**

```json
{
  "statusCode": 400,
  "message": [
    "student.name should not be empty",
    "student.email must be an email",
    "answers must be an array"
  ],
  "error": "Bad Request"
}
```

---

### 4. Add Student to Sheets

Add a student record directly to Google Sheets (used internally by quiz submission, but available as standalone endpoint).

**Endpoint:** `POST /sheets/student`

**Description:** Adds a student record to Google Sheets with their profile information and explorer pass details. This endpoint is rate-limited (30 requests per minute).

**Request:**

```http
POST /sheets/student HTTP/1.1
Host: localhost:3000
Content-Type: application/json
```

**Request Body:**

```json
{
  "name": "John Doe",
  "class": "10",
  "section": "A",
  "school": "ABC High School",
  "city": "Mumbai",
  "email": "john.doe@example.com",
  "mobile": "9876543210",
  "careerPath": "STEM_TECH",
  "strengths": ["Logical thinking", "Problem solving"],
  "skills": ["Basic coding", "Math practice", "STEM projects"]
}
```

**Request Body Schema:**

- `name` (string, required): Student's full name
- `class` (string, required): Student's class/grade
- `section` (string, required): Student's section
- `school` (string, required): School name
- `city` (string, required): City name
- `email` (string, required): Valid email address
- `mobile` (string, required): Mobile number
- `careerPath` (string, required): Career family enum value
- `strengths` (string[], required): Array of strengths
- `skills` (string[], required): Array of skills

**Response:**

```json
{
  "message": "Student saved for RITverse"
}
```

**Status Codes:**

- `200 OK`: Student data queued for saving
- `400 Bad Request`: Validation errors
- `429 Too Many Requests`: Rate limit exceeded

**Note:** In demo mode (`DEMO_MODE=true`), the response will be:

```json
{
  "message": "Demo submission successful"
}
```

**Example JavaScript Fetch:**

```javascript
const studentData = {
  name: 'John Doe',
  class: '10',
  section: 'A',
  school: 'ABC High School',
  city: 'Mumbai',
  email: 'john.doe@example.com',
  mobile: '9876543210',
  careerPath: 'STEM_TECH',
  strengths: ['Logical thinking', 'Problem solving'],
  skills: ['Basic coding', 'Math practice', 'STEM projects'],
};

const response = await fetch('http://localhost:3000/sheets/student', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(studentData),
});

const result = await response.json();
console.log(result);
```

---

## Data Models

### Question Interface

```typescript
interface Question {
  id: number;
  planet: 'NEUTRON' | 'TALENT' | 'ORBIT' | 'FUTURIA';
  text: string;
  multiSelect: boolean;
  maxSelect?: number;
  options: {
    A?: QuestionOption;
    B?: QuestionOption;
    C?: QuestionOption;
    D?: QuestionOption;
    E?: QuestionOption;
    F?: QuestionOption;
  };
}

interface QuestionOption {
  text: string;
  mapsTo: string[]; // InterestBucket | PersonalityTrait
}
```

### Student Profile DTO

```typescript
interface StudentProfileDto {
  name: string;
  class: string;
  section: string;
  school: string;
  city: string;
  email: string;
  mobile: string;
}
```

### Answer DTO

```typescript
interface AnswerDto {
  questionId: number;
  selectedOptions: ('A' | 'B' | 'C' | 'D' | 'E' | 'F')[];
}
```

### Explorer Pass Response

```typescript
interface ExplorerPass {
  status: 'APPROVED';
  explorerType: string;
  careerPath: string;
  strengths: string[];
  skills: string[];
  message: string;
}
```

---

## Enums

### Interest Bucket

Represents different interest categories:

```typescript
enum InterestBucket {
  CREATIVE = 'CREATIVE', // Art, Music, Design, Content
  LOGICAL = 'LOGICAL', // Maths, Science, Computers
  SOCIAL = 'SOCIAL', // Helping, Teaching, Empathy
  PRACTICAL = 'PRACTICAL', // Sports, Hands-on, Building
  LEADERSHIP = 'LEADERSHIP', // Leading, Organizing, Speaking
}
```

### Personality Trait

Represents different personality traits:

```typescript
enum PersonalityTrait {
  PEOPLE_FRIENDLY = 'PEOPLE_FRIENDLY',
  INDEPENDENT = 'INDEPENDENT',
  PLANNED = 'PLANNED',
  FLEXIBLE = 'FLEXIBLE',
}
```

### Career Family

Represents different career path categories:

```typescript
enum CareerFamily {
  STEM_TECH = 'STEM_TECH',
  CREATIVE_MEDIA = 'CREATIVE_MEDIA',
  EDUCATION_HELPING = 'EDUCATION_HELPING',
  SKILLED_ACTION = 'SKILLED_ACTION',
  BUSINESS_LEADERSHIP = 'BUSINESS_LEADERSHIP',
}
```

**Career Family Mappings:**

| Career Family         | Explorer Type Display | Interests          | Traits          | Strengths                         | Skills                                     |
| --------------------- | --------------------- | ------------------ | --------------- | --------------------------------- | ------------------------------------------ |
| `STEM_TECH`           | "Stem Tech"           | LOGICAL, PRACTICAL | PLANNED         | Logical thinking, Problem solving | Basic coding, Math practice, STEM projects |
| `CREATIVE_MEDIA`      | "Creative Media"      | CREATIVE           | FLEXIBLE        | Imagination, Visual creativity    | Drawing, Canva, Content creation           |
| `EDUCATION_HELPING`   | "Education Helping"   | SOCIAL             | PEOPLE_FRIENDLY | Empathy, Communication            | Explaining concepts, Helping peers         |
| `SKILLED_ACTION`      | "Skilled Action"      | PRACTICAL          | INDEPENDENT     | Hands-on ability, Focus           | Sports practice, DIY building              |
| `BUSINESS_LEADERSHIP` | "Business Leadership" | LEADERSHIP         | PLANNED         | Leadership, Decision making       | Public speaking, Event organizing          |

---

## Error Handling

The API uses standard HTTP status codes and returns error responses in the following format:

### Error Response Format

```json
{
  "statusCode": 400,
  "message": "Error message or array of validation errors",
  "error": "Error type"
}
```

### Common Status Codes

- `200 OK`: Request successful
- `400 Bad Request`: Invalid request data or validation errors
- `429 Too Many Requests`: Rate limit exceeded (for `/sheets/student` endpoint)
- `500 Internal Server Error`: Server error

### Validation Errors

When validation fails, the `message` field will contain an array of error messages:

```json
{
  "statusCode": 400,
  "message": [
    "student.name should not be empty",
    "student.email must be an email",
    "answers must be an array",
    "answers[0].questionId must be a number"
  ],
  "error": "Bad Request"
}
```

### Common Error Scenarios

1. **Missing Required Fields:**

   ```json
   {
     "statusCode": 400,
     "message": ["student.name should not be empty"],
     "error": "Bad Request"
   }
   ```

2. **Invalid Email Format:**

   ```json
   {
     "statusCode": 400,
     "message": ["student.email must be an email"],
     "error": "Bad Request"
   }
   ```

3. **Invalid Question ID:**

   ```json
   {
     "statusCode": 400,
     "message": "Invalid question ID",
     "error": "Bad Request"
   }
   ```

4. **Invalid Option Selection:**

   ```json
   {
     "statusCode": 400,
     "message": "Invalid option X for question Y",
     "error": "Bad Request"
   }
   ```

5. **Rate Limit Exceeded:**
   ```json
   {
     "statusCode": 429,
     "message": "ThrottlerException: Too Many Requests",
     "error": "Too Many Requests"
   }
   ```

---

## Rate Limiting

The `/sheets/student` endpoint is rate-limited to prevent abuse:

- **Limit:** 30 requests per minute
- **Window:** 60 seconds (1 minute)
- **Response:** `429 Too Many Requests` when limit is exceeded

Other endpoints (`/`, `/question/start`, `/quiz/submit`) are not rate-limited.

---

## Example Integration

### Complete Quiz Flow Example

Here's a complete example of how to integrate the API in a frontend application:

```javascript
// Step 1: Fetch questions
async function startQuiz() {
  try {
    const response = await fetch('http://localhost:3000/question/start');
    if (!response.ok) {
      throw new Error('Failed to fetch questions');
    }
    const questions = await response.json();
    return questions;
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw error;
  }
}

// Step 2: Collect answers from user
function collectAnswers(questions, userSelections) {
  return questions.map((question) => ({
    questionId: question.id,
    selectedOptions: userSelections[question.id] || [],
  }));
}

// Step 3: Submit quiz
async function submitQuiz(studentProfile, answers) {
  try {
    const response = await fetch('http://localhost:3000/quiz/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        student: studentProfile,
        answers: answers,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to submit quiz');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error submitting quiz:', error);
    throw error;
  }
}

// Complete flow
async function completeQuizFlow() {
  try {
    // 1. Get questions
    const questions = await startQuiz();
    console.log('Questions loaded:', questions.length);

    // 2. Display questions to user and collect answers
    // (This would be handled by your UI)
    const userSelections = {
      1: ['A', 'B'],
      2: ['A'],
      3: ['C'],
      // ... more selections
    };

    const answers = collectAnswers(questions, userSelections);

    // 3. Collect student profile
    const studentProfile = {
      name: 'John Doe',
      class: '10',
      section: 'A',
      school: 'ABC High School',
      city: 'Mumbai',
      email: 'john.doe@example.com',
      mobile: '9876543210',
    };

    // 4. Submit quiz
    const explorerPass = await submitQuiz(studentProfile, answers);
    console.log('Explorer Pass:', explorerPass);

    // 5. Display results to user
    return explorerPass;
  } catch (error) {
    console.error('Quiz flow error:', error);
    // Handle error in UI
  }
}
```

### React Example

```jsx
import React, { useState, useEffect } from 'react';

function QuizComponent() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch questions on component mount
    fetch('http://localhost:3000/question/start')
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch((err) => console.error('Error:', err));
  }, []);

  const handleAnswerChange = (questionId, selectedOptions) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: selectedOptions,
    }));
  };

  const handleSubmit = async (studentProfile) => {
    setLoading(true);
    try {
      const answersArray = Object.entries(answers).map(
        ([questionId, selectedOptions]) => ({
          questionId: parseInt(questionId),
          selectedOptions: selectedOptions,
        }),
      );

      const response = await fetch('http://localhost:3000/quiz/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          student: studentProfile,
          answers: answersArray,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Submission failed');
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Submission error:', error);
      alert('Failed to submit quiz: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Render questions and collect answers */}
      {questions.map((question) => (
        <div key={question.id}>
          <h3>{question.text}</h3>
          {Object.entries(question.options).map(([key, option]) => (
            <label key={key}>
              <input
                type={question.multiSelect ? 'checkbox' : 'radio'}
                name={`question-${question.id}`}
                value={key}
                onChange={(e) => {
                  const current = answers[question.id] || [];
                  if (question.multiSelect) {
                    const updated = e.target.checked
                      ? [...current, key]
                      : current.filter((opt) => opt !== key);
                    handleAnswerChange(question.id, updated);
                  } else {
                    handleAnswerChange(question.id, [key]);
                  }
                }}
              />
              {option.text}
            </label>
          ))}
        </div>
      ))}

      {/* Submit button */}
      <button onClick={() => handleSubmit(studentProfile)} disabled={loading}>
        {loading ? 'Submitting...' : 'Submit Quiz'}
      </button>

      {/* Display results */}
      {result && (
        <div>
          <h2>{result.explorerType}</h2>
          <p>{result.message}</p>
          <h3>Strengths:</h3>
          <ul>
            {result.strengths.map((strength, i) => (
              <li key={i}>{strength}</li>
            ))}
          </ul>
          <h3>Skills to Develop:</h3>
          <ul>
            {result.skills.map((skill, i) => (
              <li key={i}>{skill}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default QuizComponent;
```

---

## Notes for Frontend Developers

1. **CORS:** The API has CORS enabled for all origins, so you can make requests from any frontend application.

2. **Content-Type:** Always include `Content-Type: application/json` header for POST requests.

3. **Validation:** The API uses class-validator, so ensure all required fields are provided and formatted correctly.

4. **Question IDs:** Question IDs are sequential integers starting from 1. Always use the exact question IDs returned from the `/question/start` endpoint.

5. **Option Selection:**
   - For single-select questions (`multiSelect: false`), send an array with one element.
   - For multi-select questions (`multiSelect: true`), respect the `maxSelect` limit if specified.
   - Valid option values are: `"A"`, `"B"`, `"C"`, `"D"`, `"E"`, `"F"`.

6. **Error Handling:** Always check the response status and handle errors appropriately. Validation errors return arrays of error messages.

7. **Rate Limiting:** The `/sheets/student` endpoint is rate-limited. Implement retry logic with exponential backoff if needed.

8. **Demo Mode:** If `DEMO_MODE=true`, the sheets endpoint will return a success message without actually saving to Google Sheets.

---

## Support

For issues or questions, please contact the backend development team or refer to the project repository.

---

**Last Updated:** [Current Date]
**API Version:** 0.0.1
**Backend Framework:** NestJS
