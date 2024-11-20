let vocabularyLists = {
    "book-2-lesson-1": {youtubeLink: "G-zMQaayTAA"},
    "book-2-lesson-2": {youtubeLink: "G-zMQaayTAA"},
    "book-2-lesson-3": {youtubeLink: "G-zMQaayTAA"},
    "book-2-lesson-4": {youtubeLink: "G-zMQaayTAA"},
    "book-2-lesson-5": {youtubeLink: "G-zMQaayTAA"},
    "book-2-lesson-6": {youtubeLink: "G-zMQaayTAA"},
}

async function loadVocabulary(lesson) {
    try {
        const response = await fetch(`./lessons/${lesson}.csv`);
        const csvText = await response.text();
        
        // Split the CSV into lines and remove empty lines
        const lines = csvText.split('\n').filter(line => line.trim());
        
        // Skip header row if it exists and convert each line to an object
        const vocabulary = lines.slice(1).map(line => {
            const [english, part, chinese] = line.split(',').map(item => item.trim());
            return { english, part, chinese };
        });

        // Add the new vocabulary to the existing vocabularyLists
        vocabularyLists[lesson].wordList = vocabulary;
        
    } catch (error) {
        console.error('Error loading CSV:', error);
    }
}

for (const lesson in vocabularyLists) {
    loadVocabulary(lesson);
}

export { vocabularyLists };