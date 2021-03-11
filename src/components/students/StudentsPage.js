import React from 'react';
import { withRouter } from "react-router-dom";
import StudentsFilter from './StudentsFilter.js';
import StudentsTable from './StudentsTable.js';
import StudentRow from './StudentRow.js';
import axios from "axios";
import { getUser } from './../Common.js';
class StudentsPage extends React.Component {

    constructor(props) {
        super(props);
        this.students = [];
        this.state = {
            rows:[],
       
            sessionid: null,
            sessions: new Map(),
            students:[],
		}
        this.setCourseSession = this.setCourseSession.bind(this);
       
        this.getData();

    }
    getData () {

        const profile = getUser();
        var password = profile.password;
        //alert("componentDidMount");
        var local_sessions = new Map();
        axios.get('/api/core/mysessions/',
            {

                auth: {
                    username: profile.email,
                    password: password
                }
            }
        )
            .then(res1 => {
                //alert("inside response");
                console.log(res1.data.results);
                var mysessions_data = res1.data.results;
                console.log(mysessions_data);
                mysessions_data.forEach(session => {
                    local_sessions.set( "Course Name: " + session.coursename +
                        "; Start Date: " + session.start_date + "; End Date: " + session.end_date, session.id);

                })
                console.log(local_sessions);
                this.setState({ sessions: local_sessions }, () => {
                    console.log(this.state.sessions)
                });

            })

            .catch(err =>
               {//alert(err);
                console.log(err);
            });

    }
    componentDidMount()
     {

     
           
    }
   componentDidUpdate(prevState) {
       if (this.state.sessionid != prevState.sessionid) {
           //alert("not same");
           //this.fetchStudents();
       }
    }
    setCourseSession(sid) {
        this.setState({ sessionid: sid }, () => {
            console.log(this.state.sessionid);
            //this.fetchStudents();
        });
        
        
    }
     

    render() {
      
        return (
           
            <div>

                <StudentsFilter sessions={this.state.sessions}
                        setCourseSession={this.setCourseSession}  />
                <StudentsTable sessionid={this.state.sessionid} />;
            </div>
       

        );
    }
}

export default withRouter(StudentsPage);
