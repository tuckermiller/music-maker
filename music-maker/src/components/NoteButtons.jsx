import React, { Component } from 'react';
import { SequenceMember } from './SequenceMember.jsx';
import { Note } from '../models/Note.js';
import './MusicSequence.css';

class NoteButtons extends Component {
    render() {
        let self = this;
        let notes = ['a', 'a#', 'b', 'c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#'];
        let noteButtons = notes.map(function(note) {
            return (
                <button onClick = { () => {
                    self.props.onNoteClick(new Note(note, 4))
                 } } >
                    <SequenceMember name={note} type = "note" />
                </button>
            );
        });

        
        return (
        <div className = "note-button-container" >
            { noteButtons }
        </div >
        );
    }
}

export { NoteButtons };