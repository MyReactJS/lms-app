import React from 'react';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import ToggleButton from '../common/ToggleButton.js';
import Modal from 'react-bootstrap/Modal'
//import CourseDetailsPage from './CourseDetailsPage.js';
import Button from 'react-bootstrap/Button'

import ModalComponent from './../common/ModalComponent.js';
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import './CourseCard.css';
class CourseCard extends React.Component {

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

    setRemainingSeats = (rem_seats) => {

        this.setState({ rem_seats: rem_seats }, () => { console.log(this.state.rem_seats) });

    }

    onCourseLinkClick() {
        //this.props.history.push('/coursedetails');

        this.setState({
            modalshow: true,
            modaltitle: 'Course Details',
            modalbody: this.props.course.coursename,

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
        const todayDate = new Date();
        var disabled = false;
        var enrolled = false;
        var courseEndDate = new Date(course.end_date);
        var courseStartDate = new Date(course.start_date);
        if (this.props.enrolled == true && (courseStartDate < todayDate)) {
            enrolled = true;
            disabled = true;
        }
        else if (this.props.enrolled == true && (courseStartDate > todayDate)) {
            enrolled = true;
            disabled = false;
        }
        else if (this.props.enrolled == false && (course.rem_seats == 0 || (courseStartDate < todayDate)))
        {
            disabled = true;
            enrolled = false;
        }
        
        return (
       
            <Card border="primary"  style={{ width: '18rem' }}>
                <Card.Header className="bg-primary">
                    <h3> {course.coursename}</h3>
             
                    <ModalComponent
                        show={this.state.modalshow}
                        title={this.state.modaltitle}
                        body={this.state.modalbody}

                        onClick={this.handleConfirmModalClose}
                        onHide={this.handleConfirmModalClose} />
                </Card.Header>
                <Card.Body>
                    
     
                    <ListGroup variant="flush">
                        <ListGroup.Item>Category: {course.category}
                        </ListGroup.Item>
                        <ListGroup.Item> Schedule: {this.GetFormattedDate(new Date(course.start_date))} - {this.GetFormattedDate(new Date(course.end_date))}</ListGroup.Item>
                        <ListGroup.Item>Credits: {course.credit}</ListGroup.Item>
                        <ListGroup.Item>Reamining Seats: {this.state.rem_seats}</ListGroup.Item>
                    </ListGroup>
                  <ToggleButton disabled={disabled} enrolled={enrolled}
                                sessionid={course.id} remainingseats={this.state.rem_seats}
                                setRemainingSeats={this.setRemainingSeats} />

                </Card.Body>
                </Card>
               
        
                );
    }
}

export default CourseCard;