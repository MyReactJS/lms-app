import React from 'react';
import { Route, BrowserRouter } from "react-router-dom";
import './AppGuest.css';
import Login from './components/Login.js';
import Registration from "./components/Registration";
import AppUser from "./AppUser.js";
//import { getUserAuthenticationStatus } from "./components/Common.js";



//import Header from './components/common/Header.js';
import 'bootstrap/dist/css/bootstrap.css';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isAuthenticated: false }
        this.setUserAuthenticationStatus = this.setUserAuthenticationStatus.bind(this);
    }
    setUserAuthenticationStatus(value) {
        this.setState({ isAuthenticated: value });
    }
    render() {

       // var isAuthenticated = getUserAuthenticationStatus();
        return (
            <div className="container">
                <h1 className='App-header title'>Learning Management System </h1>                
                
                <div className='App-body'>
                    <BrowserRouter>
                        <switch>
                            <Route path="/" exact component={() => <Login setUserAuthenticationStatus={this.setUserAuthenticationStatus}/>} />                    
                            <Route path="/registration" exact component={() => <Registration setUserAuthenticationStatus={this.setUserAuthenticationStatus}/>} />                           
                           
                        </switch>
                    </BrowserRouter>
                </div>
            </div>
               
           
        );
    }
}


export default App;
