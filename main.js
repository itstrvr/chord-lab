let notes = {
    "A"      : [true, "A"],
    "Asharp" : [false, "A♯"],
    "Bflat"  : [true, "B♭"],
    "B"      : [true, "B"],
    "C"      : [true, "C"],
    "Csharp" : [true, "C♯"],
    "Dflat"  : [false, "D♭"],
    "D"      : [true, "D"],
    "Dsharp" : [false, "D♯"],
    "Eflat"  : [true, "E♭"],
    "E"      : [true, "E"],
    "F"      : [true, "F"],
    "Fsharp" : [true, "F♯"],
    "Gflat"  : [false, "G♭"],
    "G"      : [true, "G"],
    "Gsharp" : [false, "G♯"],
    "Aflat"  : [true, "A♭"],
};

let chords = {
    "empty"  : [false, ""],
    "M"      : [false, "M"],
    "Maj"    : [false, "Maj"],
    "mm"     : [false, "m"],
    "Min"    : [false, "Min"],
    "delta7" : [true, "Δ7"],
    "Maj7"   : [false, "Maj7"],
    "Dom7"   : [true, "7"],
    "minus7" : [true, "-7"],
    "Min7"   : [false, "Min7"],
    "half7"  : [false, "ø7"],
    "f5f9"   : [false, "m7♭5"],
    "cir7"   : [false, "○7"],
    "dim7"   : [false, "dim7"],
};

let settingsVisible = false;
let chordsEnabled = false;

// returns a list of active keys from an object
function getActiveKeys(obj) {
    return Object.keys(obj).filter((key) => obj[key][0]);
}

// card update
function genNew() {
    // get note
    let activeNotes = getActiveKeys(notes);
    let note = activeNotes.length ? notes[activeNotes[Math.floor(Math.random() * activeNotes.length)]][1] : "";

    // get chord
    let activeChords = getActiveKeys(chords);
    let chord = chordsEnabled ? activeChords.length ? chords[activeChords[Math.floor(Math.random() * activeChords.length)]][1] : "" : "";
    
    return note + chord;
}

function newCard() {
    let cardText = document.getElementById("card-text");
    let contents = cardText.innerHTML;
    do {
        cardText.innerHTML = genNew();
    } while (contents === cardText.innerHTML && getActiveKeys(notes).length > 1);
}

// settings listeners
function toggleSettings() {
    settingsVisible = !settingsVisible;
    document.getElementById("settings").style.display = settingsVisible ? "flex" : "none";
}

function toggleChords() {
    chordsEnabled = this.checked;
    document.getElementById("chords").style.display = chordsEnabled ? "block" : "none";
}

function toggleNote() {
    key = this.name;
    notes[key] = [this.checked, notes[key][1]];
}

function toggleChord() {
    key = this.name;
    chords[key] = [this.checked, chords[key][1]];
}

// once DOM is loaded, setup
addEventListener("DOMContentLoaded", () => {
    // set initial text on card
    newCard();

    // update cards event listeners
    document.getElementById("card").addEventListener("click", newCard);
    document.addEventListener("keyup", (event) => { if (event.code === "Space") newCard(); });

    // settings listeners - visibility
    document.getElementById("gear").addEventListener("click", toggleSettings);
    document.getElementById("chordsEnabled").addEventListener("change", toggleChords);
    
    // settings listeners - notes
    let noteSettings = document.getElementsByClassName("note");
    for (let note of noteSettings) {
        note.addEventListener("change", toggleNote);
    }

    // setting listeners - chords
    let chordSettings = document.getElementsByClassName("chord");
    for (let chord of chordSettings) {
        chord.addEventListener("change", toggleChord);
    }  
});
