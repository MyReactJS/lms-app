import React from 'react';
import { getUser } from './../Common.js';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import axios from "axios";

class StudentsFilter extends React.Component {

    constructor(props) {
        super(props);
  
      
        
        this.handleCourseSessionChange = this.handleCourseSessionChange.bind(this);
    }
  
    
    handleCourseSessionChange(event)
    {
        this.props.setCourseSession(this.props.sessions.get(event.target.value));
        event.preventDefault();
    }
  
    
   

    render() {
        console.log(this.props.sessions);
        var sessionsdetails = [];
        for (const [key, value] of this.props.sessions.entries()) {
            sessionsdetails.push(<option> {key} </option>);
        }
        console.log(sessionsdetails);
        return (
            <div id="content">
                <div className="row">
                    <div className="container-fluid decor_bg" >
                        <div className="panel panel-primary">
                            <div className="container-fluid panel-heading"><h4>STUDENTS</h4></div>
                            <div className="panel-body">
                                <Form>
                                    <Form.Row >                     

                                        <Col as="div">
                                            <Form.Label className="d-flex justify-content-center" column="lg" lg={1} htmlFor="coursename">Course Session: </Form.Label>
                                        </Col>
                                        <Col className="d-flex justify-content-center">

                                            <Form.Control className="d-flex justify-content-center" size="lg" lg={3} id="coursename" name="coursename" as="select" onChange={this.handleCourseSessionChange}>
                                                <option></option>
                                                {sessionsdetails}
                                             
                                            </Form.Control>

                                        </Col>

                                      
                                        </Form.Row >  
                                    
                                </Form>



                            </div> </div> </div> </div>  </div>


        );
    }
}

export default StudentsFilter;