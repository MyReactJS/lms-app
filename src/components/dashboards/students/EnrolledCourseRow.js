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

        return (
            <tr className="table-light" disabled={course.rem_seats === 0 ? true : false}>
              
                <td >{course.get('courseId')}</td>
                <td >{course.get('category')}</td>
                <td>{course.get('name')}</td>
                <td>{this.GetFormattedDate(course.get('start_date'))}</td>
                <td>{this.GetFormattedDate(course.get('end_date'))}</td>
                <td>{course.get('credits')}</td>
                <td>{course.get('status')}</td>

            </tr>
        );
    }
}

export default EnrolledCourseRow;