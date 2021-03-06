import React from 'react';
import $ from 'jquery'; 
class CourseTableWithoutPagination extends React.Component
{
    constructor(props) {
        super(props);
    }
    render() {
        var recCount = this.props.rows.length;
        return (
            <div className="row">
                <div className="container-fluid decor_bg" >
                    <div className="panel panel-primary">
                        <div className="container-fluid panel-heading"><h4>Search Results</h4></div>
                        <div className="panel-body">
                           
                            {recCount == 0 ?
                                 <div className="col-lg-5"> <h2> {recCount} course(s) found </h2> </div>
                                 :
                                <div>
                                    <div className="row">
                                        <div className="col-lg-5"> <h2> {recCount} course(s) found </h2> </div>
                                
                                        </div>
                                    <table className="table table-bordered table-hover">
                                        <thead >
                                            <tr id='courserow' className="bg-primary">
                                                <th scope="col">Course Id</th>
                                                <th scope="col">Session Id</th>
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
                                            {this.props.rows}
                                        </tbody>
                                    </table>
                                    

                                </div>
                            }
                    </div> </div> </div>  </div>
        );
    }
}
export default CourseTableWithoutPagination;