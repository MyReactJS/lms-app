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
		}
        this.setCourseSession = this.setCourseSession.bind(this);
        this.fetchStudents = this.fetchStudents.bind(this);
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
               {alert(err);
                console.log(err);
            });

    }
    setCourseSession(sid) {
        this.setState({ sessionid: sid }, () => { console.log(this.state.sessionid) });
    }
    async fetchStudents(){
    
        var students = []
        if (this.state.sessionid == null)
            this.students = [];
        const profile = getUser();
        var password = profile.password;
    
       
        await axios.get('/api/core/enrolledsessions/',
            {
                params: {
                    sessionid: this.state.sessionid,
                },
                auth: {
                    username: profile.email,
                    password: password
                }
            }
        )
            .then(res1 => {
                
                console.log(res1.data.results);
                var enrolledsession_data = res1.data.results;
                enrolledsession_data.forEach(session =>
                {
                    var studentid = session.studentid;
                    axios.get('/api/core/students/' + studentid +'/',
                        {
                            
                            auth: {
                                username: profile.email,
                                password: password
                            }
                        }
                    )
                        .then(res2 => {
                            const student = res2.data;
                            //console.log(student);
                            students.push(student);

                        })
                })
              

            }).
            then( ()=>
                {
                console.log(students);
                console.log("completed");
                
                this.students = students;
                return students;
			})

            .catch(err => {
                alert(err);
                console.log(err);
            });
        
	}

    render() {
        var st = [];
        if (this.state.sessionid!=null)
             st=this.fetchStudents();
        console.log("inside rendering");
        console.log(st);
        var rows = [];
       
        return (
           
            <div>

                <StudentsFilter sessions={this.state.sessions}
                        setCourseSession={this.setCourseSession}  />
                <StudentsTable rows={rows} />;
            </div>
       

        );
    }
}

export default withRouter(StudentsPage);
