import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button'

class AssignedCourseRow extends React.Component {

    constructor(props) {
        super(props);

        this.GetFormattedDate = this.GetFormattedDate.bind(this);
        this.onViewEvluationClick = this.onViewEvluationClick.bind(this);
    }

    onViewModuleClick = (event,courseid) => {

        //alert("module");
        this.props.history.push({
            pathname: '/modules',
            "courseid": courseid,
        });
       event.preventDefault();

    }
    onViewEvluationClick(event) {
        alert("evaluation");
        // this.props.history.push('/modules');
        event.preventDefault();
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
            <tr className="table-light" >
              
                <td >{course.courseid}</td>
                <td >{course.category}</td>
                <td>{course.coursename}</td>
                <td>{this.GetFormattedDate(sdate)}</td>
                <td>{this.GetFormattedDate(edate)}</td>
                <td>{course.credit}</td>
                
                {today > edate ?
                    <td>Completed</td>
                    :
                    today > sdate ?
                        <td>In Progress </td>
                        :
                        <td>Not Started</td>
                }
               
                <td> <Button size="lg" onClick={(e) => { this.onViewModuleClick(e, course.courseid) }}
                    variant="link" > View</Button> </td>
                <td> <Button size="lg" onClick={this.onViewEvluationClick}
                    variant="link" > View </Button> </td>
            </tr>
           
        );
    }
}

export default AssignedCourseRow;