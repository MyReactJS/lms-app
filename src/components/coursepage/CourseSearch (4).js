import React from 'react';
import categories from './coursecategories.json';
import 'bootstrap/dist/css/bootstrap.css';
import DatePicker from "react-datepicker";
//import { addMonths } from 'react';
//import Dropdown from 'react-bootstrap/Dropdown';
//import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
//import FormCheck from 'react-bootstrap/FormCheck'
//import FormControl from 'react-bootstrap/FormControl';
import "react-datepicker/dist/react-datepicker.css";
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'
import CourseTable from './CourseTable.js';
class CourseSearch extends React.Component {
    constructor(props) {
        super(props);
       
        this.credits = [1,2,3,4,5,6,7,8,9,10];
        this.coursename = '';
        this.coursecategory = '';
        this.credits = '';
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        
    }
    handleOnSubmit(event)
    {
        console.log("form submission");
        console.log("coursecategory: " + this.state.coursecategory);       
        console.log("coursecredits: " + this.state.coursecredits);        
        console.log("startdate: " + this.state.coursestartdate);        
        console.log("enddate: " + this.state.courseenddate);        
        this.props.setCourseNameFilter(this.coursename);
        this.props.setCourseCategoryFilter(this.coursecategory);
        this.props.setCourseCreditsFilter(this.coursecredits);
        this.props.setCourseStartDateFilter(this.coursestartdate);
        this.props.setCourseEndDateFilter(this.state.courseenddate);        
        this.props.setRefreshResult(true);

    }

    render() {
        const categorynames = [];
        categories.map((category) => categorynames.push(category.name));
            
        return (
            <div id="content">               
                    <div className="row">
                    <div className="container-fluid decor_bg" >
                            <div className="panel panel-primary col-md-12">
                            <div className="container-fluid panel-heading"><h4>Course Search</h4></div>
                            <div className="panel-body">


                                <Form>
                                    <Form.Row>

                                       
                                            <Form.Group className="col-md-4" controlId="exampleForm.ControlInput1">

                                            <Form.Label htmlFor="coursename">Course Name:</Form.Label>
                                            
                                            <Form.Control  type="text" id="coursename" name="coursename"
                                                    placeholder="React JS" />
                                                
                                            </Form.Group>

                                        
                                       
                                        <Form.Group className="col-md-4"controlId="exampleForm.ControlSelect1">

                                            <Form.Label  htmlFor="coursecategory">Course Category: </Form.Label>
                                            
                                            <Form.Control id="coursecategory" name="coursecategory" as="select" >
                                                <option></option>
                                                {categorynames.map((category) =>
                                                    <option>{category}</option>
                                                )}
                                                  
                                                </Form.Control>     
                                            </Form.Group>
                                       
                                        <Form.Group className="col-md-4" controlId="exampleForm.ControlSelect1">

                                            <Form.Label  htmlFor="coursecredits">Course Credits: </Form.Label>
                                            
                                            <Form.Control id="coursecredits" name="coursecredits"  as="select">
                                                <option></option>
                                                {this.credits.map((credit) =>
                                                    <option>{credit}</option>
                                                )}
                                                </Form.Control>
                                            
                                              </Form.Group>
                                       
                                    </Form.Row>
                                    <Form.Row>
                                        <Col xs="auto">
                                            <Form.Label htmlFor="coursestartdate">Course StartDate:</Form.Label>
                                            <DatePicker  name="coursestartdate" dateFormat="MM/dd/yyyy" />
                                        </Col>
                                        <Col xs="auto">
                                            <Form.Label htmlFor="courseenddate">Course EndDate:</Form.Label>
                                            <DatePicker value={new Date()} name="courseenddate" dateFormat="MM/dd/yyyy" />
                                        </Col>
                                       
                                    </Form.Row>
                                    <Form.Row>
                                        <Col>
                                            <Button onClick={this.handleOnSubmit} variant="primary" className="col-md-6" type="submit">Search</Button>
                                        </Col>
                                        <Col>
                                            <Button variant="secondary" className=" col-md-6" type="cacel">Cancel</Button>
                                        </Col></Form.Row>
                                </Form>

                                   

                            </div> </div> </div> </div>  </div>
            

        );
    }
}
export default CourseSearch;