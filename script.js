// Quiz Application JavaScript

// State Management
const state = {
    currentQuestion: 0,
    score: 0,
    answers: [],
    username: '',
    startTime: null,
    timeElapsed: 0,
    timerInterval: null
};

// DOM Elements
const elements = {
    // Screens
    welcomeScreen: document.getElementById('welcome-screen'),
    quizScreen: document.getElementById('quiz-screen'),
    resultsScreen: document.getElementById('results-screen'),
    reviewScreen: document.getElementById('review-screen'),
    
    // Welcome Screen
    usernameInput: document.getElementById('username'),
    startBtn: document.getElementById('start-btn'),
    
    // Quiz Screen
    questionCounter: document.getElementById('question-counter'),
    timer: document.getElementById('timer'),
    progress: document.getElementById('progress'),
    question: document.getElementById('question'),
    optionsContainer: document.getElementById('options'),
    prevBtn: document.getElementById('prev-btn'),
    nextBtn: document.getElementById('next-btn'),
    
    // Results Screen
    resultUsername: document.getElementById('result-username'),
    scoreDisplay: document.getElementById('score'),
    correctAnswers: document.getElementById('correct-answers'),
    wrongAnswers: document.getElementById('wrong-answers'),
    timeTaken: document.getElementById('time-taken'),
    percentage: document.getElementById('percentage'),
    reviewBtn: document.getElementById('review-btn'),
    restartBtn: document.getElementById('restart-btn'),
    
    // Review Screen
    reviewList: document.getElementById('review-list'),
    backToResultsBtn: document.getElementById('back-to-results-btn')
};

// Initialize Event Listeners
function initializeEventListeners() {
    elements.startBtn.addEventListener('click', startQuiz);
    elements.prevBtn.addEventListener('click', previousQuestion);
    elements.nextBtn.addEventListener('click', nextQuestion);
    elements.reviewBtn.addEventListener('click', showReview);
    elements.restartBtn.addEventListener('click', restartQuiz);
    elements.backToResultsBtn.addEventListener('click', () => {
        showScreen('results-screen');
    });
    
    // Allow Enter key to start quiz
    elements.usernameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            startQuiz();
        }
    });
}

// Screen Management
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

// Start Quiz
function startQuiz() {
    const username = elements.usernameInput.value.trim();
    
    if (!username) {
        alert('Please enter your name!');
        elements.usernameInput.focus();
        return;
    }
    
    // Reset state
    state.username = username;
    state.currentQuestion = 0;
    state.score = 0;
    state.answers = new Array(quizQuestions.length).fill(null);
    state.startTime = Date.now();
    
    // Start timer
    startTimer();
    
    // Show quiz screen
    showScreen('quiz-screen');
    loadQuestion();
}

// Timer Functions
function startTimer() {
    state.timerInterval = setInterval(() => {
        state.timeElapsed = Math.floor((Date.now() - state.startTime) / 1000);
        updateTimerDisplay();
    }, 1000);
}

function stopTimer() {
    if (state.timerInterval) {
        clearInterval(state.timerInterval);
    }
}

