/**
 * A sequence of notes or chords
 */
class Sequence {
    constructor(name, members = []) {
        this.members = members;
    }
}

/**
 * A member of a sequence
 * Contains a value, its duration (a fraction of a measure), and its type (note or chord)
 */
class SequenceMember {
    constructor(value, duration, type) {
        this.type = type
        this.value = value;
        this.duration = duration;
    }
}

export { Sequence, SequenceMember };