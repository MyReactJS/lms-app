import React from 'react';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Modal from 'react-bootstrap/Modal'
//import CourseDetailsPage from './CourseDetailsPage.js';
import Button from 'react-bootstrap/Button'

import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
//import './EnrolledCourseCard.css';
class EnrolledCourseCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            rem_seats: this.props.course.rem_seats,
            modalshow: false,
            modaltitle: '',
            modalbody: ''
        };


        this.GetFormattedDate = this.GetFormattedDate.bind(this);

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
        var today = new Date();
        var sdate = new Date(course.start_date);
        var edate = new Date(course.end_date);


      
        return (

            <Card border="primary" style={{ width: '18rem' }}>
                <Card.Header className="bg-primary">
                    <h3> {course.coursename}</h3>

                  
                </Card.Header>
                <Card.Body>
                <ListGroup variant="flush">
                        <ListGroup.Item>Category: {course.category}
                        </ListGroup.Item>
                        <ListGroup.Item> Schedule: {this.GetFormattedDate(new Date(course.start_date))} - {this.GetFormattedDate(new Date(course.end_date))}</ListGroup.Item>
                        <ListGroup.Item>Credits: {course.credit}</ListGroup.Item>
                    </ListGroup>

                </Card.Body>
            </Card>


        );
    }
}

export default EnrolledCourseCard;