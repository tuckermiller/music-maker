import React, { Component } from 'react';
import { Howl } from 'howler';

import { NoteButtons } from './components/NoteButtons.jsx';
import { MusicSequence } from './components/MusicSequence.jsx';
import { Note } from './models/Note.js';
import { Chord } from './models/Chord.js';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        let notes = [];
        let chords = [];
        let cmaj = new Chord('cmaj', [new Note('c', 4), new Note('e', 4), new Note('g', 4)]);
        let dmin = new Chord('dmin', [new Note('d', 4), new Note('f', 4), new Note('a', 4)]);
        chords.push(cmaj, dmin, cmaj, dmin);

        this.state = {
            noteSequence: notes,
            currentSequenceIndex: null,
            chordSequence: chords,
            bpm: 120,
            mode: "create"
        };
    }

    // Melody
    melody = new Howl({
        src: ['/p_middlec.ogg']
    });

    // Three chord members
    chordMember1 = new Howl({
        src: ['/p_middlec.ogg']
    });

    chordMember2 = new Howl({
        src: ['/p_middlec.ogg']
    });

    chordMember3 = new Howl({
        src: ['/p_middlec.ogg']
    });

    notes = ['a', 'a#', 'b', 'c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#'];

    playNote() {
        // Play melody
        let currentNote = this.state.noteSequence[this.state.currentSequenceIndex];  
        if (currentNote != null) {
            this.melody.rate(Math.pow(1.0594636, (this.notes.indexOf(currentNote.name) - 3)));
            this.melody.play();
        }

        // Play chord
        let currentChord = this.state.chordSequence[this.state.currentSequenceIndex];
        if (currentChord != null) {
            this.chordMember1.rate(Math.pow(1.0594636, (this.notes.indexOf(currentChord.notes[0].name) - 3)));
            this.chordMember2.rate(Math.pow(1.0594636, (this.notes.indexOf(currentChord.notes[1].name) - 3)));
            this.chordMember3.rate(Math.pow(1.0594636, (this.notes.indexOf(currentChord.notes[2].name) - 3)));

            this.chordMember1.play();
            this.chordMember2.play();
            this.chordMember3.play();        
        }
    }

    addNoteToSequence(note) {
        this.setState((prevState) => {
            prevState.noteSequence.push(note);
            return prevState;
        });
    }

    playSequence() {
        let self = this;
        self.interval = setInterval(self.incrementSequence.bind(self), 60000 / this.state.bpm / 2);
    }

    incrementSequence() {
        if (this.state.currentSequenceIndex === null) {
            this.setState((prevState) => {
                prevState.currentSequenceIndex = 0;
                return prevState;
            });

            this.playNote();
        } else if (this.state.currentSequenceIndex >= this.state.noteSequence.length - 1) {
            // Sequence is over
            this.setState((prevState) => {
                prevState.currentSequenceIndex = null;
                return prevState;
            });
            clearInterval(this.interval);
        } else {
            this.setState((prevState) => {
                prevState.currentSequenceIndex++;
                return prevState;
            });
            this.playNote();
        }
    }

    render() {

        return (
        <div className = "App" >
            <NoteButtons onNoteClick = { this.addNoteToSequence.bind(this) } />
            <button onClick={ () => { this.playSequence(); } }>Play</button>
            <MusicSequence currentSequenceIndex = { this.state.currentSequenceIndex } notes = { this.state.noteSequence } chords = { this.state.chordSequence }/>
        </div >
        );
    }
}

export default App;