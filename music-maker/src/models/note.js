class Note {
    constructor(note, octave) {
        this.name = note;
        this.octave = octave;
        this.type = "note";
    }

    // Get the note number (from 1 to 88) for this note
    get globalNote() {
        return (this.octave - 1) * 12 + this.noteToNumber();
    }

    noteToNumber() {
        let notes = ['a', 'a#', 'b', 'c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#'];
        return notes.indexOf(this.name) + 1;
    }
}

export { Note };