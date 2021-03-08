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
                
            rem_seats: this.props.course.rem_seats,
            modalshow: false,
            modaltitle: '',
            modalbody: ''
        };

        this.onCourseLinkClick = this.onCourseLinkClick.bind(this);
     
        this.GetFormattedDate = this.GetFormattedDate.bind(this);

    }

    setRemainingSeats = ( rem_seats) => {

        this.setState({ rem_seats: rem_seats }, () => { console.log(this.state.rem_seats) });

    }
    
    onCourseLinkClick() {
        //this.props.history.push('/coursedetails');

        this.setState({
            modalshow: true,
            modaltitle: 'Course Details',
            modalbody:  this.props.course.coursename ,

        });
    }
    handleConfirmModalClose = (fromModal) => {
        //alert(fromModal.msg);

        this.setState({
            modalshow: false
        });
        
    };
    componentDidUpdate(prevProps, prevState) {
        if (this.props.course.id != prevProps.course.id)
            this.setState({ rem_seats: this.props.course.rem_seats }, () => { });
    }
   
 GetFormattedDate(date) {

     var dd = String(date.getDate()).padStart(2, '0');
     var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
     var yyyy = date.getFullYear();

     date = mm + '/' + dd + '/' + yyyy;
     return date;
    }
 
    render() {
        const course = this.props.course;
       // console.log(course);
        //console.log(course.get('end_date'));
        const todayDate = new Date();
        var disabled = false;
        var enrolled = false;
        var courseEndDate = new Date(course.end_date);
        var courseStartDate = new Date(course.start_date);

     
        //console.log(courseEndDate < todayDate);

        //console.log(this.props.enrolled);
        if (this.props.enrolled == true) {

            enrolled = true;
           // console.log(enrolled);

        }
        
         if (course.rem_seats == 0 || (courseStartDate < todayDate))
            disabled = true;
        //console.log("toggleOnLabel:" + toggleOnLabel);
        return (
            <tr id={this.props.id} className={disabled==true?"table-secondary":"table-light"
    } disabled={disabled ? true : false}>
                <td >{course.courseid}</td>
                <td >{course.id}</td>
                <td >{course.category}</td>
                <td>

                    <Button size="lg" onClick={this.onCourseLinkClick}
                         variant = "link" > { course.coursename }</Button>
                   <ModalComponent
                show={this.state.modalshow}
                title={this.state.modaltitle}
                body={this.state.modalbody}

                onClick={this.handleConfirmModalClose}
                   onHide={this.handleConfirmModalClose} />
              
               
                </td>      

                <td>{this.GetFormattedDate(new Date(course.start_date))}</td>
                <td>{this.GetFormattedDate(new Date(course.end_date))}</td>
                <td>{course.duration}</td>
                <td>{course.credit}</td>
                <td>{this.state.rem_seats} </td>
                <td> <ToggleButton disabled={disabled} enrolled={enrolled}
                    sessionid={course.id} remainingseats={this.state.rem_seats}
                    setRemainingSeats={this.setRemainingSeats} /> </td>
                
            </tr>
        )
    }
}


export default CourseRow;