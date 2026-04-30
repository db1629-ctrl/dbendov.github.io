// --- DOM Elements ---
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const nextBtn = document.getElementById('next-btn');
const feedbackContainer = document.getElementById('feedback-container');
const feedbackTitle = document.getElementById('feedback-title');
const feedbackExplanation = document.getElementById('feedback-explanation');
const scoreDisplay = document.getElementById('score-display');
const streakDisplay = document.getElementById('streak-display');
const progressBar = document.getElementById('progress-bar');
const difficultyBadge = document.getElementById('difficulty-badge');
const questionTracker = document.getElementById('question-tracker');

// --- HARDCODED QUESTIONS (No more JSON fetch errors!) ---
const questions = [
    {
        question: "Which Microsoft Access tool is used to retrieve specific data from one or more tables based on certain criteria?",
        options: ["Forms", "Reports", "Queries", "Macros"],
        correctAnswerIndex: 2,
        points: 10,
        difficulty: "Easy",
        explanation: "Queries allow you to search and filter data across multiple tables in Access."
    },
    {
        question: "In Microsoft Access, what establishes the connection between two tables to ensure data integrity?",
        options: ["Primary Key / Foreign Key relationship", "Data Validation rules", "Lookup Wizard", "Index tags"],
        correctAnswerIndex: 0,
        points: 15,
        difficulty: "Medium",
        explanation: "Relationships between tables are built by linking the Primary Key of one table to the Foreign Key of another."
    },
    {
        question: "Which Excel tool allows you to summarize, analyze, explore, and present summary data easily?",
        options: ["VLOOKUP", "PivotTables", "Conditional Formatting", "Data Validation"],
        correctAnswerIndex: 1,
        points: 10,
        difficulty: "Easy",
        explanation: "PivotTables are powerful tools in Excel for quickly summarizing and analyzing large amounts of data."
    },
    {
        question: "If you want to find a specific value in a table and return a value in the same row from another column, which Excel function is best?",
        options: ["SUMIF", "CONCATENATE", "VLOOKUP (or XLOOKUP)", "COUNTIF"],
        correctAnswerIndex: 2,
        points: 10,
        difficulty: "Easy",
        explanation: "VLOOKUP searches for a value in a column and returns a corresponding value from another column."
    },
    {
        question: "What is the primary characteristic of a blockchain that makes it secure for accounting records?",
        options: ["It is centralized on a single server", "It is an immutable, distributed ledger", "It uses traditional double-entry spreadsheets", "It allows easy editing of past transactions"],
        correctAnswerIndex: 1,
        points: 15,
        difficulty: "Medium",
        explanation: "Blockchain is an immutable (unchangeable) and distributed ledger, meaning past records cannot be secretly altered."
    },
    {
        question: "In blockchain technology, what must happen before a new block of transactions is added to the chain?",
        options: ["A single administrator must approve it", "Network participants must reach a consensus", "The transaction must be printed out", "It must be converted to cryptocurrency"],
        correctAnswerIndex: 1,
        points: 20,
        difficulty: "Hard",
        explanation: "Blockchain relies on a consensus mechanism where multiple nodes in the network verify and agree on the transactions."
    },
    {
        question: "How is Artificial Intelligence (AI) most commonly used in modern accounting systems?",
        options: ["Automating repetitive tasks like data entry and invoice processing", "Replacing the need for physical cash", "Filing corporate taxes without human oversight", "Creating physical receipts for customers"],
        correctAnswerIndex: 0,
        points: 10,
        difficulty: "Easy",
        explanation: "AI currently excels at Robotic Process Automation (RPA), handling repetitive, rules-based tasks like matching invoices."
    },
    {
        question: "Which of the following is a risk associated with using AI in accounting?",
        options: ["It processes data too slowly", "It eliminates all potential for fraud", "Algorithmic bias and lack of transparency", "It requires physical paper trails"],
        correctAnswerIndex: 2,
        points: 15,
        difficulty: "Medium",
        explanation: "AI systems can sometimes have hidden biases or make decisions that are difficult for auditors to trace or explain (the 'black box' effect)."
    },
    {
        question: "What is the primary purpose of an Accounting Information System (AIS)?",
        options: ["To design marketing materials", "To collect, store, and process financial and accounting data", "To manage employee social media accounts", "To physically secure the office building"],
        correctAnswerIndex: 1,
        points: 10,
        difficulty: "Easy",
        explanation: "An AIS is designed specifically to handle the collection, storage, and processing of financial data to help management make decisions."
    },
    {
        question: "In an AIS, what is the principle of 'Segregation of Duties' designed to prevent?",
        options: ["Software bugs", "Data loss from hardware failure", "Fraud and errors by ensuring no single person has too much control", "Slow network speeds"],
        correctAnswerIndex: 2,
        points: 15,
        difficulty: "Medium",
        explanation: "Segregation of duties separates tasks like custody of assets and record-keeping to prevent errors or intentional fraud."
    }
];

