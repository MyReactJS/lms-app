import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import CourseSearch from './CourseSearch.js';
import CourseTable from './CourseTable.js';
class FilterCourseTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = { category:'', credits:'', name: '' ,startdate:'',enddate:''}
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

    }
    setCourseCategoryFilter(value) {
        this.setState({ category: value });
    }
    setStartDateRangeFilter(sdate) {
        this.setState({ startdate: sdate });
    }
    setEndDateRangeFilter( edate) {
        this.setState({ enddate: edate });
    }
    
render() {
    const categories = [];
    this.props.courses.forEach((course) => {
        if (!categories.includes(course.category))
            categories.push(course.category);
    });
   
        return (
            <div>
                <CourseSearch courseNameFilter={this.setCourseNameFilter} courseCategoryFilter={this.setCourseCategoryFilter}
                    courseCreditsFilter={this.setCreditFilter} courseStartDateFilter={this.setStartDateRangeFilter}
                    courseEndDateFilter={this.setEndDateRangeFilter} categories={categories} />
            </div>
        );
    }

}
export default FilterCourseTable;
