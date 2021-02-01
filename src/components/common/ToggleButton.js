import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
//ReactDOM.render(<ToggleButton />, document.getElementById('root'));
//
//
class ToggleButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isToggleOn: true,
            ToggleOnLabel: this.props.toggleOnLabel,
            ToggleOffLabel: this.props.toggleOffLabel,
            remainingseats: this.props.remainingseats
        };
       
        this.handleClick = this.handleClick.bind(this);
      
    }
    handleClick(event) {
        
        //alert(event.target.value);
        if (this.state.isToggleOn ) {
            this.setState({
                remainingseats: this.state.remainingseats + 1
            });    
        }
        else {
            this.setState({
                remainingseats: this.state.remainingseats - 1
            });
           
        }
        this.props.setRemainingSeats(this.state.remainingseats);        
        this.setState(state => ({
            isToggleOn: !state.isToggleOn

        }));
        event.stopPropagation();
        event.preventDefault();
    }
    
    render() {
        let button = null;
        if (this.props.disabled) {

            button = <button type="button" onClick={this.handleClick} className="btn btn-secondary btn-block" disabled={this.props.disabled}>
                Enroll</button>;
        }
        else {
            button = <button type="button"  onClick={this.handleClick} className="btn btn-primary btn-block" disabled={this.props.disabled}>
                {this.state.isToggleOn ? this.state.ToggleOnLabel : this.state.ToggleOffLabel}</button>;

         }

        return (
            //<button type="button" href="#" className="btn btn-link">Enroll</button>
            button
        );
    }
}
export default ToggleButton;