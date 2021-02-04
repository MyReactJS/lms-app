import React from 'react';
import { Route, BrowserRouter } from "react-router-dom";
import './App.css';
import Login from './components/Login.js';
import Registration from "./components/Registration";

//import { getUserAuthenticationStatus } from "./components/Common.js";

import DashBoardS from './components/dashboards/students/DashBoardS.js';
import FilterCourseTable from './components/coursepage/FilterCourseTable.js';
import CourseEnrollConfirmModel from './components/coursepage/CourseEnrollConfirmModel.js';
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
        var isAuthenticated = this.state.isAuthenticated
        console.log("authenticate: " + this.state.isAuthenticated);
        return (
            <div className="container">
                <h1 className='App-header title'>Learning Management System </h1>                
                <nav className="site-nav">
                    <ul className="mainnav" >
                        <li ><a href="/">Home</a></li>
                        <li ><a href="/dashboardS">DashBoard</a></li>
                        <li ><a href="/course">Courses</a></li>
                        <li ><a href="/aboutus">About Us</a></li>
                        <li ><a href="/logout">Log Out</a></li>
                    </ul>
                </nav>
                <div className='App-body'>
                    <BrowserRouter>
                        <switch>
                            <Route path="/" exact component={() => <Login setUserAuthenticationStatus={this.setUserAuthenticationStatus}/>} />                    
                            <Route path="/dashboardS" exact component={() => <DashBoardS />} />
                            <Route path="/course" exact component={() => <FilterCourseTable />} />
                            <Route path="/registration" exact component={() => <Registration setUserAuthenticationStatus={this.setUserAuthenticationStatus}/>} />                           
                        </switch>
                    </BrowserRouter>
                </div>
            </div>
               
           
        );
    }
}


export default App;
