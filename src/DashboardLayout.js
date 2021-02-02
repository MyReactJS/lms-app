import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css'
const DashboardLayout = ({ children, ...rest }) => {
    return (
        
        <div className="container">
            <h1 className='App-header title'>Learning Management System </h1>   

                <nav className="site-nav">
                    <ul className="mainnav" >

                        <li ><a href="/dashboard">DashBoard</a></li>
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