class Note {
    constructor(note, octave) {
        this.name = note;
        this.octave = octave;
        this.type = "note";
    }

    // Get the note number (from 1 to 88) for this note, used for modifying the rate of the sample
    get globalNote() {
        // All possible notes
        let notes = ['a', 'a#', 'b', 'c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#'];

        // Return the octave plus the position of the note within the octave
        return (this.octave - 1) * 12 + notes.indexOf(this.name) + 1;
    }
}

export { Note };