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
       // axios.get("/api/core/enrolledsessions/?enrolledby=" + userid)
         axios.get('/api/core/myenrolledsessions/',
             {
                 // Axios looks for the `auth` option, and, if it is set, formats a
                 // basic auth header for you automatically.

                 auth: {
                     username: profile.email,
                     password: profile.password
                 }
             }
         )
            .then(res1 => {
                // just grab the first 5 links
                const enrolled_course_sessions_data = res1.data.results
                this.setState({ enrolled_courses: enrolled_course_sessions_data }, () => {
                    console.log(this.state.enrolled_courses)
                    var totcredits = 0;
                    this.state.enrolled_courses.forEach((course) => {

                        totcredits = totcredits + course.credit;
                    });
                    this.setState({ tot_credits: totcredits }, () => {
                        console.log(this.state.tot_credits)
                    });
                });
                
                


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