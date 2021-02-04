import React from 'react';
import { Route, BrowserRouter } from "react-router-dom";
import CourseDetailsPage from './components/coursepage/CourseDetailsPage.js';
import AppGuest from './AppGuest.js';
import './AppUser.css';
//import { getUserAuthenticationStatus } from "./components/Common.js";

import DashBoardS from './components/dashboards/students/DashBoardS.js';
import FilterCourseTable from './components/coursepage/FilterCourseTable.js';

//import Header from './components/common/Header.js';
import 'bootstrap/dist/css/bootstrap.css';
class AppUser extends React.Component {
    constructor(props) {
        super(props);
       
    }
   
    render() {

       // var isAuthenticated = getUserAuthenticationStatus();
       
        return (
            <div>
                     
                <nav className="site-nav">
                    <ul className="mainnav" >
                        
                        <li ><a href="/dashboardS">DashBoard</a></li>
                        <li ><a href="/course">Courses</a></li>
                        <li ><a href="/aboutus">About Us</a></li>
                        <li ><a href="/logout">Log Out</a></li>
                    </ul>
                </nav>
                <div className='App-body'>
                    <BrowserRouter>
                        <switch>
                            <Route path="/" exact component={() => <DashBoardS />} />
                            <Route path="/dashboardS" exact component={() => <DashBoardS />} />
                            <Route path="/course" exact component={() => <FilterCourseTable />} />
                            <Route path="/logout" exact component={() => <AppGuest />}/>
                            <Route path="/coursedetails" exact component={() => <CourseDetailsPage />} />
                        </switch>
                    </BrowserRouter>
                </div>
            </div>
               
           
        );
    }
}


export default AppUser;
