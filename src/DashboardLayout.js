import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './DashboardLayout.css'
import { getUser } from './components/Common.js';
const DashboardLayout = ({ children, ...rest }) => {
    const profile = getUser();

    const usertype = profile.type;
   
    return (
        
        <div className="container">
            
            <h1 className='App-header title '>&nbsp;&nbsp; &nbsp;&nbsp;  Learning Management System </h1>   
            
      
            <nav className="site-nav">
               
                    <ul className="mainnav" >

                    {
                        usertype == 'student' ?
                            <li ><a href="/dashboardS"><span className="glyphicon glyphicon-user"></span></a></li>
                        :
                            <li ><a href="/dashboardF"><span className="glyphicon glyphicon-user"></span></a></li>
                    }
                    {
                        usertype == 'student' ?
                            <li ><a href="/course"><span className="glyphicon glyphicon-th-list"/></a></li>
                            :
                            <li> <a href="/students"><span className="glyphicon glyphicon-th-list"/></a></li>
                            
                    }   
                      
                    <li > <a href="/logout"> <span className="glyphicon glyphicon-log-out"></span> </a></li>

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