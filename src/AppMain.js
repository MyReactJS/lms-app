import React from 'react';
import AppUser from './AppUser.js';
import AppGuest from './AppGuest.js';
import { Route, BrowserRouter } from "react-router-dom";
import LoginLayoutRoute from './LoginLayout';
import DashboardRoute from './DashboardLayout';
import Login from './components/Login.js';
import Registration from "./components/Registration";
import { Redirect } from 'react-router-dom';
import Contact from './components/common/Contact.js';
//import { getUserAuthenticationStatus } from "./components/Common.js";

import DashBoardS from './components/dashboards/students/DashBoardS.js';
import FilterCourseTable from './components/coursepage/FilterCourseTable.js';
class AppMain extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
       
            <BrowserRouter>
                <switch>
                  <Route exact path="/">
                        <Redirect to="/login" />
                    </Route>
                    <LoginLayoutRoute path="/login" component={Login} />
                    <LoginLayoutRoute path="/registration" component={Registration} />
                    <DashboardRoute path="/dashboard" component={DashBoardS} />
                    <DashboardRoute path="/course" component={FilterCourseTable} />
                    <LoginLayoutRoute path="/logout" component={Login} />
                    <DashboardRoute path="/aboutus" component={Contact} />


                </switch>
            </BrowserRouter>    
                );
                }

                }
export default AppMain;