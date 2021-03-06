import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import CourseSearch from './CourseSearch.js';
import CourseFilter from './CourseFilter.js';
import { withRouter } from "react-router-dom";
import CourseTableWithPagination from './CourseTableWithPagination.js';
import CourseTableWithoutPagination from './CourseTableWithoutPagination.js';
class FilterCourseTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = { rows:[], startdate: '', enddate: ''}
        this.setStartDateRangeFilter = this.setStartDateRangeFilter.bind(this);
        this.setEndDateRangeFilter = this.setEndDateRangeFilter.bind(this);
        this.setResultRows = this.setResultRows.bind(this);
    }
  
    setResultRows(r) {
        this.setState({ rows: r }, () => {
            console.log("setResultRows =" + this.state.rows.length);
     //       alert("setResultRows: " + this.state.rows.length);

        });
    }
    setStartDateRangeFilter(sdate) {
        this.setState({ startdate: sdate });
        //alert("startdate: " + sdate);
    }
    setEndDateRangeFilter( edate) {
        this.setState({ enddate: edate });
        //alert("enddate: " + edate);
    }
    
    render() {
       
            return (
                <div>

                    <CourseSearch setCourseStartDateFilter={this.setStartDateRangeFilter}
                        setCourseEndDateFilter={this.setEndDateRangeFilter} setResultRows={this.setResultRows} />
                    <CourseTableWithoutPagination rows={this.state.rows} />;
                </div>
            );
        
    }
}
export default withRouter(FilterCourseTable);
