import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './DashboardLayout.css'
import { getUser } from './components/Common.js';
const DashboardLayout = ({ children, ...rest }) => {
    const profile = getUser();
    //const fname = profile.firstName;
    //const lname = profile.lastName;
    const usertype = profile.type;
   
    return (
        
        <div className="container">
            <h1 className='App-header title'>&nbsp;&nbsp; &nbsp;&nbsp;  Learning Management System </h1>   

                <nav className="site-nav">
                    <ul className="mainnav" >

                    {
                        usertype == 'student' ?
                        <li ><a href="/dashboardS">DashBoard</a></li>
                        :
                            <li ><a href="/dashboardF">DashBoard</a></li>
                    }
                        <li ><a href="/course">Courses</a></li>
                        <li ><a href="/aboutus">About Us</a></li>
                        <li ><a href="/logout">Log Out</a></li>

                    </ul>
                </nav>

            <div className="main">{children}</div>
        </div>
    )
}

const DashboardLayoutRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={matchProps => (
            <DashboardLayout>
                <Component {...matchProps} />
            </DashboardLayout>
        )} />
    )
};

export default DashboardLayoutRoute; 