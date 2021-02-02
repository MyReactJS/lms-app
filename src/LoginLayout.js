import React, { Component } from 'react';
import { Route } from 'react-router-dom';

const LoginLayout = ({ children }) => (
    <div className="container">
        <h1 className='App-header title'>Learning Management System </h1>
        
        <div className='App-body'>

        
            {children}
            </div>
    </div>
);

const LoginLayoutRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={matchProps => (
            <LoginLayout>
                <Component {...matchProps} />
            </LoginLayout>
        )} />
    )
};

export default LoginLayoutRoute; 