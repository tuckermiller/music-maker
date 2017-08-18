import React, { Component } from 'react';
import { SequenceMember } from './SequenceMember';
import './MusicSequence.css';

class MusicSequence extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
        <div className="musical-staff">
            <div className="note-container">
                { this.renderSequence(this.props.notes) }
            </div>
            <div className="chord-container">
                { this.renderSequence(this.props.chords) }
            </div>
        </div>);
    }

    // Render notes
    renderSequence(sequence) {
        let self = this;
        let sequenceMembers = [];
        sequence.forEach(function (member, index) {
            sequenceMembers.push(self.renderSequenceMember(member, index));
        });

        return sequenceMembers;
    }

    // Render an individual note or chord
    renderSequenceMember(member, index) {
        let isCurrentNote = this.props.currentSequenceIndex === index;

        if (member === null) {
            return <SequenceMember name = "" type = "rest" />
        }
        return (
            <SequenceMember name = {member.name} type = { member.type } isCurrentNote = { isCurrentNote } />
        );
    }
}

export { MusicSequence };