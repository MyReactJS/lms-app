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
        this.coursename = '';
        this.coursecategory = '';
        this.coursecredits = '';
        this.startdate = '';
        this.enddate = '';
        this.credits = [1,2,3,4,5,6,7,8,9,10];
        this.handleCourseNameChange = this.handleCourseNameChange.bind(this);
        this.handleCourseCategoryChange = this.handleCourseCategoryChange.bind(this);
        this.handleCourseCreditsChange = this.handleCourseCreditsChange.bind(this);
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        
    }
    handleOnSubmit(event)
    {
        
        this.props.setRefreshResult(true);


    }
    handleStartDateChange(sdate)
    {
        this.startdate = sdate;
        this.props.setCourseStartDateFilter(this.startdate); 
    }

    handleEndDateChange(sdate) 
    {
        this.enddate = sdate; 
        this.props.setCourseEndDateFilter(this.enddate);
    }
     handleCourseNameChange (event) 
    {

         this.coursename = event.target.value;

         this.props.setCourseNameFilter(this.coursename);

    }
    handleCourseCategoryChange(event)
    {
        this.coursecategory = event.target.value;

        this.props.setCourseCategoryFilter(this.coursecategory);

    }
    handleCourseCreditsChange(event)
    {
        this.coursecredits = event.target.value;
        this.props.setCreditFilter(this.coursecredits);
    }
    
    



    
    render() {
        const categorynames = [];
        categories.map((category) => categorynames.push(category.name));
            
     
       
        return (
            <div id="content">               
                    <div className="row">
                    <div className="container-fluid decor_bg" >
                            <div className="panel panel-primary">
                            <div className="container-fluid panel-heading"><h4>COURSES</h4></div>
                            <div className="panel-body">


                                <Form>
                                    <Form.Row>

                                       
                                            <Form.Group className="col-md-4" controlId="exampleForm.ControlInput1">

                                            <Form.Label htmlFor="coursename">Course Name:</Form.Label>
                                            
                                            <Form.Control  type="text" id="coursename" name="coursename"
                                                    placeholder="React JS" onBlur={this.handleCourseNameChange} />
                                                
                                            </Form.Group>

                                        
                                       
                                        <Form.Group className="col-md-4"controlId="exampleForm.ControlSelect1">

                                            <Form.Label  htmlFor="coursecategory">Course Category: </Form.Label>
                                            
                                            <Form.Control id="coursecategory" name="coursecategory" as="select" onChange={this.handleCourseCategoryChange}>
                                                <option></option>
                                                {categorynames.map((category) =>
                                                    <option>{category}</option>
                                                )}
                                                  
                                                </Form.Control>     
                                            </Form.Group>
                                       
                                        <Form.Group className="col-md-4" controlId="exampleForm.ControlSelect1">

                                            <Form.Label  htmlFor="coursecredits">Course Credits: </Form.Label>
                                            
                                            <Form.Control id="coursecredits" name="coursecredits" onChange={this.handleCourseCreditsChange} as="select">
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
                                            <DatePicker selected={this.startdate} onChange={this.handleStartDateChange} name="coursestartdate" dateFormat="MM/dd/yyyy" />
                                        </Col>
                                        <Col xs="auto">
                                            <Form.Label htmlFor="courseenddate">Course EndDate:</Form.Label>
                                            <DatePicker selected={this.enddate} onChange={this.handleEndDateChange} name="courseenddate" dateFormat="MM/dd/yyyy" />
                                        </Col>
                                       
                                    </Form.Row>
                                   
                                </Form>

                                   

                            </div> </div> </div> </div>  </div>
            

        );
    }
}
export default CourseSearch;