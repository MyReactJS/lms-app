import React from 'react';
//import enrolledCourses from './EnrolledCourses.json';

import EnrolledCourseRow from './EnrolledCourseRow.js';
import EnrolledCourseCard from './EnrolledCourseCard.js';
import CardDeck from 'react-bootstrap/CardDeck'

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
            rows.push(<EnrolledCourseCard course={course} />);
        });

        var recCount = rows.length;
        var finalrows = [];
        if (recCount != 0) {
            var j = 0;
            for (var i = 0; i < recCount; i = i + 3) {
                j = recCount < (i + 3) ? recCount : (i + 3);
                finalrows.push(

                    <CardDeck >


                        {rows.slice(i, j)};

                            </CardDeck>


                )
            }


        }

        return (
           
                    <div className="row">
                        <div className="container-fluid decor_bg" >
                            <div className="panel panel-primary">
                                <div className="container-fluid panel-heading"><h4>Enrolled Courses</h4></div>
                        <div className="panel-body">
                            {
                                recCount == 0 ?
                                    <h2 className='noCourse'> No Courses </h2> :
                                   
                                            finalrows
                                       
                            }
                                </div>
                            </div>
                        </div>
                    </div>
            
            );
    }
}
export default EnrolledCourseTable;