import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import CourseRow from './CourseRow.js';
import courses from './courses.json';
import enrolledcourses from './../dashboards/students/EnrolledCourses.json';
import axios from 'axios';
import { useEffect } from 'react';
import CourseTableWithPagination from './CourseTableWithPagination.js';
import CourseFilter from './CourseFilter.js';
class CourseFilterPagination extends React.Component
{
    constructor(props) {
        super(props);
        this.state = { rows:this.props.rows };

    }
   
        

    render() {
        var recCount = this.props.rows.length;

        return (
            <div className="row">
                <div className="container-fluid decor_bg" >
                    <div className="panel panel-primary">
                        <div className="container-fluid panel-heading"><h4>Search Results</h4></div>
                        <div className="panel-body">
                            <h2> {recCount} course(s) found </h2>
                            {recCount == 0 ?
                                null :
                                <CourseTableWithPagination courses={this.props.rows} />

                            }
                        </div>
                    </div></div></div>
        );
          
    }
}
export default CourseFilterPagination;