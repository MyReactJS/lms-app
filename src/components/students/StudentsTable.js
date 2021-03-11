import React from 'react';
import StudentRow from './StudentRow.js';
import axios from "axios";
import { getUser } from './../Common.js';
class StudentTable extends React.Component {
    constructor(props) {
        super(props);
        this.fetchStudents = this.fetchStudents.bind(this);
        this.state = {
            
            //sessionid:this.props.sessionid,
            students: [],
        }
    }
    fetchStudents() {

        //alert("fetch students");
        console.log("fetch students");
                 var students = []
        if (this.state.sessionid == null)
            return
        const profile = getUser();
        var password = profile.password;

        //alert("fetch students:" + this.state.sessionid);
        axios.get('/api/core/enrolledsessions/',
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
                enrolledsession_data.forEach(session => {
                    var studentid = session.studentid;
                    axios.get('/api/core/students/' + studentid + '/',
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

                        }).
                        then(() => {
                            console.log(students);
                            console.log("completed");

                            this.students = students;
                            this.setState({
                                students: students
                            }, () => console.log(this.state.students));

                        })
                })


            })

            .catch(err => {
                //alert(err);
                console.log(err);
            });

    }

    componentDidMount() {
       // alert("componentDidMount");
        //alert(this.props.sessionid);
        this.fetchStudents();
    }
    componentDidUpdate(prevProps) {
        if (this.props.sessionid != prevProps.sessionid) {
            this.setState({ sessionid: this.props.sessionid }, () => {
                //alert("componentDidUpdate:" + this.state.sessionid);
                this.fetchStudents();
            }
            );
        }
    }
    //shouldComponentUpdate(nextProps) {
      //  if (this.props.sessionid != nextProps.sessionid) {
      //      return true;
     //   }
     //   return false;
  //  }
    render() {
        var rows = [];

       
        //console.log("inside rendering");
        //console.log(this.state.students);
        
        this.state.students.forEach((student) => {
            console.log(student);
            rows.push(<StudentRow student={student} />);
        });
        console.log(rows);
        let recCount = rows.length;
        return (

            <div className="row">
                <div className="container-fluid decor_bg" >
                    <div className="panel panel-primary">
                        <div className="container-fluid panel-heading"><h4>Enrolled Students</h4></div>
                        <div className="panel-body">
                            {
                                recCount == 0 ?
                                    <h2 className='noCourse'> No Students </h2> :
                                    <table className="table table-bordered table-hover">
                                        <thead >
                                            <tr className="bg-primary">

                                                <th scope="col">Student Id</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Email</th>
                                                <th scope="col">Phone</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {rows}                                        </tbody></table>
                            }
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}
export default StudentTable;