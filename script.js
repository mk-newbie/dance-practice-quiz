const questions = [
  {
    question: "What is the starting position in Bharatanatyam called?",
    options: ["Araimandi", "Samapada", "Chowka", "Tribhangi"],
    answer: 0
  },
  {
    question: "How many beats are in Adi Tala?",
    options: ["6", "8", "10", "12"],
    answer: 1
  },
  {
    question: "What does Abhinaya primarily express?",
    options: ["Rhythm", "Expression", "Posture", "Footwork"],
    answer: 1
  }
];

let currentQuestion = 0;
let score = 0;
let shuffledQuestions = [];

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function loadQuestion() {
  const q = shuffledQuestions[currentQuestion];
  document.getElementById("question-box").innerText = q.question;

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  q.options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.innerText = option;
    btn.onclick = () => selectAnswer(index);
    optionsDiv.appendChild(btn);
  });
}

function selectAnswer(selected) {
  if (selected === shuffledQuestions[currentQuestion].answer) {
    score++;
  }
  document.getElementById("next-btn").disabled = false;
}

document.getElementById("next-btn").onclick = () => {
  currentQuestion++;
  document.getElementById("next-btn").disabled = true;

  if (currentQuestion < shuffledQuestions.length) {
    loadQuestion();
  } else {
    showResult();
  }
};

function showResult() {
  document.getElementById("question-box").innerText = "";
  document.getElementById("options").innerHTML = "";
  document.getElementById("next-btn").classList.add("hidden");

  document.getElementById("result").innerText =
    `Your score: ${score} / ${shuffledQuestions.length}`;
  document.getElementById("result").classList.remove("hidden");
  document.getElementById("restart-btn").classList.remove("hidden");
}

document.getElementById("restart-btn").onclick = () => {
  startQuiz();
};

function startQuiz() {
  score = 0;
  currentQuestion = 0;
  shuffledQuestions = shuffle([...questions]);

  document.getElementById("next-btn").classList.remove("hidden");
  document.getElementById("result").classList.add("hidden");
  document.getElementById("restart-btn").classList.add("hidden");
  document.getElementById("next-btn").disabled = true;

  loadQuestion();
}

startQuiz();
