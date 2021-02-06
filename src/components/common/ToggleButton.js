import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import ModalComponent from './ModalComponent.js';
//ReactDOM.render(<ToggleButton />, document.getElementById('root'));
//
//
import CourseEnrollConfirmModel from './../coursepage/CourseEnrollConfirmModel.js';
class ToggleButton extends React.Component {
    constructor(props) {
        super(props);
       // console.log("inside toggleOnLabel:" + this.props.toggleOnLabel);
        this.state = {
            isToggleOn: true,
            modalshow: false,
            modaltitle: '',
            modalbody: '',
            ToggleOnLabel: this.props.toggleOnLabel,
            ToggleOffLabel: this.props.toggleOffLabel
        };
      

        this.handleClick = this.handleClick.bind(this);
      
    }
    handleConfirmModalClose = (fromModal) => {
        //alert(fromModal.msg);

        this.setState({
            modalshow: false
        });
    };
    handleClick(event) {
        console.log("before:" + this.props.remainingseats);
        //alert(event.target.value);
       
        if (this.state.isToggleOn) {
            this.props.setRemainingSeats(this.props.remainingseats - 1);
            this.setState({
                modalshow: true,
                modaltitle: 'Enrollment',
                modalbody: 'Enrolled' ,

            });
        }
        else {
            
            this.props.setRemainingSeats(this.props.remainingseats + 1);  
            this.setState({
                modalshow: true,
                modaltitle: 'Enrollment',
                modalbody: 'Un-Enrolled',

            });
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
        //console.log("inside render: " + this.state.ToggleOnLabel);
        if (this.props.enrolled)

            
                button = <div> <button type="button" onClick={this.handleClick} className="btn btn-secondary btn-block" disabled={this.props.disabled}>
                    Enrolled</button>
            </div>
        else if (this.props.disabled) {

            
            button = <div> <button type="button" onClick={this.handleClick} className="btn btn-secondary btn-block" disabled={this.props.disabled}>
                    Enroll</button>
            </div>
        }
        else {
            button = <div> <button type="button" onClick={this.handleClick} className={this.state.isToggleOn ? "btn btn-primary btn-block" : "btn btn-success btn-block"} disabled={this.props.disabled}>
                {this.state.isToggleOn ? this.state.ToggleOnLabel : this.state.ToggleOffLabel}</button>
            <ModalComponent
                show={this.state.modalshow}
                title={this.state.modaltitle}
                body={this.state.modalbody}

                onClick={this.handleConfirmModalClose}
                   onHide={this.handleConfirmModalClose} />
               </div>
        }

        return (
            
              
            button

            
        );
    }
}
export default ToggleButton;