import React from 'react';
import enrolledCourses from './EnrolledCourses.json';
import EnrolledCourseRow from './EnrolledCourseRow.js';
class EnrolledCourseTable extends React.Component {
    constructor(props) {
        super(props);
       
        this.tot_credits = 0;
        
        enrolledCourses.forEach((course) => {
            
            this.tot_credits = this.tot_credits + course.credits;
        });
        this.props.setTotalCredits(this.tot_credits);
    }
    render() {
        const rows = [];
        enrolledCourses.forEach((course) => {
            rows.push(<EnrolledCourseRow course={course} />);
            
        });
       
        return (
            <div className="row">
                <div className="container-fluid decor_bg" >
                    <div className="panel panel-primary">
                        <div className="container-fluid panel-heading"><h4>Enrolled Courses</h4></div>
                        <div className="panel-body">
                            <table className="table table-bordered table-hover">
                                <thead >
                                    <tr className="bg-primary">
                                        <th scope="col">Session Id</th>
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
                        </div>
                    </div>
                </div>
            </div>

            );
    }
}
export default EnrolledCourseTable;