import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import CourseRow from './CourseRow.js';
import courses from './courses.json';
import enrolledcourses from './../dashboards/students/EnrolledCourses.json';
import axios from 'axios';
import { useEffect } from 'react';
import CourseTableWithPagination from './CourseTableWithPagination.js';
class CourseFilter extends React.Component
{
    render() {
        var rows = [];
        var enrolledcourses_sessionids = [];
        enrolledcourses.forEach((course) => {
            enrolledcourses_sessionids.push(course.sessionId);

        });

        var courseNameFilter = this.props.courseNameFilter;
        var courseCategoryFilter = this.props.courseCategoryFilter;
        var courseCreditsFilter = this.props.courseCreditsFilter;
        var courseStartDateFilter = this.props.courseStartDateFilter == '' ? '' : this.props.courseStartDateFilter;
        var courseEndDateFilter = this.props.courseEndDateFilter == '' ? '' : this.props.courseEndDateFilter;

        /* console.log("courseNameFilter: " + courseNameFilter);
         console.log("courseCategoryFilter: " + courseCategoryFilter);
         console.log("courseCreditsFilter: " + courseCreditsFilter);
         console.log("courseStartDateFilter: " + courseStartDateFilter);
         console.log("courseEndDateFilter: " + courseEndDateFilter);
         console.log(enrolledcourses_sessionids);*/
        courses.forEach((course) => {
            //console.log(course.sessionId +"=" + enrolledcourses_sessionids.includes(course.sessionId));
            let coursestartdate = new Date(course.start_date);
            let courseenddate = new Date(course.end_date);

            // console.log("courseStartDateFilter - table=" + courseStartDateFilter);
            // console.log("courseEndDateFilter - table=" + courseEndDateFilter);
            if (course.name.toLowerCase().indexOf(courseNameFilter.toLowerCase()) === -1) //if name filter applied
                return;
            if (courseCategoryFilter !== '' && course.category !== courseCategoryFilter)
                return;

            if (courseCreditsFilter !== '' && course.credits != courseCreditsFilter)
                return;

            if (courseStartDateFilter !== '' && courseEndDateFilter !== '') {
                //console.log("courseStartDateFilter - table=" + courseStartDateFilter);
                //console.log("courseEndDateFilter - table=" + courseEndDateFilter);
                if (coursestartdate >= courseStartDateFilter && courseenddate <= courseEndDateFilter)
                    rows.push(<CourseRow disabled={enrolledcourses_sessionids.includes(course.sessionId)}
                        id={course.sessionId} course={course} />);
            }
            else if (courseStartDateFilter !== '') {
                //console.log("courseStartDateFilter - table=" + courseStartDateFilter);
                //console.log("courseEndDateFilter - table=" + courseEndDateFilter);
                if (coursestartdate >= courseStartDateFilter)
                    rows.push(<CourseRow disabled={enrolledcourses_sessionids.includes(course.sessionId)}
                        id={course.sessionId} course={course} />);
            }
            else if (courseEndDateFilter !== '') {
                //console.log("courseStartDateFilter - table=" + courseStartDateFilter);
                //console.log("courseEndDateFilter - table=" + courseEndDateFilter);
                if (courseenddate <= courseEndDateFilter)
                    rows.push(<CourseRow disabled={enrolledcourses_sessionids.includes(course.sessionId)}
                        id={course.sessionId} course={course} />);
            }
            else {
                rows.push(<CourseRow disabled={enrolledcourses_sessionids.includes(course.sessionId)}
                    id={course.sessionId} course={course} />);
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
                            {recCount == 0 ?
                                null :
                                       <CourseTableWithPagination courses={rows} />
                                
                            }
                        </div>
                    </div></div></div>
        );
    }
}
export default CourseFilter;