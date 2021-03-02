import React from 'react';

import { FormErrors } from './FormErrors';
import { withRouter } from "react-router-dom";
import { setUserSession } from './Common.js';
import DatePicker from "react-datepicker";
import axios from "axios";

//import { setUserAuthenticationStatus } from './Common.js';
import Container from 'react-bootstrap/Container'
//import { getUserAuthenticationStatus } from "./Common.js";
import './Registration.css';
class Registration extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            dob:'',
            email: '',
            password: '',
            address: '',
            city: '',
            pin: '',
            phone: '',
            role: 'student',
            

            formErrors: { email: '', password: '', phonevalid: '' },
            emailValid: false,
            passwordValid: false,
            phonevalid: false,
            formValid: false,
        }
        this.handleDOBChange = this.handleDOBChange.bind(this);
        this.handleSignClick = this.handleSignClick.bind(this);
        this.GetFormattedDate = this.handleSignClick.bind(this);
    }
    GetFormattedDate(date)
    {
        alert(date);
        console.log(date);
        var dd = String(date.getDate()).padStart(2, '0');
        var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = date.getFullYear();

        date = yyyy + '-' + mm + '-' + dd;
        alert(date);
        console.log(date);
        return date;
    }
    handleChange = (e) => {
        this.setState({
            role: e.target.value
        })
    }
    handleSignClick(e) {
        this.props.history.push('/login');
        //e.preventDefault();
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;
        let phonevalid = this.state.phonevalid;
        switch (fieldName) {
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,3})$/i);
                fieldValidationErrors.email = emailValid ? '' : ' is invalid';
                break;
            case 'password':
                passwordValid = value.length >= 6;
                fieldValidationErrors.password = passwordValid ? '' : ' is too short';
                break;
            case 'phone':
                phonevalid = value.match(/^[0-9]{10}$/i);
                fieldValidationErrors.phone = phonevalid ? '' : 'is not valid';
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            emailValid: emailValid,
            passwordValid: passwordValid,
            phonevalid: phonevalid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({ formValid: this.state.emailValid && this.state.passwordValid && this.state.phonevalid });
    }

    errorClass(error) {
        return (error.length === 0 ? '' : 'has-error');
    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value },
            () => { this.validateField(name, value) });
    }

    handleSubmit = (e) => {
        var apiBaseUrl = "http://127.0.0.1:8000/api/authentication/";
        var self = this;
        
        var user = {
            "name": this.state.name,
            "dob": this.GetFormattedDate(this.state.dob),
            "email": this.state.email,
            "password": this.state.password,
            "phone": this.state.phone,
            "address": this.state.address,
            "city": this.state.city,
            "role": this.state.role.toLowerCase(),
            "pin": this.state.pincode,
        }
        var addr = this.state.address + ' ' + this.state.city + ' ' + this.state.pin;
        console.log(user);   
        setUserSession(1, this.state.name,this.state.dob, this.state.role, addr, this.state.email, this.state.phone);
       
        axios.post(apiBaseUrl + 'registration/', user)
            .then(function (response) {
                console.log(response);
                if (response.status === 201) {
                    //alert("Registration successfull.Login Again");
                    console.log("Registration successfull");
                    if (self.state.role == 'student')

                        self.props.history.push('/dashboardS');
                    else
                        self.props.history.push('/dashboardF');
                    e.preventDefault();
                    e.stopPropagation();
                }
                else if (response.data.code === 204) {
                    console.log("invalid data");
                    alert("invalid data")
                }
                else {
                    console.log("User  exists");
                    alert("User  exist");
                }

            })
            .catch(function (error) {
                console.log("")
                console.log(error);
            });
        

               
       

    }
    handleDOBChange(dob) {
        
        this.setState({ dob: dob });
    }
    render() {
        return (
               
                 
            <Container fluid>
                <div className=" decor_bg" >
                         <div className="row">
                             <div className="container-fluid col-md-6">
                                 <div className="panel panel-primary">
                                     <div className="panel-heading"><h4>SIGN UP</h4></div>
                                     <div className="panel-body">
                                         <form  onSubmit={this.handleSubmit}>
                                        
                                             <div className="form-group">
                                                 
                                                 <input type="radio" value="faculty" checked={this.state.role === "faculty"}
                                                     onChange={this.handleChange} />
                                                 <label htmlFor="Faculty">Faculty</label>

                                                 <input type="radio" value="student" checked={this.state.role === "student"}
                                                     onChange={this.handleChange} />
                                                 <label htmlFor="Student">Student</label>
                                                
                                        </div>
                                        
                                             <div className="form-group">
                                            
                                            <input
                                                     type="text" className="form-control" placeholder="Enter your name *" name="name" id="name"
                                                value={this.state.name} onChange={this.handleUserInput} required />
                                            
                                        </div>
                                        <div className="form-group">
                                            <DatePicker required className="d-flex justify-content-center" placeholderText="Enter Date of Birth *" selected={this.state.dob} onChange={this.handleDOBChange} name="dob" dateFormat="MM/dd/yyyy" />
                                        </div>
                                             <div className="form-group">
                                           
                                            <input type="text" className="form-control" placeholder="Enter email *" id='email' name="email" value={this.state.email}
                                                onChange={this.handleUserInput} required />
                                            
                                             </div>
                                             <div className="form-group">
                                                 <input type="password" className="form-control" placeholder="Enter Password *" name="password" value={this.state.password}
                                                onChange={this.handleUserInput} required
                                                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" />
                                             </div>
                                             <div className="form-group">
                                                 <input type="text" className="form-control" placeholder="Enter Address" name="address" value={this.state.address}
                                                     onChange={this.handleUserInput} />
                                             </div>
                                             <div className="form-group">
                                                 <input type="text" className="form-control" placeholder="Enter City *" name="city" value={this.state.city}
                                                     onChange={this.handleUserInput} required />
                                             </div>
                                             <div className="form-group">
                                                 <input type="text" className="form-control" placeholder="Enter Pincode *" name="pincode" value={this.state.pincode}
                                                     onChange={this.handleUserInput} required />
                                             </div>
                                             <div className="form-group">
                                                 <input type="text" className="form-control" placeholder="Enter Phonenumber * " name="phone" value={this.state.phone}
                                                     onChange={this.handleUserInput} required />
                                            </div>
                                            
                                        <div className="form-group">
                                                
                                                    <button type='submit' value='Submit' class="btn btn-class btn-primary btn-lg col-md-4" disabled={!this.state.formValid}> Submit </button>
                                            <button type='cancel' value='Cancel' class="btn  btn-class-sec btn-secondary btn-lg col-md-offset-2 col-md-4"> Cancel </button>
                                                   
                                        </div>
                                    
                                          
                                       
                                            <div className='error-message' >
                                               <FormErrors formErrors={this.state.formErrors} />
                                            </div>
                                       
                       
                                    </form>

                                    <label className='label-style'>Regiestered User?  <a href='#' onClick={this.handleSignClick}>Sign in </a> </label>


                            </div></div></div></div></div>
            </Container>

            );
        
        
    }
}



export default (withRouter(Registration));
