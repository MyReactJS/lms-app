import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import CourseRow from './CourseRow.js';
import courses from './courses.json';
class CourseTable extends React.Component
{



    render() {
        var rows = [];
   
       
        var courseNameFilter = this.props.courseNameFilter;
        var courseCategoryFilter = this.props.courseCategoryFilter;
        var courseCreditsFilter = this.props.courseCreditsFilter;
        var courseStartDateFilter = this.props.courseStartDateFilter=='' ? '' :this.props.courseStartDateFilter;
        var courseEndDateFilter = this.props.courseEndDateFilter == '' ? '' : this.props.courseEndDateFilter;
       
        console.log("courseNameFilter: " + courseNameFilter);
        console.log("courseCategoryFilter: " + courseCategoryFilter);
        console.log("courseCreditsFilter: " + courseCreditsFilter);
        console.log("courseStartDateFilter: " + courseStartDateFilter);
        console.log("courseEndDateFilter: " + courseEndDateFilter);
        
        courses.forEach((course) =>
        {
            let coursestartdate = new Date(course.start_date);
            let courseenddate = new Date(course.end_date);
            if (courseStartDateFilter == '' && courseEndDateFilter == '') {

               // console.log("courseStartDateFilter - table=" + courseStartDateFilter);
               // console.log("courseEndDateFilter - table=" + courseEndDateFilter);
                if (course.name.toLowerCase().indexOf(courseNameFilter.toLowerCase()) === -1) //if name filter applied
                    return;
                if (courseCategoryFilter !== '' && course.category !== courseCategoryFilter)
                    return;

                if (courseCreditsFilter !== '' && course.credits != courseCreditsFilter)
                    return;
                rows.push(<CourseRow course={course} />);
            }
            else
            {
                console.log("courseStartDateFilter - table=" + courseStartDateFilter);
                console.log("courseEndDateFilter - table=" + courseEndDateFilter);
                if (courseStartDateFilter !== '' && courseEndDateFilter !== ''
                    && coursestartdate >= courseStartDateFilter && courseenddate <= courseEndDateFilter)
                    rows.push(<CourseRow id={course.sessionId} course={course} />);
            }
           
             
            
        });

        var recCount = rows.length;
        
        return (
            <div className="row">
                <div className="container-fluid decor_bg" >
                    <div className="panel panel-primary">
                        <div className="container-fluid panel-heading"><h4>Search Results</h4></div>
                        <div className="panel-body">
                            <h2> {recCount} course(s) found </h2>
                            <table className="table table-bordered table-hover">
                                <thead >
                                    <tr id='courserow' className="bg-primary">
                                       
                                        <th scope="col">Course Id</th>
                                        <th scope="col">Category</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Start Date</th>
                                        <th scope="col">End Date</th>
                                        <th scope="col">Duration (days)</th>
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