import Question from '../type/question';

const sampleQuestions: Question[] = [
  {
    id: "q1",
    question: "What does React primarily help developers build?",
    options: ["User Interfaces", "Mobile Games", "Databases", "Operating Systems"],
    correctAnswer: "User Interfaces",
  },
  {
    id: "q2",
    question: "Which language runs in a web browser?",
    options: ["Java", "C++", "Python", "JavaScript"],
    correctAnswer: "JavaScript",
  },
  {
    id: "q3",
    question: "Which hook is used to manage state in React?",
    options: ["useEffect", "useState", "useRef", "useReducer"],
    correctAnswer: "useState",
  },
  {
    id: "q4",
    question: "What does CSS stand for?",
    options: [
      "Cascading Style Sheets",
      "Creative Style System",
      "Computer Style Syntax",
      "Colorful Styling Script"
    ],
    correctAnswer: "Cascading Style Sheets",
  },
  {
    id: "q5",
    question: "Which HTML tag is used to define the largest heading?",
    options: ["<h6>", "<header>", "<h1>", "<title>"],
    correctAnswer: "<h1>",
  },
  {
    id: "q6",
    question: "Which HTTP method is commonly used to submit form data?",
    options: ["PUT", "POST", "DELETE", "OPTIONS"],
    correctAnswer: "POST",
  },
  {
    id: "q7",
    question: "Which of the following is a JavaScript framework?",
    options: ["Laravel", "Django", "React", "Flask"],
    correctAnswer: "React",
  },
  {
    id: "q8",
    question: "What does JSON stand for?",
    options: [
      "JavaScript Oriented Notation",
      "Java Standard Output Notation",
      "JavaScript Object Notation",
      "Joined Syntax Object Network"
    ],
    correctAnswer: "JavaScript Object Notation",
  },
  {
    id: "q9",
    question: "Which command initializes a new Node.js project?",
    options: ["node create", "npm init", "npm install", "node start"],
    correctAnswer: "npm init",
  },
  {
    id: "q10",
    question: "Which CSS property controls text size?",
    options: ["font-style", "font-size", "text-size", "text-style"],
    correctAnswer: "font-size",
  },
  {
    id: "q11",
    question: "Which part of a URL is responsible for identifying the resource path?",
    options: ["Protocol", "Domain", "Pathname", "Query String"],
    correctAnswer: "Pathname",
  },
  {
    id: "q12",
    question: "Which hook runs after every render by default?",
    options: ["useState", "useEffect", "useContext", "useMemo"],
    correctAnswer: "useEffect",
  }
];

export default sampleQuestions;