import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import ModalComponent from './ModalComponent.js';
import axios from "axios";
import { getUser } from './../Common.js';
//ReactDOM.render(<ToggleButton />, document.getElementById('root'));
//
//
import CourseEnrollConfirmModel from './../coursepage/CourseEnrollConfirmModel.js';
class ToggleButton extends React.Component {
    constructor(props) {
        super(props);
       // console.log("inside toggleOnLabel:" + this.props.toggleOnLabel);
        this.state = {
            isToggleOn: true,
            modalshow: false,
            modaltitle: '',
            modalbody: '',
            ToggleOnLabel: this.props.toggleOnLabel,
            ToggleOffLabel: this.props.toggleOffLabel
        };
      

        this.handleClick = this.handleClick.bind(this);
      
    }
    handleConfirmModalClose = (fromModal) => {
        //alert(fromModal.msg);

        this.setState({
            modalshow: false
        });
    };
    handleClick(event) {
        console.log("before:" + this.props.remainingseats);
        //alert(event.target.value);
        var updatesuccess = false;
        const profile = getUser();
        var userid = profile.id;
        var remseats = this.props.remainingseats;
        var sessionid = this.props.sessionid;
        var apiBaseUrl = "http://127.0.0.1:8000/api/core/";
        var self = this;
        if (this.state.isToggleOn) {
            
            //********enroll********
            
         

            var payload = {
                "enrolled_by": userid,
                "course": sessionid            
               
            }
            
            console.log(payload);
            
            axios.post(apiBaseUrl + 'enrolledsessions/', payload,
                {
                    // Axios looks for the `auth` option, and, if it is set, formats a
                    // basic auth header for you automatically.
                    auth: {
                        username: profile.email,
                        password: 'student123#'
                    }
                }
                )
                .then(function (response) {
                    console.log(response);
                    if (response.status === 201) {
                        //alert("Registration successfull.Login Again");
                        console.log("Enrollment successfull");
                        updatesuccess = true;
                        ///////
                        remseats = remseats - 1;
                        console.log("remseats -enroll: " + remseats);
                        var payload_update = {
                            "rem_seats": remseats

                        }
                        axios.put(apiBaseUrl + 'sessions/' + sessionid +'/', payload_update,
                            {
                                // Axios looks for the `auth` option, and, if it is set, formats a
                                // basic auth header for you automatically.
                                auth: {
                                    username: profile.email,
                                    password: 'student123#'
                                }
                            }
                        )
                            .then(function (response) {
                            console.log(response);
                            if (response.status === 200) {
                                //alert("Registration successfull.Login Again");
                                console.log("session details updated");
                                updatesuccess = true;

                            }
                           


                        })
                    }
                    
                   

                })
                .catch(function (error) {
                    console.log("")
                    console.log(error);
                });
            if (updatesuccess = true) {
                this.props.setRemainingSeats(this.props.remainingseats - 1);
                this.setState({
                    modalshow: true,
                    modaltitle: 'Enrollment',
                    modalbody: 'Enrolled',
                });
            }
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            //********un-enroll********
            
           
            var payload = {
                "enrolled_by": userid,
                "course": sessionid

            }

            console.log(payload);

            axios.get(apiBaseUrl + 'enrolledsessions/' , 
                {
                    // Axios looks for the `auth` option, and, if it is set, formats a
                    // basic auth header for you automatically.
                    params: {
                        sessionid: this.props.sessionid,
                        enrolledby: userid,
                    },
                    auth: {
                        username: profile.email,
                        password: 'student123#'
                    }
                }
            )
                .then(res1 => {
                    //console.log(res2.data);
                    const enrolled_data = res1.data.results[0];
                    const enrolledid = enrolled_data.id;
                    

                    axios.delete("/api/core/myenrolledsessions/" + enrolledid + "/",
                        {
                            // Axios looks for the `auth` option, and, if it is set, formats a
                            // basic auth header for you automatically.
                            auth: {
                                username: profile.email,
                                password: 'student123#'
                            }
                        })
                        .then(function (response) {
                            console.log(response);
                            if (response.status === 204) {
                                //alert("Registration successfull.Login Again");
                                console.log("un-Enrollment successfull");
                                updatesuccess = true;
                                remseats = remseats + 1;
                                console.log("remseats -uneroll: " + remseats);
                                var payload_update = {
                                    "rem_seats": remseats

                                }
                                axios.put(apiBaseUrl + 'sessions/' + sessionid + '/', payload_update,
                                    {
                                        // Axios looks for the `auth` option, and, if it is set, formats a
                                        // basic auth header for you automatically.
                                        auth: {
                                            username: profile.email,
                                            password: 'student123#'
                                        }
                                    }
                                )
                                    .then(function (response) {
                                        console.log(response);
                                        if (response.status === 201) {
                                            //alert("Registration successfull.Login Again");
                                            console.log("session details updated");
                                            updatesuccess = true;

                                        }
                                        else if (response.data.code === 204) {
                                            console.log("invalid data");
                                            alert("invalid data")
                                        }


                                    })
                            }
                            

                        })

                })
                .catch(function (error) {
                    console.log("")
                    console.log(error);
                });
            
            if (updatesuccess = true) {
                this.props.setRemainingSeats(this.props.remainingseats + 1);
                this.setState({
                    modalshow: true,
                    modaltitle: 'Enrollment',
                    modalbody: 'Un-Enrolled',

                });
            }
            event.preventDefault();
            event.stopPropagation();
            
        }
        this.setState(state => ({
            isToggleOn: !state.isToggleOn

        }));
        console.log("After:" + this.props.remainingseats);
        event.stopPropagation();
        event.preventDefault();
    }
    
    render() {
        let button = null;
        //console.log("inside render: " + this.state.ToggleOnLabel);
        if (this.props.enrolled)

            
                button = <div> <button type="button" onClick={this.handleClick} className="btn btn-secondary btn-block" disabled={this.props.disabled}>
                    Enrolled</button>
            </div>
        else if (this.props.disabled) {

            
            button = <div> <button type="button" onClick={this.handleClick} className="btn btn-secondary btn-block" disabled={this.props.disabled}>
                    Enroll</button>
            </div>
        }
        else {
            button = <div> <button type="button" onClick={this.handleClick} className={this.state.isToggleOn ? "btn btn-primary btn-block" : "btn btn-success btn-block"} disabled={this.props.disabled}>
                {this.state.isToggleOn ? this.state.ToggleOnLabel : this.state.ToggleOffLabel}</button>
            <ModalComponent
                show={this.state.modalshow}
                title={this.state.modaltitle}
                body={this.state.modalbody}

                onClick={this.handleConfirmModalClose}
                   onHide={this.handleConfirmModalClose} />
               </div>
        }

        return (
            
              
            button

            
        );
    }
}
export default ToggleButton;