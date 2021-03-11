import React from 'react';

import { Route, BrowserRouter } from "react-router-dom";

import DashboardRoute from './DashboardLayout';

import Registration from "./components/Registration";
import { Redirect } from 'react-router-dom';
import Contact from './components/common/Contact.js';
//import { getUserAuthenticationStatus } from "./components/Common.js";
import DashBoardF from './components/dashboards/faculty/DashBoardF.js';
import DashBoardS from './components/dashboards/students/DashBoardS.js';
import FilterCourseTable from './components/coursepage/FilterCourseTable.js';
import HomeLayoutRoute from './HomeLayout.js';
import RegistrationLayoutRoute from './RegistrationLayout.js';
import HomePage from './components/HomePage.js';
import ModuleTable from './components/modules/moduleTable.js';
import TopicTable from './components/topics/TopicTable.js';
import StudentsPage from './components/students/StudentsPage.js';
class AppMain extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        // <LoginLayoutRoute path="/login" component={Login} />
        return (
       
            <BrowserRouter>
                <switch>
                  <Route exact path="/">
                        <Redirect to="/login" />
                    </Route>
                    <HomeLayoutRoute path="/login" component={HomePage} />
                    <RegistrationLayoutRoute path="/registration" component={Registration} />
                    <DashboardRoute path="/dashboardF" component={DashBoardF} />
                    <DashboardRoute path="/dashboardS" component={DashBoardS} />
                    <DashboardRoute path="/course" component={FilterCourseTable} />
                    <HomeLayoutRoute path="/logout" component={HomePage} />
                    <DashboardRoute path="/aboutus" component={Contact} />
                    <DashboardRoute path="/modules" component={ModuleTable} />
                    <DashboardRoute path="/topics" component={TopicTable} />

                    <DashboardRoute path="/students" component={StudentsPage} />
                    


                </switch>
            </BrowserRouter>    
                );
                }

                }
export default AppMain;