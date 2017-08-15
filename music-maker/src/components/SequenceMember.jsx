
class SequenceMember extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let className = "";
        this.props.type === "chord" ? className = "chord-block" : className = "note-block";

        return (
        <div className={ className }>
            { this.props.name }
        </div>);
    }
}

export { SequenceMember };