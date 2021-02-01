import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import ToggleButton from '../common/ToggleButton.js';
import CourseDetailsPage from './CourseDetailsPage.js';
import Button from 'react-bootstrap/Button'
class CourseRow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            remainingseats: this.props.course.rem_seats
        };


        this.setRemainingSeats = this.setRemainingSeats.bind(this);
    }
    setRemainingSeats(rem_seats) {

        this.setState({ remainingseats: rem_seats });
    }
    render() {
        const course = this.props.course;
        var todayDate = new Date();
        var disabled = false;
        var courseEndDate = new Date(course.end_date);

        console.log(courseEndDate < todayDate);
        if (course.rem_seats == 0 || (courseEndDate < todayDate))
            disabled = true;
        return (
            <tr className="table-light" disabled={course.rem_seats === 0 ? true : false}>
                <td >{course.sessionId}</td>
                <td >{course.courseId}</td>
                <td >{course.category}</td>
                <td>
                    <Button href="#" variant="link" disabled={disabled}>{course.name}</Button> </td>
                <td>{course.start_date}</td>
                <td>{course.end_date}</td>
                <td>{course.duration}</td>
                <td>{course.credits}</td>
                <td>{course.rem_seats}</td>
                <td> <ToggleButton disabled={disabled} toggleOnLabel="Enroll"
                    toggleOffLabel="UnEnroll" remainingseats={this.state.remainingseats} setRemainingSeats={this.setRemainingSeats} /> </td>
                
            </tr>
        )
    }
}

export default CourseRow;