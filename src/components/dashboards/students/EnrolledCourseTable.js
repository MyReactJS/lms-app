import React from 'react';
import enrolledCourses from './EnrolledCourses.json';
import axios from "axios";
import EnrolledCourseRow from './EnrolledCourseRow.js';
import './EnrolledCourseTable.css';
import { getUser } from './../../Common.js';
class EnrolledCourseTable extends React.Component {
    constructor(props) {
        super(props);
       
        this.tot_credits = 0;
        this.state = {
            enrolled_courses: []
        };
        enrolledCourses.forEach((course) => {
            
            this.tot_credits = this.tot_credits + course.credits;
        });
        this.props.setTotalCredits(this.tot_credits);
    }

    componentDidMount() {


        var local_courses = [];
        const profile = getUser();
        var userid = profile.id
        //console.log("userid:" + userid);
        axios.get("/api/core/enrolledsessions/?enrolledby=" + userid)
            .then(res1 => {
                // just grab the first 5 links
                const enrolled_course_sessions_data = res1.data.results
                //console.log(course_sessions_data);
                // NESTED AXIOS CALLS
                enrolled_course_sessions_data.forEach(enrolledsession => {
                    //console.log("course:" + coursesession.course);
                    //console.log("tot_seats:" + coursesession.tot_seats);
                    //console.log("rem_seats:" + coursesession.rem_seats);
                    //console.log("start_date:" + coursesession.start_date);
                    //console.log("start_date:" +  coursesession.end_date);
                    var local_course = new Map();                    
                    axios.get("/api/core/sessions/?id=" + enrolledsession.course)
                        .then(res2 => {
                            //console.log(res2.data);
                            const coursesession = res2.data.results[0];
                            const courseid = coursesession.course;
                            //console.log("courseid:" + courseid);
                            local_course.set('sessionId', coursesession.id);
                            local_course.set('start_date', new Date(coursesession.start_date));
                            local_course.set('end_date', new Date(coursesession.end_date));
                            local_course.set('courseId', courseid);
                            var todayDate = new Date();
                            if (local_course.get('end_date') < todayDate) //end date in past
                                local_course.set('status', 'Completed');
                            else if (local_course.get('start_date') < todayDate) //start date in past
                                local_course.set('status', 'In Progress');
                            else 
                                local_course.set('status', 'Not Started');
                            axios.get("/api/core/courses/" + courseid + "/")
                                .then(res3 => {
                                    const course = res3.data;
                                    const course_category_id = course.category
                                    local_course.set('credits', course.credit);
                                    local_course.set('duration', course.duration);
                                    local_course.set('name', course.name);
                                    axios.get("/api/core/category/" + course_category_id + "/")
                                        .then(res4 => {                                           
                                            const course_category = res4.data.name                                            
                                            local_course.set('category', course_category);                                            
                                            local_courses.push(local_course);

                                        })
                                })

                        })

                        .catch(err => {
                            console.log(err);
                        });
                })
                
            })
            .catch(err => {
                console.log(err);
            });
        console.log(local_courses);
        this.setState({ enrolled_courses: local_courses }, () => { console.log(this.state.enrolled_courses) });

    }
    render() {
        const rows = [];
        this.state.enrolled_courses.map((course) => {
            console.log(course);
            rows.push(<EnrolledCourseRow course={course} />);
        });
        console.log('rows.length:' + rows.length);
        var recCount = rows.length;
        return (
           
                    <div className="row">
                        <div className="container-fluid decor_bg" >
                            <div className="panel panel-primary">
                                <div className="container-fluid panel-heading"><h4>Enrolled Courses</h4></div>
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
export default EnrolledCourseTable;