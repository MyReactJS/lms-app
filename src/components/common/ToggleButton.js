import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import ModalComponent from './ModalComponent.js';
import axios from "axios";
import { getUser } from './../Common.js';

class ToggleButton extends React.Component {
    constructor(props) {
        super(props);
       
        this.state = {
         
            modalshow: false,
            modaltitle: '',
            modalbody: '',
     
            remainingseats: this.props.remainingseats,
           enrolled: this.props.enrolled,
            
            
        };
      

        this.handleClick = this.handleClick.bind(this);
      
    }
    handleConfirmModalClose = (fromModal) => {
       

        this.setState({
            modalshow: false
        });
    };
  
    handleClick(event) {
       
        //alert(event.target.value);
        let updatesuccess = false;
        const profile = getUser();
        var userid = profile.id;
        var password = profile.password;
        var remseats = this.state.remainingseats;
        var sessionid = this.props.sessionid;
        var apiBaseUrl = "http://127.0.0.1:8000/api/core/";
        var self = this;
       
        if (!this.state.enrolled) {
            
            //********enroll********
            
           // alert("Perform Enroll");

            var payload = {
                "enrolled_by": userid,
                "course": sessionid            
               
            }
            
            
            
            axios.post(apiBaseUrl + 'enrolledsessions/', payload,
                {
                    // Axios looks for the `auth` option, and, if it is set, formats a
                    // basic auth header for you automatically.
                    auth: {
                        username: profile.email,
                        password: password
                    }
                }
                )
                .then(function (response) {
                    //console.log(response);
                    if (response.status === 201) {
                        //alert("Registration successfull.Login Again");
                        //console.log("Enrollment successfull");
                        updatesuccess = true;
                        ///////
                        remseats = remseats - 1;
                        //console.log("remseats -enroll: " + remseats);
                        var payload_update = {
                            "rem_seats": remseats

                        }
                        axios.put(apiBaseUrl + 'sessions/' + sessionid +'/', payload_update,
                            {
                            
                                auth: {
                                    username: profile.email,
                                    password: password
                                }
                            }
                        )
                            .then(function (response) {
                          
                            if (response.status === 200) {
                                console.log(response.data);
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
                console.log(this.state.remainingseats);
                this.setState({ remainingseats: this.state.remainingseats - 1 }, () => {
                    this.props.setRemainingSeats(this.state.remainingseats )
                });
                
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

            //console.log(payload);

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
                        password: password
                    }
                }
            )
                .then(res1 => {
                    //console.log(res1.data);
                    const enrolled_data = res1.data.results[0];
                    //console.log(enrolled_data);
                    const enrolledid = enrolled_data.id;
                    

                    axios.delete("/api/core/myenrolledsessions/" + enrolledid + "/",
                        {
            
                            auth: {
                                username: profile.email,
                                password: password
                            }
                        })
                        .then(function (response) {
                            //console.log(response);
                            if (response.status === 204) {
                                //alert("Registration successfull.Login Again");
                                console.log("un-Enrollment successfull");
                                updatesuccess = true;
                                remseats = remseats + 1;
                                //console.log("remseats -uneroll: " + remseats);
                                var payload_update = {
                                    "rem_seats": remseats

                                }
                                axios.put(apiBaseUrl + 'sessions/' + sessionid + '/', payload_update,
                                    {
                                        // Axios looks for the `auth` option, and, if it is set, formats a
                                        // basic auth header for you automatically.
                                        auth: {
                                            username: profile.email,
                                            password: password
                                        }
                                    }
                                )
                                    .then(function (response) {
                                        //console.log(response);
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
                this.setState({ remainingseats: this.state.remainingseats + 1 }, () => {
                    this.props.setRemainingSeats(this.state.remainingseats)
                });
                this.setState({
                    modalshow: true,
                    modaltitle: 'Enrollment',
                    modalbody: 'Un-Enrolled',

                });
            }
            event.preventDefault();
            event.stopPropagation();
            
        }
        this.setState(function (state) {
            return {
                enrolled: !state.enrolled
            }
        }, () => {
                console.log(this.state.enrolled);
        });
        event.stopPropagation();
        event.preventDefault();
    }
    
   
   

    render() {
        let button = null;
        if (this.state.enrolled && this.props.disabled)            
                button = <div> <button type="button" onClick={this.handleClick} className="btn btn-secondary btn-block" disabled>
                    Enrolled</button> </div>
        else if (this.props.disabled)
        
            
            button = <div> <button type="button" onClick={this.handleClick} className="btn btn-secondary btn-block" disabled>
                Enroll</button> </div>
       
        else {
            button = <div> <button type="button" onClick={this.handleClick} className={!this.state.enrolled ? "btn btn-primary btn-block" : "btn btn-success btn-block"} >
                {!this.state.enrolled ? "Enroll" : "UnEnroll"}</button>
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