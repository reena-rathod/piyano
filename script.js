document.addEventListener('DOMContentLoaded', () => {
    const audioContext = new(window.AudioContext || window.webkitAudioContext)();
    const container = document.querySelector('.container');
    const keys = document.querySelectorAll('.key');

    const notes = {
        'C4': 261.63,
        'C#4': 277.18,
        'D4': 293.66,
        'D#4': 311.13,
        'E4': 329.63,
        'F4': 349.23,
        'F#4': 369.99,
        'G4': 392.00,
        'G#4': 415.30,
        'A4': 440.00,
        'A#4': 466.16,
        'B4': 493.88
    };

    function playNote(frequency) {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);

        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.5);

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.5);
    }

    function createMusicNote() {
        const note = document.createElement('div');
        note.classList.add('note');
        note.innerHTML = '&#9835;'; // Music note symbol
        note.style.left = `${Math.random() * 100}%`;
        note.style.animationDuration = `${Math.random() * 2 + 2}s`;
        container.appendChild(note);

        setTimeout(() => {
            note.remove();
        }, 4000);
    }

    function createStar() {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDuration = `${Math.random() * 3 + 2}s`;
        document.querySelector('.stars').appendChild(star);

        setTimeout(() => {
            star.remove();
        }, 5000);
    }

    setInterval(createStar, 1000);

    keys.forEach(key => {
        key.addEventListener('mousedown', () => {
            const note = key.dataset.note;
            playNote(notes[note]);
            key.classList.add('active');
            createMusicNote();
        });

        key.addEventListener('mouseup', () => {
            key.classList.remove('active');
        });

        key.addEventListener('mouseleave', () => {
            key.classList.remove('active');
        });
    });

    const keyMap = {
        'a': 'C4',
        'w': 'C#4',
        's': 'D4',
        'e': 'D#4',
        'd': 'E4',
        'f': 'F4',
        't': 'F#4',
        'g': 'G4',
        'y': 'G#4',
        'h': 'A4',
        'u': 'A#4',
        'j': 'B4'
    };

    document.addEventListener('keydown', (event) => {
        if (keyMap[event.key]) {
            const key = document.querySelector(`.key[data-note="${keyMap[event.key]}"]`);
            if (key && !event.repeat) {
                playNote(notes[keyMap[event.key]]);
                key.classList.add('active');
                createMusicNote();
            }
        }
    });

    document.addEventListener('keyup', (event) => {
        if (keyMap[event.key]) {
            const key = document.querySelector(`.key[data-note="${keyMap[event.key]}"]`);
            if (key) {
                key.classList.remove('active');
            }
        }
    });
});