import React from 'react';
import ProfileS from './ProfileS.js';
import EnrolledCourseTable from './EnrolledCourseTable.js';
import { getUser } from './../../Common.js';
import axios from "axios";
class DashBoardS extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            tot_credits: 0,
            enrolled_courses: [],
        }
        this.getData = this.getData.bind(this);

       
    }
     getData() {
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
                                            console.log(local_courses);
                                            this.setState({ enrolled_courses: local_courses}, () => {
                                                console.log(this.state.enrolled_courses)
                                            });

                                            var totcredits = 0;
                                            this.state.enrolled_courses.map((course) => {

                                                totcredits = totcredits + course.get('credits');
                                            });
                                            this.setState({ tot_credits: totcredits }, () => {
                                                console.log(this.state.tot_credits)
                                            });
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
    }
    componentDidMount()
    {

        
       

            this.getData();
        
              
      
       

    }
  
    render() {
        return (
            <div>
                <ProfileS tot_credits={this.state.tot_credits} />
                <EnrolledCourseTable enrolled_courses={this.state.enrolled_courses}/>
            </div>
        );
    }
}



export default  DashBoardS;