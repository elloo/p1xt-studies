class FontChooser extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            hidden: true, 
            bold: this.props.bold == 'true' ? true : false,
            size: Number(this.props.size),
            limit: false,
            min: Number(this.props.min) < Number(this.props.max) ? Number(this.props.min) : Number(this.props.max),
            max: Number(this.props.max) > Number(this.props.min) ? Number(this.props.max) : Number(this.props.min)
        };
    }
    
    toggleHidden() {
        this.setState({ hidden: !this.state.hidden });
    }
    
    toggleWeight() {
        this.setState({ bold: !this.state.bold });
    }
    
    decrementSize() {
        if (this.state.size > this.state.min){
            this.setState({ size: this.state.size - 1 });
        } 
        
        if (this.state.size <= this.state.min + 1){
            this.setState({ limit: true });
        } else {
            this.setState({ limit: false });
        }
    }
    
    incrementSize() {
        if (this.state.size < this.state.max){
            this.setState({ size: this.state.size + 1 });
        } 
        
        if (this.state.size >= this.state.max - 1){
            this.setState({ limit: true });
        } else {
            this.setState({ limit: false });
        }
    }
    
    defaultSize() {
        this.setState({ 
            size: Number(this.props.size),
            limit: false
        });                
    }

    render() {
        
        if (Number(this.props.min) <= 0){
            this.setState({ min: 1 });
        }
        
        if (this.state.size < this.props.min){
            if (Number(this.props.min) < Number(this.props.max)){
                this.setState({ size: Number(this.props.min), limit: true });    
            } else {
                this.setState({ size: Number(this.props.max), limit: true });
            }
        } else
        if (Number(this.state.size) > Number(this.props.max)){
            if (Number(this.props.min) > Number(this.props.max)){
                this.setState({ size: Number(this.props.min), limit: true });    
            } else {
                this.setState({ size: Number(this.props.max), limit: true });
            }
        }
        
        var toggled = this.state.hidden;
        var weightToggle = this.state.bold ? 'bold' : 'normal';
        var checked = this.state.bold ? true : false;
        var size = this.state.size;
        var min = this.state.min;
        var limit = this.state.limit ? 'red' : 'black';
        
        return(
           <div>
               <input type="checkbox" id="boldCheckbox" defaultChecked={checked} hidden={toggled} onChange={this.toggleWeight.bind(this)}/>
               <button id="decreaseButton" hidden={toggled} onClick={this.decrementSize.bind(this)}>-</button>
               <span id="fontSizeSpan" hidden={toggled}>{size}</span>
               <button id="increaseButton" hidden={toggled} onClick={this.incrementSize.bind(this)}>+</button>
               <span id="textSpan" style={{fontWeight: weightToggle, fontSize: size, color: limit}} onClick={this.toggleHidden.bind(this)} onDoubleClick={this.defaultSize.bind(this)}>{this.props.text}</span>
           </div>
        );
    }
}

