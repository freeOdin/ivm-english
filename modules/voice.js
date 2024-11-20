const synth = window.speechSynthesis;
let voices = [];

// Get available voices, handling browser differences
const loadVoices = () => {
    voices = synth.getVoices();
};

if ("onvoiceschanged" in synth) {
    synth.onvoiceschanged = loadVoices;
} else {
    loadVoices();
}

export function speakWord(word) {
    const utterance = new SpeechSynthesisUtterance(word);

    // Set the speech rate and pitch
    utterance.rate = 0.9;
    utterance.pitch = 1.3;
    
    // Array of preferred female voice names
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
}
