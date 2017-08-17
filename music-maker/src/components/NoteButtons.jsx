import React, { Component } from 'react';
import { Howl } from 'howler';
import { SequenceMember } from './SequenceMember.jsx';
import { Note } from '../models/Note.js';
import './MusicSequence.css';

class NoteButtons extends Component {
    // Middle c piano sample
    melody = new Howl({
        src: ['/p_middlec.ogg']
    });

    render() {

        let self = this;
        let notes = ['a', 'a#', 'b', 'c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#'];
        let noteButtons = notes.map(function(note, index) {
            return (
                <button key = { note } onClick = { () => {
                    console.log();
                    self.melody.rate(Math.pow(1.0594636, (index - 3)));
                    self.melody.play();
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