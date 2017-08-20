import React, { Component } from 'react';
import { Howl } from 'howler';

import { NoteButtons } from './components/NoteButtons.jsx';
import { ChordButtons } from './components/ChordButtons.jsx';
import { MusicSequence } from './components/MusicSequence.jsx';
import { Note } from './models/Note.js';
import { Chord } from './models/Chord.js';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            noteSequence: [],
            currentSequenceIndex: null,
            chordSequence: [],
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

    play() {
        // Play melody
        if (this.state.noteSequence != null) {
            let currentNote = this.state.noteSequence[this.state.currentSequenceIndex];  
            if (currentNote != null) {
                this.melody.rate(Math.pow(1.0594636, (currentNote.globalNote - 40)));
                this.melody.play();
            }
        }

        // Play chord
        if (this.state.chordSequence != null) {
            let currentChord = this.state.chordSequence[this.state.currentSequenceIndex];
            if (currentChord != null) {
                this.chordMember1.rate(Math.pow(1.0594636, (currentChord.notes[0].globalNote - 40)));
                this.chordMember2.rate(Math.pow(1.0594636, (currentChord.notes[1].globalNote - 40)));
                this.chordMember3.rate(Math.pow(1.0594636, (currentChord.notes[2].globalNote - 40)));

                this.chordMember1.play();
                this.chordMember2.play();
                this.chordMember3.play();        
            }
        }
    }

    addNoteToSequence(note) {
        this.setState((prevState) => {
            prevState.noteSequence.push(note);
            return prevState;
        });
    }

    addChordToSequence(chord) {
        this.setState((prevState) => {
            prevState.chordSequence.push(chord, null, null, null);
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

            this.play();
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
            this.play();
        }
    }

    render() {

        return (
        <div className = "app" >
            <div className = "title">
                Music Maker
            </div>
            <div className = "music-controls">
                <NoteButtons onNoteClick = { this.addNoteToSequence.bind(this) } />
                <ChordButtons onChordClick = { this.addChordToSequence.bind(this) } />
                <button onClick={ () => { this.playSequence(); } }>Play</button>
            </div>
            <div className = "music-sequence">
                <MusicSequence currentSequenceIndex = { this.state.currentSequenceIndex } notes = { this.state.noteSequence } chords = { this.state.chordSequence }/>
            </div>
        </div >
        );
    }
}

export default App;