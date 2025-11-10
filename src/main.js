import './style.css'

// Datos del quiz (solo 2 preguntas de ejemplo)
const questions = [
  { text: 'What is the capital of France?', options: ['London', 'Berlin', 'Paris', 'Madrid'] },
  { text: 'What is the longest river in the world?', options: ['Nile', 'Amazon', 'Yangtze', 'Mississippi'] }
];

// Estado inicial
let currentQuestion = 0;

// Crear HTML inicial
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

// Eventos
const prev = document.getElementById('prev');
const next = document.getElementById('next');

// Evento delegado para las respuestas
document.querySelector('.answers').addEventListener('click', e => {
  if (e.target.classList.contains('answer-btn')) {
    document.querySelectorAll('.answer-btn').forEach(btn => btn.classList.remove('selected'));
    e.target.classList.add('selected');
  }
});

// Navegar a siguiente pregunta
next.addEventListener('click', () => {
  if (!document.querySelector('.answer-btn.selected')) {
    return alert('Select an answer!');
  }
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    updateQuestion();
    prev.disabled = false;
  }
});

// Navegar a pregunta anterior
prev.addEventListener('click', () => {
  if (currentQuestion > 0) {
    currentQuestion--;
    updateQuestion();
    prev.disabled = currentQuestion === 0;
  }
});

// Actualizar pregunta y opciones
function updateQuestion() {
  document.querySelector('.question-text').textContent = questions[currentQuestion].text;
  document.querySelector('.answers').innerHTML = questions[currentQuestion].options
    .map(option => `<button class="answer-btn">${option}</button>`).join('');
  next.disabled = currentQuestion === questions.length - 1;
}

