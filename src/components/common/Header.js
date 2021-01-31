import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
class Header extends React.Component {
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
                </div>
            );
    }
}
export default Header;