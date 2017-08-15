import { ChordBlock } from './ChordBlock';
import { SequenceMember } from './SequenceMember';

// Pixel distance of a whole measure
const MEASURE_DISTANCE = 800;

class MusicSequence extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
        <div class="musical-staff">
            { this.renderNotes() }
            { this.renderChords() }
        </div>);
    }

    // Render notes
    renderSequence(sequence) {
        let sequenceMembers = [];
        sequence.forEach(function (member, index) {
            sequenceMembers.push(this.renderSequenceMember(member, index));
        });

        return sequenceMembers;
    }

    // Render an individual note or chord
    renderSequenceMember(member, index) {
        // Calculate position based on index in the sequence
        let leftPos = MEASURE_DISTANCE * member.duration + "px";

        return (
            <SequenceMember name = {member.name} style = { { left: leftPos } } type = { member.type } />
        );
    }
}

export { MusicSequence };