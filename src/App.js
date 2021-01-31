import React from 'react';
import { Route, BrowserRouter } from "react-router-dom";
import './App.css';
import Contact from "./components/Contact";
import Login from './components/Login.js';
import Registration from "./components/Registration";
import DashboardC from './components/dashboard.js';
import DashboardE from './components/dashboardE.js';
import CreateService from './components/createService.js';
import UpdateService from './components/UpdateService.js';
import FilterCourseTable from './components/coursepage/FilterCourseTable.js';
import Header from './components/common/Header.js';
import 'bootstrap/dist/css/bootstrap.css';
class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className="container">
                <h1 className='App-header title'>ReadyAssist</h1>
                <nav className="site-nav">
                    <ul className="mainnav" >
                        <li ><a href="/">Home</a></li>
                        <li  ><a href="/course"><span className="glyphicon glyphicon-book"></span> Courses</a></li>
                        <li ><a href="/Account"><span className="glyphicon glyphicon-user"></span> Profile</a></li>
                        <li ><a href="/support">Support</a></li>
                        <li ><a href="/about">About</a></li>
                    </ul>
                </nav>
                <div className='App-body'>
                    <BrowserRouter>
                        <Route path="/" exact component={() => <Login />} />
                        <Route path="/course" exact component={() => <FilterCourseTable/>} />
                        <Route path="/registration" component={Registration} />
                        <Route path="/dashboardC" exact component={() => <DashboardC />} />
                        <Route path="/dashboardE" exact component={() => <DashboardE />} />
                        <Route path="/CreateService" exact component={() => <CreateService />} />
                        <Route path="/UpdateService" exact component={() => <UpdateService />} />
                    </BrowserRouter>
                </div>
            </div>
               
           
        );
    }
}


export default App;
