import React, { Component } from 'react';
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
            chordSequence: chords
        };
    }

    addNoteToSequence(note) {
        this.setState((prevState) => {
            prevState.noteSequence.push(note);
            return prevState;
        });
    }

    render() {

        return (
        <div className = "App" >
            <NoteButtons onNoteClick = { this.addNoteToSequence.bind(this) } />
            <MusicSequence notes = { this.state.noteSequence } chords = { this.state.chordSequence }/>
        </div >
        );
    }
}

export default App;