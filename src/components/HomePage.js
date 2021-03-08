import React from 'react';
import { withRouter } from 'react-router-dom';
import { setUserSession } from './Common';

import { FormErrors } from './FormErrors';
import axios from 'axios';
import { setUserAuthenticationStatus } from './Common';
import ModalComponent from './common/ModalComponent.js';
import { getUserAuthenticationStatus } from "./Common.js";
import Button from 'react-bootstrap/Button';

import './HomePage.css';
class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            email: '',
            password: '',
            UserType: 'student',
            formErrors: { credentials: '', email: '', password: '' },
            credentialsValid: true,
            emailValid: false,
            passwordValid: false,
            formValid: false,
            modalshow: false,
            modaltitle: '',
            modalbody: ''
        }
    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value });
   
    }

    onValueChange = (e) => {
        this.setState({
            UserType: e.target.value
        })
    }

    
    errorClass(error) {
        return (error.length === 0 ? '' : 'has-error');
    }

    handleClick = (e) => {
        this.props.history.push('/registration');
        e.preventDefault();
    }
    handleSubmit = (e) => {

        //clean api
        let self = this;
        let fieldValidationErrors = this.state.formErrors;
        fieldValidationErrors.credentials = '';
        this.setState({
            formErrors: fieldValidationErrors,
            credentialsValid: true
        },() => {
                console.log(this.state.credentialsValid);
                this.validateField();
               
                
            });
           
        if (this.state.formValid == true)
        {
            var apiBaseUrl = "http://localhost:8000/api/authentication/";
            let loginstatus = false;
            var payload = {
                "email": this.state.email,
                "password": this.state.password,
                "role": this.state.UserType
            }

            var pwd = this.state.password;
            console.log("login submit");
            console.log(payload);
            axios.post(apiBaseUrl + 'login/',
                payload
            )
                .then(function (response) {
                    if (response.status === 200) {
                        console.log("Login successfull");

                        console.log("pwd:" + pwd);
                        console.log(response);
                        console.log(response.data[0]);
                        setUserSession(response.data[0].id, response.data[0].name, pwd, response.data[0].dob, payload.role,
                            response.data[0].city, response.data[0].email, response.data[0].phone);
                        console.log("status: " + response.status);
                        loginstatus = true;


                    }
                    else if (response.status == 204)
                    {
                       
                        loginstatus = false;
                 
                    }
                    else {
                        console.log(response.status);

                    }
                })
                .then(() => {
                    console.log("loginstatus:" + loginstatus);

                    if (loginstatus == false) {
                        console.log('inside login failue');
                        let fieldValidationErrors = this.state.formErrors;
                        fieldValidationErrors.credentials = ' mismatch';
                        this.setState({
                            credentialsValid: false,
                            formErrors: fieldValidationErrors
                        }, this.validateForm);
                        console.log(this.state.formErrors);

                    }
                    else {
                        console.log('inside login success');
                        this.showModel();
           
                    }



                });

            e.preventDefault();
            e.stopPropagation();
        } else {
            e.preventDefault();
            e.stopPropagation();
        }
            
        }

    showModel = () => {
        this.setState({
            modalshow: true,
            modaltitle: 'Login',
            modalbody: 'Login Successful !!!',

        })
    }
    handleConfirmModalClose = (fromModal) => {
       

        this.setState({
            modalshow: false
        });
       
        if (this.state.UserType == 'student')
            this.props.history.push('/dashboardS');
        else
            this.props.history.push('/dashboardF');
    };
    validateField() {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;
        //let credentialsValid = this.state.credentialsValid;

        emailValid = this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,3})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        passwordValid = this.state.password.length >= 6;
        fieldValidationErrors.password = passwordValid ? '' : ' is too short';
        //fieldValidationErrors.credentials = credentialsValid ? '' : 'mismatch';
        this.setState({
            formErrors: fieldValidationErrors,
            emailValid: emailValid,
            //credentialsValid: credentialsValid,
            passwordValid: passwordValid
        }, this.validateForm);

    }
    validateForm() {
        this.setState({ formValid: this.state.credentialsValid && this.state.emailValid && this.state.passwordValid }, () => { console.log(this.state.formValid) });
    }
    render() {
        return (
                            
                <div className='App-body'>
            <div className="loginContainer">
                <div className="login-menu">
                    <form className="demoForm" onSubmit={this.handleSubmit}>
                        <div >

                           
                            <input type="radio"  value="faculty" checked={this.state.UserType === "faculty"}
                                onChange={this.onValueChange} />
                            <label htmlFor="Faculty">Faculty</label>

                            <input type="radio"   value="student"
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
                            <input type="password" required name="password"
                                placeholder="Password"
                                value={this.state.password}
                                onChange={this.handleUserInput} />
                        </div>

                        <Button onClick={this.handleOnSubmit} variant="primary" className="btn-class col-md-6" type="submit">Login</Button>
                        
                       
                        
                        <div >
                            <label>   New User?  <a href='#' onClick={this.handleClick}>Register Now </a> </label>
                           
                           
                        </div>
                            {!this.state.formValid ?
                                <div className='error-message' >
                                    <FormErrors formErrors={this.state.formErrors} />
                                </div> :
                                <ModalComponent
                                    show={this.state.modalshow}
                                    title={this.state.modaltitle}
                                    body={this.state.modalbody}
                                    onClick={this.handleConfirmModalClose}
                                    onHide={this.handleConfirmModalClose} />
                            }

                    </form>
                </div>

               
                    </div>
</div>
          
        )
    }

}
export default withRouter(HomePage);
