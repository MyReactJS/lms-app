import React from 'react';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import ToggleButton from '../common/ToggleButton.js';
import Modal from 'react-bootstrap/Modal'
//import CourseDetailsPage from './CourseDetailsPage.js';
import Button from 'react-bootstrap/Button'
import './CourseRow.css';
import ModalComponent from './../common/ModalComponent.js';

class CourseRow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            remainingseats: this.props.course.get('rem_seats'),
            modalshow: false,
            modaltitle: '',
            modalbody: ''
        };

        this.onCourseLinkClick = this.onCourseLinkClick.bind(this);
        this.setRemainingSeats = this.setRemainingSeats.bind(this);
        this.GetFormattedDate = this.GetFormattedDate.bind(this);

    }
    setRemainingSeats(rem_seats) {

        this.setState({ remainingseats: rem_seats });
        
    }
    onCourseLinkClick() {
        //this.props.history.push('/coursedetails');

        this.setState({
            modalshow: true,
            modaltitle: 'Course Details',
            modalbody:  this.props.course.name ,

        });
    }
    handleConfirmModalClose = (fromModal) => {
        //alert(fromModal.msg);

        this.setState({
            modalshow: false
        });
        
    };
   

 GetFormattedDate(date) {

     var dd = String(date.getDate()).padStart(2, '0');
     var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
     var yyyy = date.getFullYear();

     date = mm + '/' + dd + '/' + yyyy;
     return date;
}
    render() {
        const course = this.props.course;
        console.log(course);
        console.log(course.get('end_date'));
        var todayDate = new Date();
        var disabled = false;
        var enrolled = false;
        var courseEndDate = course.get('end_date');
        var courseStartDate = course.get('start_date');

        let toggleOnLabel = "Enroll";
        let toggleOffLabel = "UnEnroll";
        //console.log(courseEndDate < todayDate);

        if (this.props.disabled == true) {

            disabled = true;
            enrolled = true;
        }

        else if (course.get('rem_seats') == 0 || (courseStartDate < todayDate))
            disabled = true;
        //console.log("toggleOnLabel:" + toggleOnLabel);
        return (
            <tr id={this.props.id} className={disabled==true?"table-secondary":"table-light"
    } disabled={disabled ? true : false}>
                <td >{course.get('courseId')}</td>
                <td >{course.get('sessionId')}</td>
                <td >{course.get('category')}</td>
                <td>

                    <Button size="lg" onClick={this.onCourseLinkClick}
                         variant = "link" > { course.get('name') }</Button>
                   <ModalComponent
                show={this.state.modalshow}
                title={this.state.modaltitle}
                body={this.state.modalbody}

                onClick={this.handleConfirmModalClose}
                   onHide={this.handleConfirmModalClose} />
              
               
                </td>      

                <td>{this.GetFormattedDate(course.get('start_date'))}</td>
                <td>{this.GetFormattedDate(course.get('end_date'))}</td>
                <td>{course.get('duration')}</td>
                <td>{course.get('credits')}</td>
                <td>{this.state.remainingseats} </td>
                <td> <ToggleButton disabled={disabled} enrolled={enrolled} toggleOnLabel={toggleOnLabel}
                    toggleOffLabel={toggleOffLabel} remainingseats={this.state.remainingseats} setRemainingSeats={this.setRemainingSeats} /> </td>
                
            </tr>
        )
    }
}


export default CourseRow;