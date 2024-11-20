import { createListButtons } from "./modules/lesson-buttons.js";
import { loadVocabulary } from "./modules/load-vocabulary.js";
import { vocabularyLists } from "./modules/vocabulary-lists.js";

// Load vocabulary
for (const lesson in vocabularyLists) {
    loadVocabulary(lesson);
}

// Create lesson buttons
createListButtons();