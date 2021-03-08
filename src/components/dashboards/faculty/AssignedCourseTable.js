import React from 'react';
import assignedCourses from './AssingedCourses.json';
import './AssignedCourseTable.css';
import AssignedCourseRow from './AssignedCourseRow.js';
class AssignedCourseTable extends React.Component {
    constructor(props) {
        super(props);
       
       
    }
    onViewModuleClick = (event) => {

        this.props.onViewModuleClick(event);

    }
    render() {
        const rows = [];
        this.props.assignedCourses.forEach((course) => {
            rows.push(<AssignedCourseRow course={course} history={this.props.history} />);
            
        });
        var recCount = rows.length;
        return (
           
                    <div className="row">
                        <div className="container-fluid decor_bg" >
                            <div className="panel panel-primary">
                                <div className="container-fluid panel-heading"><h4>Assigned Courses</h4></div>
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
                                                <th scope="col">Modules</th>
                                                <th scope="col">Evaluations</th>
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
export default AssignedCourseTable;