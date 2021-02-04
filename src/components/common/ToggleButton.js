import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
//ReactDOM.render(<ToggleButton />, document.getElementById('root'));
//
//
import CourseEnrollConfirmModel from './../coursepage/CourseEnrollConfirmModel.js';
class ToggleButton extends React.Component {
    constructor(props) {
        super(props);
        console.log("inside toggleOnLabel:" + this.props.toggleOnLabel);
        this.state = {
            isToggleOn: true,
           
            ToggleOnLabel: this.props.toggleOnLabel,
            ToggleOffLabel: this.props.toggleOffLabel
        };
      

        this.handleClick = this.handleClick.bind(this);
      
    }
  
    handleClick(event) {
        console.log("before:" + this.props.remainingseats);
        //alert(event.target.value);
       
        if (this.state.isToggleOn) {
            this.props.setRemainingSeats(this.props.remainingseats - 1);
               
        }
        else {
            
            this.props.setRemainingSeats(this.props.remainingseats + 1);  
           
        }
        this.setState(state => ({
            isToggleOn: !state.isToggleOn

        }));
        console.log("After:" + this.props.remainingseats);
        event.stopPropagation();
        event.preventDefault();
    }
    
    render() {
        let button = null;
        console.log("inside render: " + this.state.ToggleOnLabel);
        if (this.props.enrolled)
            button = <button type="button" onClick={this.handleClick} className="btn btn-secondary btn-block" disabled={this.props.disabled}>
                Enrolled</button>;
        else if (this.props.disabled) {

            button = <button type="button" onClick={this.handleClick} className="btn btn-secondary btn-block" disabled={this.props.disabled}>
                Enroll</button>;
        }
        else {
            button = <button type="button" onClick={this.handleClick} className="btn btn-primary btn-block" disabled={this.props.disabled}>
                {this.state.isToggleOn ? this.state.ToggleOnLabel : this.state.ToggleOffLabel}</button>;

        }

        return (
            
              
                    button
            
        );
    }
}
export default ToggleButton;