// Quiz Questions Database
const quizQuestions = [
    {
        id: 1,
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Tech Modern Language",
            "Home Tool Markup Language",
            "Hyperlinks and Text Markup Language"
        ],
        correct: 0
    },
    {
        id: 2,
        question: "Which CSS property is used to change the text color of an element?",
        options: [
            "text-color",
            "font-color",
            "color",
            "text-style"
        ],
        correct: 2
    },
    {
        id: 3,
        question: "What does CSS stand for?",
        options: [
            "Creative Style Sheets",
            "Cascading Style Sheets",
            "Computer Style Sheets",
            "Colorful Style Sheets"
        ],
        correct: 1
    },
    {
        id: 4,
        question: "Which JavaScript method is used to access an HTML element by its id?",
        options: [
            "getElementByID()",
            "getElementById()",
            "getElement()",
            "querySelector()"
        ],
        correct: 1
    },
    {
        id: 5,
        question: "What is the correct HTML element for inserting a line break?",
        options: [
            "<break>",
            "<lb>",
            "<br>",
            "<newline>"
        ],
        correct: 2
    },
    {
        id: 6,
        question: "Which symbol is used for single line comments in JavaScript?",
        options: [
            "//",
            "/*",
            "#",
            "--"
        ],
        correct: 0
    },
    {
        id: 7,
        question: "What is the correct way to declare a JavaScript variable?",
        options: [
            "variable x;",
            "var x;",
            "v x;",
            "declare x;"
        ],
        correct: 1
    },
    {
        id: 8,
        question: "Which HTML attribute is used to define inline styles?",
        options: [
            "class",
            "styles",
            "style",
            "font"
        ],
        correct: 2
    },
    {
        id: 9,
        question: "What does the 'typeof' operator in JavaScript return?",
        options: [
            "The value of a variable",
            "The data type of a variable",
            "The name of a variable",
            "The memory address"
        ],
        correct: 1
    },
    {
        id: 10,
        question: "Which CSS property controls the text size?",
        options: [
            "text-size",
            "font-style",
            "text-style",
            "font-size"
        ],
        correct: 3
    }
];

// You can easily add more questions by following the same format
// Just add objects to the array with id, question, options array, and correct answer index