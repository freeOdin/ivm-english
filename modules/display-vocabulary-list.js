import { createCard } from './card.js';
import { createYouTubeEmbed } from './youtube.js';
import { vocabularyLists } from './vocabulary-lists.js';

export function displayVocabularyList(listName) {
    const cardsContainer = document.querySelector('.cards-container');
    cardsContainer.innerHTML = '';

    cardsContainer.appendChild(createYouTubeEmbed(vocabularyLists[listName].youtubeLink));
    
    const wordList = vocabularyLists[listName].wordList;
    if (wordList) {
        wordList.forEach(word => {
            const card = createCard(word);
            cardsContainer.appendChild(card);
        });
    }
}