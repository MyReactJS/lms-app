import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import CourseRow from './CourseRow.js';
import courses from './courses.json';
class CourseTable extends React.Component
{
    constructor(props)
    {
        super(props);
       
    }


    render() {
        const rows = [];
        //this.setState({ "courseNameFilter": this.props.courseNameFilter });
        //this.setState({ "courseCategoryFilter": this.props.courseCategoryFilter });
        //this.setState({ "courseCreditsFilter": this.props.courseCreditsFilter });
        //this.setState({ "courseStartDateFilter": this.props.courseStartDateFilter });
        //this.setState({ "courseEndDateFilter": this.props.courseEndDateFilter });
       
        var courseNameFilter = this.props.courseNameFilter;
        var courseCategoryFilter = this.props.courseCategoryFilter;
        var courseCreditsFilter = this.props.courseCreditsFilter;
        var courseStartDateFilter = this.props.courseStartDateFilter;
        var courseEndDateFilter = this.props.courseEndDateFilter;
        console.log("courseNameFilter: " + courseNameFilter);
        console.log("courseCategoryFilter: " + courseCategoryFilter);
        console.log("courseCreditsFilter: " + courseCreditsFilter);
        console.log("courseStartDateFilter: " + courseStartDateFilter);
        console.log("courseEndDateFilter: " + courseEndDateFilter);
        //alert(courseCreditsFilter);
        courses.forEach((course) =>
        {
            
            if (course.name.indexOf(courseNameFilter) === -1) //if name filter applied
               return;
            if (courseCategoryFilter !== '' && course.category !== courseCategoryFilter)
                return;
            
            if (courseCreditsFilter !== '' && course.credits != courseCreditsFilter)
                return;
            
            rows.push(<CourseRow course={course}/>);
        });

        var recCount = rows.length;
        //alert("row count: " + recCount);
        return (
            <div className="row">
                <div className="container-fluid decor_bg" >
                    <div className="panel panel-primary">
                        <div className="container-fluid panel-heading"><h4>Search Results</h4></div>
                        <div className="panel-body">
                            <h2> {recCount} course(s) found </h2>
                            <table className="table table-bordered table-hover">
                                <thead >
                                    <tr className="bg-primary">
                                        <th scope="col">Session Id</th>
                                        <th scope="col">Course Id</th>
                                        <th scope="col">Category</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">StartDate</th>
                                        <th scope="col">Duration</th>
                                        <th scope="col">Credits</th>
                                        <th scope="col">Remaining Seats</th>
                                        <th scope="col">Enroll/Cancel</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rows}
                                </tbody></table>
                        </div>
                    </div></div></div>
        );
    }
}
export default CourseTable;