import React, { Component } from 'react';

class SequenceMember extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let className = "";
        switch (this.props.type) {
            case "chord" :
                className = "chord-block";
                break;
            case "note" :
                className = "note-block";
                if (this.props.isCurrentNote) className += " current";
                break;
            case "rest" :
                className = "rest";
                break;
        }

        return (
        <div className={ className }>
            { this.props.name }
        </div>);
    }
}

export { SequenceMember };