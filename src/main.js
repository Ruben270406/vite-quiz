import './style.css'

const questions = [
  { text: 'What is the capital of France?',
    options: ['London', 'Berlin', 'Paris', 'Madrid'] 
  },

  { text: 'What is the longest river in the world?', 
    options: ['Amazonas', 'Nilo', 'Yangtsé', 'Miño'] 
  },

  { text: 'Who wrote Romeo and Juliet?', 
    options: ['Jane Austen', 'Cervantes', 'William Shakespeare', 'Charles Dickens']
  },

  { text: 'How many planets are there in our solar system?', 
    options: [7, 8, 9, 10]
  }
];

let currentQuestion = 0;

document.querySelector('#app').innerHTML = `
  <div class="quiz-container">
    <h2>Quiz Question</h2>
    <p class="question-text">${questions[0].text}</p>
    <div class="answers">
      ${questions[0].options.map(option => `
        <button class="answer-btn">${option}</button>
      `).join('')}
    </div>
    <div class="controls">
      <button class="control-btn" id="prev" disabled>Previous</button>
      <button class="control-btn" id="next">Next</button>
    </div>
  </div>
`;

const prev = document.getElementById('prev');
const next = document.getElementById('next');

document.querySelector('.answers').addEventListener('click', e => {
  if (e.target.classList.contains('answer-btn')) {
    document.querySelectorAll('.answer-btn').forEach(btn => btn.classList.remove('selected'));
    e.target.classList.add('selected');
  }
});

// Next
next.addEventListener('click', () => {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    updateQuestion();
    prev.disabled = false;
  }
});

// Previous
prev.addEventListener('click', () => {
  if (currentQuestion > 0) {
    currentQuestion--;
    updateQuestion();
    prev.disabled = currentQuestion === 0;
  }
});

// Update question display
function updateQuestion() {
  document.querySelector('.question-text').textContent = questions[currentQuestion].text;
  document.querySelector('.answers').innerHTML = questions[currentQuestion].options
    .map(option => `<button class="answer-btn">${option}</button>`).join('');
  next.disabled = currentQuestion === questions.length - 1;
}

