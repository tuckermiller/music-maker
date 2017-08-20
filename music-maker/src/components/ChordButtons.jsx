import React, { Component } from 'react';
import { Howl } from 'howler';
import { SequenceMember } from './SequenceMember.jsx';
import { Note } from '../models/Note.js';
import { Chord } from '../models/Chord.js';
import './MusicSequence.css';

class ChordButtons extends Component {
    // Middle c piano sample
    melody = new Howl({
        src: ['/p_middlec.ogg']
    });

    render() {

        let self = this;
        let chords = [];
        chords.push(
            new Chord('amin', [new Note('a', 4), new Note('c', 4), new Note('e', 4)]),
            new Chord('bdim', [new Note('b', 4), new Note('d', 4), new Note('f', 4)]),
            new Chord('cmaj', [new Note('c', 4), new Note('e', 4), new Note('g', 4)]),
            new Chord('dmin', [new Note('d', 4), new Note('f', 4), new Note('a', 4)]),
            new Chord('emin', [new Note('e', 4), new Note('g', 4), new Note('b', 5)]),
            new Chord('fmaj', [new Note('f', 4), new Note('a', 5), new Note('c', 5)]),
            new Chord('gmaj', [new Note('g', 4), new Note('b', 5), new Note('d', 5)])
        );

        let chordButtons = chords.map(function(chord, index) {
            return (
                <button key = { chord.name } onClick = { () => {
                    self.props.onChordClick(new Chord (chord.name, chord.notes));
                 } } >
                    <SequenceMember name={chord.name} type = "chord" />
                </button>
            );
        });

        
        return (
        <div className = "chord-button-container" >
            { chordButtons }
            <button key = "rest" onClick = { () => {
                self.props.onChordClick(null)
                } } >
                <SequenceMember name="" type = "rest" />
            </button>
        </div >
        );
    }
}

export { ChordButtons };