import React from 'react';
import './Registration.css'
import { FormErrors } from './FormErrors';
import axios from 'axios';
class Registration extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            address: '',
            city: '',
            pincode: '',
            phone: '',
            role: 'customer',
            skills: [],

            formErrors: { email: '', password: '', phonevalid: '' },
            emailValid: false,
            passwordValid: false,
            phonevalid: false,
            formValid: false,
        }
    }
    handleChange = (e) => {
        this.setState({
            role: e.target.value
        })
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
        var apiBaseUrl = "http://localhost:8000/api/authentication/";
        var self = this;
        var payload = {
            "name": this.state.name,
            "email": this.state.email,
            "password": this.state.password,
            "phone": this.state.phone,
            "address": this.state.address,
            "city": this.state.city,
            "role": this.state.role,
            "pincode": this.state.pincode,
        }

        axios.post(apiBaseUrl + 'registration', payload)
            .then(function (response) {
                console.log(response);
                if (response.status === 201) {
                    alert("Registration successfull.Login Again");
                    console.log("Registration successfull");
                    self.props.history.push('/');
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

        e.preventDefault();

    }

    render() {
             return (
                 <div id="content">
                     <div className="container-fluid decor_bg" >
                         <div className="row">
                             <div className="col-md-10">
                                 <div className="panel panel-primary">
                                     <div className="panel-heading"><h4>SIGN UP</h4></div>
                                     <div className="panel-body">
                                         <form  onSubmit={this.handleSubmit}>

                                             <div className="form-group">
                                                 <input type="radio" value="admin"
                                                     checked={this.state.role === "admin"}
                                                     onChange={this.handleChange} />
                                                 <label htmlFor="Admin">Admin</label>
                                                 <input type="radio" value="faculty" checked={this.state.role === "faculty"}
                                                     onChange={this.handleChange} />
                                                 <label htmlFor="Faculty">Faculty</label>
                                                 <input type="radio" value="student" checked={this.state.role === "student"}
                                                     onChange={this.handleChange} />
                                                 <label htmlFor="Student">Student</label>
                                                 <input type="radio" value="parent" checked={this.state.role === "parent"}
                                                     onChange={this.handleChange} />
                                                 <label htmlFor="Parent">Parent</label>
                                             </div>
                                             <div className="form-group">
                                                 <input
                                                     type="text" className="form-control" placeholder="Enter your name *" name="name"
                                                     value={this.state.name} onChange={this.handleUserInput} required />
                                             </div>
                                             <div className="form-group">
                                                 <input type="text" className="form-control" placeholder="Enter email *" name="email" value={this.state.email}
                                                     onChange={this.handleUserInput} required />
                                             </div>
                                             <div className="form-group">
                                                 <input type="password" className="form-control" placeholder="Enter Password *" name="password" value={this.state.password}
                                                     onChange={this.handleUserInput} required />
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
                                             <button type='submit' value='Submit' class="btn btn-primary btn-lg col-md-4" disabled={!this.state.formValid}> Submit </button>
                                             <button type='cancel' value='Cancel' class="btn  btn-secondary btn-lg col-md-offset-2 col-md-4"> Cancel </button>

                            <div className='error-message' >
                                <FormErrors formErrors={this.state.formErrors} />
                            </div>
                       
                    </form>
                                </div></div></div></div></div> </div>
            );
        
        
    }
}


export default Registration;
