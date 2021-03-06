import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

class EnrolledCourseRow extends React.Component {

    constructor(props) {
        super(props);
        
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
            <tr className="table-light" disabled={course.rem_seats === 0 ? true : false}>
              
                <td >{course.courseid}</td>
                <td >{course.category}</td>
                <td>{course.coursename}</td>
                <td>{this.GetFormattedDate(sdate)}</td>
                <td>{this.GetFormattedDate(edate)}</td>
                <td>{course.credit}</td>
                {today > edate?
                <td>Completed</td>
                :
                today > sdate?
                    <td>In Progress </td>
                    :
                    <td>Not Started</td>
                }
            </tr>
        );
    }
}

export default EnrolledCourseRow;