// display.js
import { getTimeInWords } from './verbatempus-core.js';

let typingTimer;
let previousText = '';

function typeWriter(element, text, speed = 50) {
    let i = 0;
    clearTimeout(typingTimer);
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            typingTimer = setTimeout(type, speed);
        }
    }
    type();
}

function updateDisplay() {
    const timeInWords = getTimeInWords();
    if (timeInWords !== previousText) {
        const display = document.getElementById('time-display');
        typeWriter(display, timeInWords);
        previousText = timeInWords;
    }
}

setInterval(updateDisplay, 60000); // Check every minute
updateDisplay(); // Initial display