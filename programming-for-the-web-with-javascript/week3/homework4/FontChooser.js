class FontChooser extends React.Component {

    constructor(props) {
        super(props);
        this.state = { hidden : 'false' };
    }
    
    toggleHidden() {
        if (this.state.hidden){
            this.setState({ hidden: 'false' });
        } else {
            this.setState({ hidden: 'true' });            
        }
    }

    render() {
        var toggled = this.state.hidden;
	return(
	       <div>
               <input type="checkbox" id="boldCheckbox" hidden=toggled/>
               <button id="decreaseButton" hidden=toggled>-</button>
               <span id="fontSizeSpan" hidden=toggled>{this.props.size}</span>
               <button id="increaseButton" hidden=toggled>+</button>
               <span id="textSpan" onClick={this.toggleHidden}>{this.props.text}</span>
	       </div>
	);
    }
}

