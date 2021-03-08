import React from 'react';
import StudentRow from './StudentRow.js';
class StudentTable extends React.Component {
    constructor(props) {
        super(props);
       
       
    }
 
    render() {
        const rows = this.props.rows;
       
        var recCount = rows.length;
        return (

            <div className="row">
                <div className="container-fluid decor_bg" >
                    <div className="panel panel-primary">
                        <div className="container-fluid panel-heading"><h4>Enrolled Students</h4></div>
                        <div className="panel-body">
                            {
                                recCount == 0 ?
                                    <h2 className='noCourse'> No Students </h2> :
                                    <table className="table table-bordered table-hover">
                                        <thead >
                                            <tr className="bg-primary">

                                                <th scope="col">Student Id</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Email</th>
                                                <th scope="col">Phone</th>

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
export default StudentTable;