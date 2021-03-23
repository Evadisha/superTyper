const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEL = document.getElementById('score');
const timeEl = document.getElementById('time');
const endGameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

const words = ['antifungal', 'bifunctional', 'cofunction', 'difficulty', 'settings',
    'community', 'adorn', 'beautify', 'bedeck', 'bedizen', 'blazon', 'caparison', 'deck',
    'decorate', 'embellish', 'emblaze', 'emboss', 'enrich', 'fancify', 'festoon',
    'garnish', 'glitz', 'ornament', 'assemblage', 'batch', 'battery', 'bunch', 'cluster',
    'collection', 'constellation', 'grouping', 'huddle', 'muster', 'package', 'parcel',
    'passel', 'suite', 'blemish', 'deface', 'disfigure', 'scar', 'spoil', 'awesome',
    'fascinating', 'incredible', 'marvelous', 'prodigious', 'shocking', 'stunning',
    'surprising', 'substandard', 'inferior', 'unsatisfactory', 'inadequate', 'unacceptable',
    'deficient', 'imperfect', 'defective', 'faulty', 'shoddy', 'amateurish', 'negligent',
    'dreadful', 'terrible', 'abominable', 'atrocious', 'deplorable', 'diabolical',
    'adverse', 'distressing', 'regrettable'
]

// Init word
let randomWord;

// Init score
let score = 0;
 
// Init time
let time = 10;

// Set difficulty to value in local storage or medium
let difficulty = localStorage.getItem('difficulty') !== null ?
    localStorage.getItem('difficulty') : 'medium';

// Set difficulty to select value
difficultySelect.value =  localStorage.getItem('difficulty') !== null ?
localStorage.getItem('difficulty') : 'medium';  

// Functions
// 1. Generating random word from array
function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

// 2. Adding word to DOM
function addWordToDOM() {
    randomWord = getRandomWord();
    word.innerHTML = randomWord;
}

// 3. Update score 
function updateScore() {
    score++;
    scoreEL.innerHTML = score;
}

// 4. Update time 
function updateTime() {
    time--;
    timeEl.innerHTML = time + 's';

    if (time === 0) {
        clearInterval(timeInterval);
        // End Game after time completes
        gameOver();

    }
}

// 5. Game Over function
function gameOver() {
    endGameEl.innerHTML = `
            <h1>Time ran out!</h1>
            <p>Your final score is ${score}</p>
            <button onClick="location.reload()">Reload</button>
    `;
    endGameEl.style.display = 'flex';
}

// Init functions
addWordToDOM();

// Focusing on the text
text.focus();

// Start counting down
const timeInterval = setInterval(updateTime, 1000);

// Event Listeners
// 1. Input text 
text.addEventListener('input', e => {
    const insertedWord = e.target.value;

    if (insertedWord === randomWord) {
        addWordToDOM();
        updateScore();

        // Clear value
        e.target.value = '';

        // Increase time for correct answer
        if (difficulty === 'hard'){
            time += 2;
        }
        else if (difficulty === 'medium') {
            time += 3;
        }
        else {
            time += 5;
        }

        updateTime();
    }
})

// 2. Settings Button Click
settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));

// 3. Settings Select Option
settings.addEventListener('change', e => {
    difficulty = e.target.value;
    localStorage.setItem('difficulty', difficulty);

})