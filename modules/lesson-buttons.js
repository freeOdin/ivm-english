import { vocabularyLists } from './vocabulary-lists.js';
import { displayVocabularyList } from './display-vocabulary-list.js';

export function createListButtons() {
    const buttonContainer = document.querySelector('.list-buttons');
    console.log('here');

    // Create buttons for each lesson in vocabularyLists
    Object.keys(vocabularyLists).forEach(lessonId => {
        const button = document.createElement('button');
        button.textContent = lessonId;
        button.setAttribute('data-list', lessonId);

        buttonContainer.appendChild(button);

        button.addEventListener('click', (e) => {
            // Remove active class from all buttons
            document.querySelectorAll('.list-buttons button').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            e.target.classList.add('active');
            
            // Display the selected vocabulary list
            const listName = e.target.getAttribute('data-list');
            displayVocabularyList(listName);
        });
    });

    return buttonContainer;
}