// --- App State Variables ---
let currentQuestionIndex = 0;
let score = 0;
let streak = 0;

// --- Initialize App ---
// Instead of fetching a file, we just load the array directly
loadQuestion(); 

// --- 2. Display a Question ---
function loadQuestion() {
    nextBtn.classList.add('hidden');
    feedbackContainer.classList.add('hidden');
    optionsContainer.innerHTML = ''; 

    const currentQuestion = questions[currentQuestionIndex];

    questionTracker.innerText = `Question ${currentQuestionIndex + 1} / ${questions.length}`;
    difficultyBadge.innerText = currentQuestion.difficulty;
    
    const progressPercentage = ((currentQuestionIndex) / questions.length) * 100;
    progressBar.style.width = `${progressPercentage}%`;

    questionText.innerText = currentQuestion.question;

    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.innerText = option;
        button.classList.add('option-btn');
        
        button.addEventListener('click', () => checkAnswer(index, button, currentQuestion));
        
        optionsContainer.appendChild(button);
    });
}

// --- 3. Handle Answer Checking & Gamification ---
function checkAnswer(selectedIndex, selectedButton, currentQuestion) {
    const isCorrect = selectedIndex === currentQuestion.correctAnswerIndex;
    const allButtons = document.querySelectorAll('.option-btn');

    allButtons.forEach(btn => btn.disabled = true);

    if (isCorrect) {
        selectedButton.classList.add('correct');
        score += currentQuestion.points;
        streak += 1;
        
        feedbackTitle.innerText = "Correct! 🎉";
        feedbackTitle.style.color = "#28a745";

        if (currentQuestion.difficulty === 'Hard' || streak >= 3) {
            confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 } });
        } else {
            confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
        }

    } else {
        selectedButton.classList.add('incorrect');
        streak = 0; 
        
        allButtons[currentQuestion.correctAnswerIndex].classList.add('correct');
        
        feedbackTitle.innerText = "Incorrect.";
        feedbackTitle.style.color = "#dc3545";
    }

    scoreDisplay.innerText = score;
    streakDisplay.innerText = streak;

    feedbackExplanation.innerText = currentQuestion.explanation;
    feedbackContainer.classList.remove('hidden');

    nextBtn.classList.remove('hidden');
}

// --- 4. Move to Next Question ---
nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showEndScreen();
    }
});

// --- 5. End of Quiz ---
function showEndScreen() {
    progressBar.style.width = '100%';
    questionTracker.innerText = "Complete!";
    difficultyBadge.classList.add('hidden');
    
    questionText.innerText = `Quiz Complete! You scored ${score} points.`;
    optionsContainer.innerHTML = '';
    feedbackContainer.classList.add('hidden');
    nextBtn.classList.add('hidden');

    let duration = 3 * 1000;
    let animationEnd = Date.now() + duration;
    let defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    let interval = setInterval(function() {
      let timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      let particleCount = 50 * (timeLeft / duration);
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
}
