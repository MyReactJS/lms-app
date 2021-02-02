import React from 'react';
import categories from './coursecategories.json';
import 'bootstrap/dist/css/bootstrap.css';
import DatePicker from "react-datepicker";
import Form from 'react-bootstrap/Form';
import "react-datepicker/dist/react-datepicker.css";
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import './CourseSearch.css';
class CourseSearch extends React.Component {
    constructor(props) {
        super(props);
        this.coursename = '';
        this.coursecategory = '';
        this.coursecredits = '';
        this.state = {
            startdate : '',enddate : ''
        };
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
        
        //alert('form submission click');
        this.props.setCourseNameFilter(this.coursename);
        this.props.setCourseCategoryFilter(this.coursecategory);
        this.props.setCreditFilter(this.coursecredits);
        this.props.setCourseStartDateFilter(this.state.startdate); 
        this.props.setCourseEndDateFilter(this.state.enddate);
        //alert('form submission end');

        event.preventDefault();
        event.stopPropagation();

    }
    handleStartDateChange(sdate)
    {
        this.setState({ startdate: sdate });
        
    }

    handleEndDateChange(sdate) 
    {
        this.setState({ enddate: sdate });
        
       
    }
     handleCourseNameChange (event) 
    {

         this.coursename = event.target.value;
         event.preventDefault();

    }
    handleCourseCategoryChange(event)
    {
        this.coursecategory = event.target.value;

        
        event.preventDefault();

    }
    handleCourseCreditsChange(event)
    {
        this.coursecredits = event.target.value;
        event.preventDefault();
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
                                    <Form.Row >

                                            <Form.Label column="lg" lg={1} htmlFor="coursename">Course Name:</Form.Label>
                                            <Col>
                                            <Form.Control lg={3}type="text" id="coursename" name="coursename"
                                                    placeholder="React JS" onBlur={this.handleCourseNameChange} />
                                            </Col>    
                                        
                                      
                                                <Form.Label column="lg" lg={1} htmlFor="coursecategory">Course Category: </Form.Label>
                                        <Col as="div">
                                                              
                                            <Form.Control size="lg"  lg={3}  id="coursecategory" name="coursecategory" as="select" onChange={this.handleCourseCategoryChange}>
                                                <option></option>
                                                {categorynames.map((category) =>
                                                    <option>{category}</option>
                                                )}
                                                  
                                                </Form.Control>   
                                               
                                           </Col>
                                           
                                                <Form.Label column="lg" lg={1}  htmlFor="coursecredits">Course Credits: </Form.Label>
                                            <Col>
                                            <center>
                                                <Form.Control size="lg" lg={3} id="coursecredits" name="coursecredits" onChange={this.handleCourseCreditsChange} as="select">
                                                <option></option>
                                                {this.credits.map((credit) =>
                                                    <option>{credit}</option>
                                                )}
                                                </Form.Control>
                                                </center>
                                            </Col>
                                       
                                    </Form.Row>
                                    <Form.Row>
                                        <Col>
                                            <Form.Label column="lg" lg={1} htmlFor="coursestartdate">Course StartDate:</Form.Label>
                                            <DatePicker selected={this.state.startdate} onChange={this.handleStartDateChange} name="coursestartdate" dateFormat="MM/dd/yyyy" />
                                        </Col>
                                        <Col>
                                            <Form.Label column="lg" lg={1} htmlFor="courseenddate">Course EndDate:</Form.Label>
                                            <DatePicker selected={this.state.enddate} onChange={this.handleEndDateChange} name="courseenddate" dateFormat="MM/dd/yyyy" />
                                        </Col>
                                       
                                    </Form.Row>
                                    <Form.Row>
                                        <Col>
                                            <Button onClick={this.handleOnSubmit} variant="primary" className="col-md-6" type="submit">Search</Button>
                                        </Col>
                                        <Col>
                                            <Button variant="secondary" className=" col-md-6" type="cancel">Cancel</Button>
                                        </Col></Form.Row>
                                </Form>

                                   

                            </div> </div> </div> </div>  </div>
            

        );
    }
}
export default CourseSearch;