import './style.css'

const app = document.querySelector('#app');

const questions = [
  {
    question: 'What is the capital of France?',
    answers: ['London', 'Berlin', 'Paris', 'Madrid']
  },
  {
    question: 'What is the longest river in the world?',
    answers: ['Nile', 'Amazon', 'Yangtze', 'Mississippi']
  }
];

let currentIndex = 0;

const box = document.createElement('div');
box.className = 'quiz-container';

const title = document.createElement('h2');
title.textContent = 'Quiz Question';

const questionP = document.createElement('p');
questionP.className = 'question-text';

const answersDiv = document.createElement('div');
answersDiv.className = 'answers';

const controls = document.createElement('div');
controls.className = 'controls';

const prev = document.createElement('button');
prev.className = 'control-btn';
prev.textContent = 'Previous';
prev.onclick = () => {
  if (currentIndex === 0) return;
  currentIndex -= 1;
  render();
};

const next = document.createElement('button');
next.className = 'control-btn';
next.textContent = 'Next';
next.onclick = () => {
  const selected = document.querySelector('.answer-btn.selected');
  if (currentIndex < questions.length - 1) {
    currentIndex += 1;
    render();
  }
};

controls.append(prev, next);
box.append(title, questionP, answersDiv, controls);
app.appendChild(box);

function render() {
  const q = questions[currentIndex];
  questionP.textContent = q.question;

  // clear answers
  answersDiv.innerHTML = '';
  q.answers.forEach(text => {
    const btn = document.createElement('button');
    btn.className = 'answer-btn';
    btn.textContent = text;
    btn.onclick = () => {
      document.querySelectorAll('.answer-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
    };
    answersDiv.appendChild(btn);
  });

  // buttons enabled/disabled based on index
  prev.disabled = currentIndex === 0;
  next.disabled = currentIndex === questions.length - 1;
}

// initial render
render();

