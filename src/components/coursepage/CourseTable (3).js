import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import CourseRow from './CourseRow.js';
import courses from './courses.json';
class CourseTable extends React.Component
{
    constructor(props)
    {
        super(props);
       
        
    }


    render() {
        const rows = [];
        //this.setState({ "courseNameFilter": this.props.courseNameFilter });
        //this.setState({ "courseCategoryFilter": this.props.courseCategoryFilter });
        //this.setState({ "courseCreditsFilter": this.props.courseCreditsFilter });
        //this.setState({ "courseStartDateFilter": this.props.courseStartDateFilter });
        //this.setState({ "courseEndDateFilter": this.props.courseEndDateFilter });

        var courseNameFilter = this.props.courseNameFilter;
        var courseCategoryFilter = this.props.courseCategoryFilter;
        var courseCreditsFilter = this.props.courseCreditsFilter;
        var courseStartDateFilter = this.props.courseStartDateFilter;
        var courseEndDateFilter = this.props.courseEndDateFilter;
        console.log("courseNameFilter: " + courseNameFilter);
        console.log("courseCategoryFilter: " + courseCategoryFilter);
        console.log("courseCreditsFilter: " + courseCreditsFilter);
        console.log("courseStartDateFilter: " + courseStartDateFilter);
        console.log("courseEndDateFilter: " + courseEndDateFilter);

        courses.forEach((course) =>
        {
            
            //if (course.name.indexOf(courseNameFilter) === -1) //if name filter applied
             //   return;
            if (courseCategoryFilter !== '' && course.category !== courseCategoryFilter)
                return;
            //if (courseCreditsFilter !== '' && course.credits !== courseCreditsFilter)
              //  return;
            
            rows.push(<CourseRow course={course}/>);
        });
        var recCount = 0;
        recCount=rows.length;
        alert("row count: " + recCount);
        return (
            <h2>{recCount} records found </h2>
        );
     }
}
export default CourseTable;