function updateTimerDisplay() {
    const minutes = Math.floor(state.timeElapsed / 60);
    const seconds = state.timeElapsed % 60;
    elements.timer.textContent = `Time: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

// Load Question
function loadQuestion() {
    const currentQ = quizQuestions[state.currentQuestion];
    
    // Update question counter
    elements.questionCounter.textContent = `Question ${state.currentQuestion + 1} of ${quizQuestions.length}`;
    
    // Update progress bar
    const progressPercent = ((state.currentQuestion + 1) / quizQuestions.length) * 100;
    elements.progress.style.width = `${progressPercent}%`;
    
    // Display question
    elements.question.textContent = currentQ.question;
    
    // Display options
    elements.optionsContainer.innerHTML = '';
    currentQ.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.classList.add('option');
        optionDiv.textContent = option;
        optionDiv.dataset.index = index;
        
        // If user has already answered this question, show their selection
        if (state.answers[state.currentQuestion] !== null) {
            if (state.answers[state.currentQuestion] === index) {
                optionDiv.classList.add('selected');
            }
        }
        
        optionDiv.addEventListener('click', () => selectOption(index));
        elements.optionsContainer.appendChild(optionDiv);
    });
    
    // Update button states
    updateNavigationButtons();
}

// Select Option
function selectOption(index) {
    // Remove previous selection
    document.querySelectorAll('.option').forEach(opt => {
        opt.classList.remove('selected');
    });
    
    // Add selection to clicked option
    const selectedOption = document.querySelector(`.option[data-index="${index}"]`);
    selectedOption.classList.add('selected');
    
    // Save answer
    state.answers[state.currentQuestion] = index;
    
    // Enable next button
    elements.nextBtn.disabled = false;
}

// Navigation
function previousQuestion() {
    if (state.currentQuestion > 0) {
        state.currentQuestion--;
        loadQuestion();
    }
}

function nextQuestion() {
    if (state.currentQuestion < quizQuestions.length - 1) {
        state.currentQuestion++;
        loadQuestion();
    } else {
        // Quiz completed
        finishQuiz();
    }
}

function updateNavigationButtons() {
    // Previous button
    elements.prevBtn.disabled = state.currentQuestion === 0;
    
    // Next button
    if (state.answers[state.currentQuestion] !== null) {
        elements.nextBtn.disabled = false;
    } else {
        elements.nextBtn.disabled = true;
    }
    
    // Change next button text on last question
    if (state.currentQuestion === quizQuestions.length - 1) {
        elements.nextBtn.textContent = 'Finish';
    } else {
        elements.nextBtn.textContent = 'Next';
    }
}

// Finish Quiz
function finishQuiz() {
    // Stop timer
    stopTimer();
    
    // Calculate score
    calculateScore();
    
    // Show results
    showResults();
}

function calculateScore() {
    state.score = 0;
    state.answers.forEach((answer, index) => {
        if (answer === quizQuestions[index].correct) {
            state.score++;
        }
    });
}

function showResults() {
    // Update result screen with data
    elements.resultUsername.textContent = state.username;
    elements.scoreDisplay.textContent = state.score;
    elements.correctAnswers.textContent = state.score;
    elements.wrongAnswers.textContent = quizQuestions.length - state.score;
    elements.timeTaken.textContent = formatTime(state.timeElapsed);
    
    const percentage = Math.round((state.score / quizQuestions.length) * 100);
    elements.percentage.textContent = `${percentage}%`;
    
    // Show results screen
    showScreen('results-screen');
}

// Review Answers
function showReview() {
    elements.reviewList.innerHTML = '';
    
    quizQuestions.forEach((question, index) => {
        const userAnswer = state.answers[index];
        const isCorrect = userAnswer === question.correct;
        
        const reviewItem = document.createElement('div');
        reviewItem.classList.add('review-item');
        reviewItem.classList.add(isCorrect ? 'correct' : 'wrong');
        
        const questionText = document.createElement('div');
        questionText.classList.add('review-question');
        questionText.textContent = `${index + 1}. ${question.question}`;
        
        const yourAnswer = document.createElement('div');
        yourAnswer.classList.add('review-answer', 'your-answer');
        yourAnswer.innerHTML = `<strong>Your Answer:</strong> ${userAnswer !== null ? question.options[userAnswer] : 'Not answered'}`;
        
        const correctAnswer = document.createElement('div');
        correctAnswer.classList.add('review-answer', 'correct-answer');
        correctAnswer.innerHTML = `<strong>Correct Answer:</strong> ${question.options[question.correct]}`;
        
        reviewItem.appendChild(questionText);
        reviewItem.appendChild(yourAnswer);
        
        if (!isCorrect) {
            reviewItem.appendChild(correctAnswer);
        }
        
        elements.reviewList.appendChild(reviewItem);
    });
    
    showScreen('review-screen');
}

// Restart Quiz
function restartQuiz() {
    // Reset username input
    elements.usernameInput.value = '';
    
    // Reset state
    state.currentQuestion = 0;
    state.score = 0;
    state.answers = [];
    state.username = '';
    state.timeElapsed = 0;
    
    // Stop any running timer
    stopTimer();
    
    // Show welcome screen
    showScreen('welcome-screen');
    elements.usernameInput.focus();
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    initializeEventListeners();
    elements.usernameInput.focus();
});