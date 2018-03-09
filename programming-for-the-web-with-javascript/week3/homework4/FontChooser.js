class FontChooser extends React.Component {

    constructor(props) {
        super(props);
        this.state = { hidden : 'false' };
    }
    
    toggleHidden() {
        this.setState({ hidden: !this.state.hidden });
    }

    render() {
        var toggled = this.state.hidden;
	return(
	       <div>
               <input type="checkbox" id="boldCheckbox" hidden={toggled}/>
               <button id="decreaseButton" hidden={toggled}>-</button>
               <span id="fontSizeSpan" hidden={toggled}>{this.props.size}</span>
               <button id="increaseButton" hidden={toggled}>+</button>
               <span id="textSpan" onClick={this.toggleHidden.bind(this)}>{this.props.text}</span>
	       </div>
	);
    }
}

