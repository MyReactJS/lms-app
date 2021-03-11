import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getUser } from './../Common.js';
import CourseRow from './CourseRow.js';
//import categories from './coursecategories.json';
import courses from './courses.json';
import './CourseSearch.css';
import CourseCard from './CourseCard.js';
class CourseSearch extends React.Component {
    constructor(props) {
        super(props);
        this.coursename = '';
        this.coursecategory = '';
        this.coursecredits = '';
        this.state = {
            startdate: '', enddate: '',
            categories: [],
            courses: [],
            enrolledcourses: [],
            enrolledcourses_sessionids: [],
            searchdisabled:false,
                 
        };
        
        this.credits = [1,2,3,4,5,6,7,8,9,10];
        this.handleCourseNameChange = this.handleCourseNameChange.bind(this);
        this.handleCourseCategoryChange = this.handleCourseCategoryChange.bind(this);
        this.handleCourseCreditsChange = this.handleCourseCreditsChange.bind(this);
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.handleOnCancel = this.handleOnCancel.bind(this);
    }

    handleOnCancel(event) {
        this.setState({ searchdisabled: !this.state.searchdisabled, }, () => {
            this.props.setResultRows([])});
        event.preventDefault();
        event.stopPropagation();
    }
    handleOnSubmit(event)
    {
        this.setState({ searchdisabled: !this.state.searchdisabled }, () => { });
        this.fetchData();
        
        var rows = [];
      
        

        var courseNameFilter = this.coursename;
        var courseCategoryFilter = this.coursecategory;
        var courseCreditsFilter = this.coursecredits;
        var courseStartDateFilter = this.state.startdate == '' ? '' : this.state.startdate;
        var courseEndDateFilter = this.state.enddate == '' ? '' : this.state.enddate;

        this.state.courses.forEach((course) =>
        {
           
            //alert(course.get('sessionId'));
            let coursestartdate = new Date(course.start_date);
            let courseenddate = new Date(course.end_date);
            const todayDate = new Date();
           
            if (course.coursename.toLowerCase().indexOf(courseNameFilter.toLowerCase()) === -1) //if name filter applied
                return;
            if (courseCategoryFilter !== '' && course.category !== courseCategoryFilter)
                return;

            if (courseCreditsFilter !== '' && course.credit!= courseCreditsFilter)
                return;
            if (courseStartDateFilter !== '' && courseEndDateFilter !== '') {
                
                if (coursestartdate >= courseStartDateFilter && courseenddate <= courseEndDateFilter)
                    rows.push(<CourseCard
                        enrolled={this.state.enrolledcourses_sessionids.includes(course.id)}            
                        course={course} />);
            }
            else if (courseStartDateFilter !== '') {
              
                if (coursestartdate >= courseStartDateFilter)
                    rows.push(<CourseCard
                        enrolled={this.state.enrolledcourses_sessionids.includes(course.id)}  
                        course={course} />);
            }
            else if (courseEndDateFilter !== '') {
             
                if (courseenddate <= courseEndDateFilter)
                    rows.push(<CourseCard
                        enrolled={this.state.enrolledcourses_sessionids.includes(course.id)}  
                         course={course} />);
            }
            else {
                rows.push(<CourseCard
                    enrolled={this.state.enrolledcourses_sessionids.includes(course.id)}  
                    course={course} />);
            }


        }
        );
       
        this.props.setResultRows(rows);
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
    
 
    fetchData() {
        const profile = getUser();

        var password = profile.password;


        axios.get("/api/core/category/")
            .then((res) => {

                this.setState({ categories: res.data })

            }
            )
            .catch((err) => console.log(err));
        //*************************************************************
        axios.get('/api/core/myenrolledsessions/',
            {

                auth: {
                    username: profile.email,
                    password: password
                }
            }
        )
            .then(res1 => {
                var enrolledids = [];
                var course_enrolled_sessions_data = res1.data.results;
                course_enrolled_sessions_data.forEach(enrolledsession => {
                    enrolledids.push(enrolledsession.sessionid);
                })
                this.setState({ enrolledcourses_sessionids: enrolledids })
                console.log(this.state.enrolledcourses_sessionids);
            })
            .then(() => {


                //****************************************************************
                axios.get("/api/core/sessions/")
                    .then(res1 => {

                        const course_sessions_data = res1.data.results
                        this.setState({ courses: course_sessions_data }, () => { console.log(courses) });

                    })
            })
            .catch(err => {
                console.log(err);
            });
    }
    
    componentDidMount() {

        this.fetchData();
        
    }


    
    render() {
        const categorynames = [];
        this.state.categories.map((category) => categorynames.push(category.name));
        const today = new Date();
     
       
        return (
            <div id="content">               
                    <div className="row">
                    <div className="container-fluid decor_bg" >
                            <div className="panel panel-primary">
                            <div className="container-fluid panel-heading"><h4>COURSES</h4></div>
                            <div className="panel-body">


                                <Form>
                                    <Form.Row >

                                        <Col lg="5"  className="d-flex justify-content-left">
                                            <Form.Label column="d-flex justify-content-center" column="lg"   htmlFor="coursename">Course Name:</Form.Label>

                                            <Form.Control className="d-flex justify-content-center"  type="text" id="coursename" name="coursename"
                                                    placeholder="React JS" onBlur={this.handleCourseNameChange} />
                                         </Col>    
                                        
                                      
                                        <Col lg="5" className="d-flex justify-content-left">
                                            <Form.Label className="d-flex justify-content-center" column="lg" htmlFor="coursecategory">Course Category: </Form.Label>
                                            <Form.Control className="d-flex justify-content-center" id="coursecategory" name="coursecategory" as="select" label="Course Category:" onChange={this.handleCourseCategoryChange}>
                                                <option></option>
                                                {categorynames.map((category) =>
                                                    <option>{category}</option>
                                                )}
                                                  
                                                </Form.Control>   
                                               
                                           </Col>
                                           
                                        <Col lg="2" className="d-flex justify-content-left">
                                            <Form.Label className="d-flex justify-content-center" column="lg" lg={1} htmlFor="coursecredits">Course Credits: </Form.Label>
                                     
                                   
                                                <Form.Control className="d-flex justify-content-center" id="coursecredits" name="coursecredits" onChange={this.handleCourseCreditsChange} as="select">
                                                <option></option>
                                                {this.credits.map((credit) =>
                                                    <option>{credit}</option>
                                                )}
                                                </Form.Control>
                                                
                                            </Col>
                                       
                                    </Form.Row>
                                    <Form.Row>
                                        <Col className="d-flex justify-content-left">
                                            <Form.Label className="d-flex justify-content-center" column="lg"  htmlFor="coursestartdate">Course StartDate:&nbsp;&nbsp;&nbsp;&nbsp;</Form.Label>
                                            <DatePicker lg={2} column="lg"  minDate={today} className="d-flex justify-content-center customDatePickerWidth"  selected={this.state.startdate} onChange={this.handleStartDateChange} name="coursestartdate" dateFormat="MM/dd/yyyy" />
                                        </Col >
                                        <Col  className="d-flex justify-content-left">
                                            <Form.Label className="d-flex justify-content-center" column="lg"  htmlFor="courseenddate">Course EndDate: &nbsp;&nbsp;&nbsp;&nbsp; </Form.Label>
                                            <DatePicker lg={2} column="lg"  minDate={today} className="d-flex justify-content-center customDatePickerWidth"   selected={this.state.enddate} onChange={this.handleEndDateChange} name="courseenddate" dateFormat="MM/dd/yyyy" />
                                        </Col>
                                      
                                    </Form.Row>
                                    <Form.Row>
                                        <Col>
                                            <Button onClick={this.handleOnSubmit} variant="primary" className="btn-class col-md-6" type="submit" disabled={this.state.searchdisabled}>Search</Button>
                                        </Col>
                                        <Col>
                                            <Button onClick={this.handleOnCancel} variant="secondary" className="btn-class-sec  col-md-6" type="cancel" disabled={!this.state.searchdisabled}>Clear</Button>
                                        </Col>

                                        
                                    </Form.Row>
                                </Form>

                                   

                            </div> </div> </div> </div>  </div>
            

        );
    }
}
export default CourseSearch;