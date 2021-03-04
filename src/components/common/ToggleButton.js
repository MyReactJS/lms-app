import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import ModalComponent from './ModalComponent.js';
import axios from "axios";
import { getUser } from './../Common.js';

class ToggleButton extends React.Component {
    constructor(props) {
        super(props);
       
        this.state = {
            isUnEnrolled: true,
            modalshow: false,
            modaltitle: '',
            modalbody: '',
            remainingseats: this.props.remainingseats,
            currentLabel:'',
        };
      

        this.handleClick = this.handleClick.bind(this);
      
    }
    handleConfirmModalClose = (fromModal) => {
        //alert(fromModal.msg);

        this.setState({
            modalshow: false
        });
    };
    enrollCourse() {

    }
    
    handleClick(event) {
        console.log("before:" + this.state.remainingseats);
        //alert(event.target.value);
        let updatesuccess = false;
        const profile = getUser();
        var userid = profile.id;
        var password = profile.password;
        var remseats = this.state.remainingseats;
        var sessionid = this.props.sessionid;
        var apiBaseUrl = "http://127.0.0.1:8000/api/core/";
        var self = this;
        //alert(profile.email);
        //alert(profile.password);
        if (this.state.isUnEnrolled) {
            
            //********enroll********
            
           // alert("Perform Enroll");

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
                        password: password
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
                                    password: password
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
                this.setState({ remainingseats: this.state.remainingseats - 1 }, () =>  {
                    this.props.setRemainingSeats(this.state.remainingseats)
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
            
            //alert("perform UnEnroll");
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
                        password: password
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
                                password: password
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
                                            password: password
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
            isUnEnrolled: !state.isUnEnrolled

        }));
        console.log("After:" + this.props.remainingseats);
        event.stopPropagation();
        event.preventDefault();
    }
    componentDidMount()
    {
        if (this.props.enrolled && this.props.disabled) //enrolled & course is inprogress or completed- label=enrolled; disabled=true
        {
            this.setState({ isUnEnrolled:false,currentLabel: 'Enrolled' });
           
        }
        else if (this.props.disabled)
            this.setState({ isUnEnrolled:true,currentLabel:'Enroll' }); //not enrolled & course is inprogress or completed -label=enroll; disabled=true
        else if (this.props.enrolled) 
            this.setState({ isUnEnrolled:false,currentLabel:"UnEnroll" }); //enrolled & course not started; label - en-enroll; disabled=false; can be un-enrolled

    }
    render() {
        let button = null;
        if (this.props.enrolled && this.props.disabled)            
                button = <div> <button type="button" onClick={this.handleClick} className="btn btn-secondary btn-block" disabled>
                    {this.state.currentLabel}</button> </div>
        else if (this.props.disabled)
        
            
            button = <div> <button type="button" onClick={this.handleClick} className="btn btn-secondary btn-block" disabled>
                {this.state.currentLabel}</button> </div>
        
        //else if (this.props.enrolled) 

        //    button = <div> <button type="button" onClick={this.handleClick} className="btn btn-success btn-block" >
        //        {this.state.isUnEnrolled ? "Enroll" : "UnEnroll"}</button>
        //        <ModalComponent
        //            show={this.state.modalshow}
        //            title={this.state.modaltitle}
        //            body={this.state.modalbody}

        //            onClick={this.handleConfirmModalClose}
        //            onHide={this.handleConfirmModalClose} />
        //    </div>
        
        else {
            button = <div> <button type="button" onClick={this.handleClick} className={this.state.isUnEnrolled ? "btn btn-primary btn-block" : "btn btn-success btn-block"} >
                {this.state.isUnEnrolled ? "Enroll" : "UnEnroll"}</button>
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