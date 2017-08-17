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
        let cmaj = new Chord('cmaj', [new Note('c', 4), new Note('e', 4), new Note('g', 4)])
        chords.push(cmaj);

        this.state = {
            noteSequence: notes,
            currentSequenceIndex: null,
            chordSequence: chords,
            bpm: 120,
            mode: "create"
        };
    }

    // Middle c piano sample
    melody = new Howl({
        src: ['/p_middlec.ogg']
    });

    notes = ['a', 'a#', 'b', 'c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#'];

    playNote() {
        let currentNote = this.state.noteSequence[this.state.currentSequenceIndex];
        this.melody.rate(Math.pow(1.0594636, (this.notes.indexOf(currentNote.name) - 3)));
        this.melody.play();
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