import { vocabularyLists } from './vocabulary.js';

const synth = window.speechSynthesis;
let voices = [];

if ("onvoiceschanged" in synth) {
    synth.onvoiceschanged = () => {
        voices = synth.getVoices();
        console.log("Voices loaded:", voices); // To check what voices are available
        // Initialize the page with basics list after voices are loaded
        displayVocabularyList('basics');
    };
} else {
    voices = synth.getVoices();
    displayVocabularyList('basics');
}

// Function to create a card element
function createCard(word) {
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
    
    pronounceButton.addEventListener('click', () => {
        const utterance = new SpeechSynthesisUtterance(word.english);

        // Set the speech rate (0.1 to 10)
        utterance.rate = 0.9; // 1.0 is the default
        utterance.pitch = 1.2; // 1.0 is the default
        
        // Array of preferred female voice names (in order of preference)
        const preferredVoices = [
            'Google UK English Female',
        ];
        
        // Try to find one of the preferred voices
        for (let voiceName of preferredVoices) {
            const voice = voices.find(v => v.name === voiceName);
            if (voice) {
                utterance.voice = voice;
                break;
            }
        }
        
        // Fallback if none of the preferred voices are found
        if (!utterance.voice) {
            utterance.voice = voices.find(voice => 
                voice.name.includes('Female') && 
                voice.lang.startsWith('en-')
            );
        }

        // Fallback if no female voice is found
        if (!utterance.voice) {
            utterance.voice = voices.find(voice => 
                voice.lang.startsWith('en-')
            );
        }
        
        console.log("Selected voice:", utterance.voice);
        window.speechSynthesis.speak(utterance);
    });
    
    card.appendChild(english);
    card.appendChild(part);
    card.appendChild(chinese);
    card.appendChild(pronounceButton);
    
    return card;
}

// Function to display vocabulary list
function displayVocabularyList(listName) {
    const cardsContainer = document.querySelector('.cards-container');
    cardsContainer.innerHTML = ''; // Clear existing cards

    cardsContainer.appendChild(createYouTubeEmbed(vocabularyLists[listName].youtubeLink));
    
    const wordList = vocabularyLists[listName].wordList;
    if (wordList) {
        wordList.forEach(word => {
            const card = createCard(word);
            cardsContainer.appendChild(card);
        });
    }
}

function createYouTubeEmbed(videoId) {
    if (!videoId) return document.createElement('div'); // Return empty div if no video ID
    
    const embedContainer = document.createElement('div');
    embedContainer.className = 'youtube-embed';
    
    const iframe = document.createElement('iframe');
    iframe.width = "560";
    iframe.height = "315";
    iframe.src = `https://www.youtube.com/embed/${videoId}`;
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;
    
    embedContainer.appendChild(iframe);
    return embedContainer;
}

// Add event listeners to buttons
document.querySelectorAll('.list-buttons button').forEach(button => {
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
