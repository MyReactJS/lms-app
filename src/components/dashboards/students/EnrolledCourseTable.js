import React from 'react';
//import enrolledCourses from './EnrolledCourses.json';

import EnrolledCourseRow from './EnrolledCourseRow.js';
import './EnrolledCourseTable.css';

class EnrolledCourseTable extends React.Component {
    constructor(props) {
        super(props);
       
     
       
    }
    
    render() {
        
        const rows = [];
        //
        console.log('rows.length:' + this.props.enrolled_courses.length);

        this.props.enrolled_courses.map((course) => {
            //console.log(course);
            rows.push(<EnrolledCourseRow course={course} />);
        });
       // console.log('rows.length:' + rows.length);
        var recCount = rows.length;
        return (
           
                    <div className="row">
                        <div className="container-fluid decor_bg" >
                            <div className="panel panel-primary">
                                <div className="container-fluid panel-heading"><h4>Enrolled Courses</h4></div>
                        <div className="panel-body">
                            {
                                recCount == 0 ?
                                    <h2 className='noCourse'> No Courses </h2> :
                                    <table className="table table-bordered table-hover">
                                        <thead >
                                            <tr className="bg-primary">
                                                <th scope="col">Course Id</th>
                                                <th scope="col">Category</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">StartDate</th>
                                                <th scope="col">EndDate</th>
                                                <th scope="col">Credits</th>
                                                <th scope="col">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {rows}
                                        </tbody></table>
                            }
                                </div>
                            </div>
                        </div>
                    </div>
            
            );
    }
}
export default EnrolledCourseTable;