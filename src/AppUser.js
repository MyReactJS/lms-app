import React from 'react';
import { Route, BrowserRouter } from "react-router-dom";
import './AppUser.css';
import Login from './components/Login.js';
import Registration from "./components/Registration";

//import { getUserAuthenticationStatus } from "./components/Common.js";

import DashBoardS from './components/dashboards/students/DashBoardS.js';
import FilterCourseTable from './components/coursepage/FilterCourseTable.js';

//import Header from './components/common/Header.js';
import 'bootstrap/dist/css/bootstrap.css';
class AppUser extends React.Component {
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
            <div>
                     
                <nav className="site-nav">
                    <ul className="mainnav" >
                        
                        <li ><a href="/dashboard">DashBoard</a></li>
                        <li ><a href="/course">Courses</a></li>
                        <li ><a href="/About Us">About Us</a></li>
                        <li ><a href="/About Us">Log Out</a></li>
                    </ul>
                </nav>
                <div className='App-body'>
                    <BrowserRouter>
                        <switch>
                            <Route path="/AppUser" exact component={() => <DashBoardS />} />
                            <Route path="/dashboard" exact component={() => <DashBoardS />} />
                            <Route path="/course" exact component={() => <FilterCourseTable />} />
                        
                        </switch>
                    </BrowserRouter>
                </div>
            </div>
               
           
        );
    }
}


export default AppUser;
