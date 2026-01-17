// ===============================
// QUESTIONS
// ===============================
const questions = [
  // ---------- MCQ QUESTIONS ----------
  {
    text: "What does the word 'Padabheda' mean?",
    choices: ["Feet Positions", "Hands Positions", "Head Positions", "Neck Positions"],
    correct: 0
  },
  {
    text: "How many types of Padabheda are there?",
    choices: ["1", "5", "9", "6"],
    correct: 3
  },
  {
    text: "What is Laya?",
    choices: ["Speed of music", "Dance costume", "Foot position", "Hand gesture"],
    correct: 0
  },
  {
    text: "What is Taal?",
    choices: ["A rhythmic cycle", "A dance pose", "A hand movement", "A costume"],
    correct: 0
  },

  // ---------- TEXT (WRITE ANSWER) QUESTION ----------
  {
    text: "Write the different feet positions.",
    type: "text",
    modelAnswer:
      "Samapada\nUdghateetapada\nAgratalasanchara Pada\nAnchita Pada\nKunchita Pada\nSuchi Pada"
  }
];

// ===============================
// QUIZ STATE
// ===============================
let shuffled = [];
let current = 0;
let score = 0;

// ===============================
// SHUFFLE QUESTIONS
// ===============================
function shuffleQuestions() {
  shuffled = [...questions].sort(() => Math.random() - 0.5);
}

// ===============================
// SHOW QUESTION
// ===============================
function showQuestion() {
  document.getElementById("nextBtn").disabled = true;

  const q = shuffled[current];
  document.getElementById("question").innerText = q.text;

  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";

  // ----- MULTIPLE CHOICE -----
  if (!q.type) {
    q.choices.forEach((choice, index) => {
      const btn = document.createElement("button");
      btn.innerText = choice;
      btn.onclick = () => selectAnswer(index);
      answersDiv.appendChild(btn);
    });
  }

  // ----- TEXT ANSWER -----
  if (q.type === "text") {
    const textarea = document.createElement("textarea");
    textarea.rows = 5;
    textarea.style.width = "100%";
    textarea.placeholder = "Type your answer here...";
    textarea.oninput = () => {
      document.getElementById("nextBtn").disabled = false;
    };
    answersDiv.appendChild(textarea);
  }
}

// ===============================
// SELECT MCQ ANSWER
// ===============================
function selectAnswer(index) {
  if (index === shuffled[current].correct) {
    score++;
  }
  document.getElementById("nextBtn").disabled = false;
}

// ===============================
// NEXT BUTTON
// ===============================
document.getElementById("nextBtn").onclick = () => {
  document.getElementById("nextBtn").disabled = true;
  current++;

  if (current < shuffled.length) {
    showQuestion();
  } else {
    showScore();
  }
};

// ===============================
// SHOW SCORE & MODEL ANSWERS
// ===============================
function showScore() {
  document.getElementById("question").innerText = "";
  document.getElementById("answers").innerHTML = "";
  document.getElementById("nextBtn").classList.add("hidden");

  let textAnswerSection = "";

  shuffled.forEach(q => {
    if (q.type === "text") {
      textAnswerSection += `\n\n✏️ ${q.text}\n${q.modelAnswer}`;
    }
  });

  const scoreBox = document.getElementById("scoreBox");
  scoreBox.innerText =
    `🎉 You scored ${score} out of ${shuffled.filter(q => !q.type).length}!\n\nPractice Answers:${textAnswerSection}`;

  scoreBox.classList.remove("hidden");
  document.getElementById("retryBtn").classList.remove("hidden");
}

// ===============================
// RESTART QUIZ
// ===============================
document.getElementById("retryBtn").onclick = () => {
  startQuiz();
};

function startQuiz() {
  score = 0;
  current = 0;
  shuffleQuestions();

  document.getElementById("scoreBox").classList.add("hidden");
  document.getElementById("retryBtn").classList.add("hidden");
  document.getElementById("nextBtn").classList.remove("hidden");

  showQuestion();
}

// ===============================
// START QUIZ
// ===============================
startQuiz();
