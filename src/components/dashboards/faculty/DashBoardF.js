import React from 'react';
import ProfileF from './ProfileF.js';
import AssignedCourseTable from './AssignedCourseTable.js';
import { getUser } from './../../Common.js';
import axios from "axios";
class DashBoardF extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tot_classes: 0,
            mycourses:[]
        }
     
    }
  
    getData = () =>{
        const profile = getUser();
      
        axios.get('/api/core/mysessions/',
            {
             
                auth: {
                    username: profile.email,
                    password: profile.password
                }
            }
        )
            .then(res1 => {
             
                const mysessions_data = res1.data.results
                this.setState({ mycourses: mysessions_data }, () => {
                    console.log(this.state.mycourses)
                    var totclasses = this.state.mycourses.length;
                   
                    this.setState({ tot_classes: totclasses }, () => {
                        console.log(this.state.tot_classes)
                    });
                });




            })
            .catch(err => {
                console.log(err);
            });
    }
    componentDidMount() {
        this.getData();
    }
    render() {
        return (
            <div>
                <ProfileF tot_classes={this.state.tot_classes} />
                <AssignedCourseTable assignedCourses={this.state.mycourses} history={this.props.history} />
            </div>
        );
    }
}



export default DashBoardF;