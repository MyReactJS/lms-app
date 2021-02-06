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
            remainingseats: this.props.course.rem_seats,
            modalshow: false,
            modaltitle: '',
            modalbody: ''
        };

        this.onCourseLinkClick = this.onCourseLinkClick.bind(this);
        this.setRemainingSeats = this.setRemainingSeats.bind(this);
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

    render() {
        const course = this.props.course;
        var todayDate = new Date();
        var disabled = false;
        var enrolled = false;
        var courseEndDate = new Date(course.end_date);
        var courseStartDate = new Date(course.start_date);

        let toggleOnLabel = "Enroll";
        let toggleOffLabel = "UnEnroll";
        //console.log(courseEndDate < todayDate);
        
        if (this.props.disabled==true)
        {
            
            disabled = true;
            enrolled = true;
        }
      
        else if (course.rem_seats == 0 || ( courseStartDate <todayDate))
            disabled = true;
        //console.log("toggleOnLabel:" + toggleOnLabel);
        return (
            <tr id={this.props.id} className="table-light" disabled={course.rem_seats === 0 ? true : false}>
                <td >{course.courseId}</td>
                <td >{course.sessionId}</td>
                <td >{course.category}</td>
                <td>

                    <Button size="lg" onClick={this.onCourseLinkClick}
                         variant = "link" > { course.name }</Button>
                  
               
                </td>      

                <td>{course.start_date}</td>
                <td>{course.end_date}</td>
                <td>{course.duration}</td>
                <td>{course.credits}</td>
                <td>{this.state.remainingseats} </td>
                <td> <ToggleButton disabled={disabled} enrolled={enrolled} toggleOnLabel={toggleOnLabel}
                    toggleOffLabel={toggleOffLabel} remainingseats={this.state.remainingseats} setRemainingSeats={this.setRemainingSeats} /> </td>
                
            </tr>
        )
    }
}


export default CourseRow;