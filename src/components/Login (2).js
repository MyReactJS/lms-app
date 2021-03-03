import React from 'react';
import { withRouter } from 'react-router-dom';
import { setUserSession } from './Common';
import './Login.css';
import { FormErrors } from './FormErrors';
import axios from 'axios';
import { setUserAuthenticationStatus } from './Common';

import { getUserAuthenticationStatus } from "./Common.js";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            email: '',
            password: '',
            UserType: 'student',
            RegisterUserType: 'student',
            formErrors: { email: '', password: '' },
            emailValid: false,
            passwordValid: false,
            formValid: false,
        }
    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value },
            () => { this.validateField(name, value) });
    }

    onValueChange = (e) => {
        this.setState({
            UserType: e.target.value
        })
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;

        switch (fieldName) {
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,3})$/i);
                fieldValidationErrors.email = emailValid ? '' : ' is invalid';
                break;
            case 'password':
                passwordValid = value.length >= 6;
                fieldValidationErrors.password = passwordValid ? '' : ' is too short';
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            emailValid: emailValid,
            passwordValid: passwordValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({ formValid: this.state.emailValid && this.state.passwordValid });
    }

    errorClass(error) {
        return (error.length === 0 ? '' : 'has-error');
    }

    handleClick = (e) => {
        this.props.history.push('/registration');
        e.preventDefault();
    }
    handleSubmit = (e) => {
        var apiBaseUrl = "http://localhost:8000/api/authentication/";
        var self = this;
        var payload = {
            "email": this.state.email,
            "password": this.state.password,
            "role": this.state.UserType
        }

        axios.post(apiBaseUrl + 'login', payload)
            .then(function (response) {

                self.setState({ users: response.data });
                setUserSession(response.data[0].id, response.data[0].name, this.state.password,null,
                    response.data[0].type, response.data[0].address,
                    response.data[0].email, response.data[0].phonenum);
                
                if (response.status === 200) {
                    console.log("Login successfull");

                    if (payload.role === "student") {
                        self.props.history.push('/dashboardS');
                    }
                    else if (payload.role === "faculty") {
                            self.props.history.push('/dashboardF');
                        }
                       
                }
                else if (response.data.code === 204) {
                    console.log("emailid and pwd  do not match");
                    alert("emailid and pwd  do not match")
                }
                else {
                    console.log("User does not exists");
                    alert("User does not exist");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        setUserAuthenticationStatus(true);
        setUserSession(12, "Rajeswari Subramanian", payload.role, "Chennai",
            payload.email, "1234567890");
        alert("After Login:" + getUserAuthenticationStatus());
        this.props.history.push('/dashboard');  
        e.preventDefault();

    }

    render() {
        return (
            <div className="loginContainer">
                <div className="login-menu">
                    <form className="demoForm" onSubmit={this.handleSubmit}>
                        <div >

                           
                            <input type="radio" value="faculty" checked={this.state.UserType === "faculty"}
                                onChange={this.onValueChange} />
                            <label htmlFor="Faculty">Faculty</label>

                            <input type="radio" value="student"
                                checked={this.state.UserType === "student"}
                                onChange={this.onValueChange} />
                            <label htmlFor="Student">Student</label>



                           
                        </div>


                        <div >
                            <input type="email" required name="email"
                                placeholder="Email"
                                value={this.state.email}
                                onChange={this.handleUserInput} />
                        </div>

                        <div >
                            <input type="password" name="password"
                                placeholder="Password"
                                value={this.state.password}
                                onChange={this.handleUserInput} />
                        </div>

                       
                        <input type='submit' value='Login' disabled={!this.state.formValid} />


                        <div className='error-message' >
                            <FormErrors formErrors={this.state.formErrors} />
                        </div>

                    </form>
                </div>

                <div className="register-menu">
                    <form className="demoForm" onSubmit={this.handleClick}>
                        <label htmlFor="Registration">New User? Register Now</label>
                        <br />
                        <input type='submit' value='Register' />
                    </form>
                </div>


            </div>
        )
    }

}
export default withRouter(Login);
