import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import MyCarousel from './components/common/Carousel.js';
import './HomeLayout.css';

const HomeLayout = ({ children }) => (
    <div className="container">
        <h1 className='App-header title'>&nbsp;&nbsp; &nbsp;&nbsp; Learning Management System </h1>

        <div className='carousel'>
            <MyCarousel />
        </div>

            {children}
        
    </div>
);

const HomeLayoutRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={matchProps => (
            <HomeLayout>
                <Component {...matchProps} />
            </HomeLayout>
        )} />
    )
};

export default HomeLayoutRoute; 