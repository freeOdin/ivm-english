import { speakWord } from './voice.js';

export function createCard(word) {
    const card = document.createElement('div');
    card.className = 'card';
    
    const english = document.createElement('div');
    english.className = 'english';
    english.textContent = word.english;
    
    const part = document.createElement('div');
    part.className = 'part';
    part.textContent = word.part;
        
    const chinese = document.createElement('div');
    chinese.className = 'chinese';
    chinese.textContent = word.chinese;
    
    const pronounceButton = document.createElement('button');
    pronounceButton.className = 'pronounce-btn';
    pronounceButton.innerHTML = '🔊';
    
    pronounceButton.addEventListener('click', speakWord.bind(null, word.english));
    card.appendChild(english);
    card.appendChild(part);
    card.appendChild(chinese);
    card.appendChild(pronounceButton);
    
    return card;
}
