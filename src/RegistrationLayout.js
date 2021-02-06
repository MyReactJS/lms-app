import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './RegistrationLayout.css';
const RegistrationLayout = ({ children }) => (
    <div className="Reg-container">
        <h1 className='Reg-App-header title'>&nbsp;&nbsp; &nbsp;&nbsp; Learning Management System </h1>

        

            {children}
      
    </div>
);

const RegistrationLayoutRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={matchProps => (
            <RegistrationLayout>
                <Component {...matchProps} />
            </RegistrationLayout>
        )} />
    )
};

export default RegistrationLayoutRoute; 