import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import CourseSearch from './CourseSearch.js';
import CourseFilter from './CourseFilter.js';
import { withRouter } from "react-router-dom";
class FilterCourseTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = { category: '', credits: '', name: '', startdate: '', enddate: ''}
        this.setCreditFilter = this.setCreditFilter.bind(this);
        this.setCourseNameFilter = this.setCourseNameFilter.bind(this);
        this.setCourseCategoryFilter = this.setCourseCategoryFilter.bind(this);
        this.setStartDateRangeFilter = this.setStartDateRangeFilter.bind(this);
        this.setEndDateRangeFilter = this.setEndDateRangeFilter.bind(this);
       
    }
  
    setCreditFilter(value)
    {
       
        this.setState({ credits: value });
       
    }

    setCourseNameFilter(value) {
        this.setState({ name: value });
        //alert("name: " + value);

    }
    setCourseCategoryFilter(value) {
        this.setState({ category: value });
        //alert("category: " + value);
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

                    <CourseSearch setCourseNameFilter={this.setCourseNameFilter} setCourseCategoryFilter={this.setCourseCategoryFilter}
                        setCreditFilter={this.setCreditFilter} setCourseStartDateFilter={this.setStartDateRangeFilter}
                        setCourseEndDateFilter={this.setEndDateRangeFilter} />
                    <CourseFilter courseNameFilter={this.state.name} courseCategoryFilter={this.state.category}
                        courseCreditsFilter={this.state.credits} courseStartDateFilter={this.state.startdate}
                        courseEndDateFilter={this.state.enddate} courses={this.props.courses} />;
                </div>
            );
        
    }
}
export default withRouter(FilterCourseTable);
