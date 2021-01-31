import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

class CourseDetailsPage extends React.Component
{
    render() {
        return
        (
            <h2>{this.props.coursename} </h2>
            );
    }
}
export default CourseDetailsPage;