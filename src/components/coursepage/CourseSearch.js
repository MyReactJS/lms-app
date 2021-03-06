import React from 'react';
//import categories from './coursecategories.json';
import courses from './courses.json';
import enrolledcourses from './../dashboards/students/EnrolledCourses.json';
import 'bootstrap/dist/css/bootstrap.css';
import DatePicker from "react-datepicker";
import Form from 'react-bootstrap/Form';
import "react-datepicker/dist/react-datepicker.css";
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import './CourseSearch.css';
import CourseRow from './CourseRow.js';
import axios from "axios";
import { getUser } from './../Common.js';

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
            enrolled:[],
            remainingseats:[],       
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
        
        var rows = [];
      
        

        var courseNameFilter = this.coursename;
        var courseCategoryFilter = this.coursecategory;
        var courseCreditsFilter = this.coursecredits;
        var courseStartDateFilter = this.state.startdate == '' ? '' : this.state.startdate;
        var courseEndDateFilter = this.state.enddate == '' ? '' : this.state.enddate;
    
        this.state.courses.map((course) =>
        {
           
            //alert(course.get('sessionId'));
            let coursestartdate = course.get('start_date');
            let courseenddate = course.get('end_date');
            const todayDate = new Date();
           
            if (course.get('name').toLowerCase().indexOf(courseNameFilter.toLowerCase()) === -1) //if name filter applied
                return;
            if (courseCategoryFilter !== '' && course.get('category') !== courseCategoryFilter)
                return;

            if (courseCreditsFilter !== '' && course.get('credits') != courseCreditsFilter)
                return;
            if (courseStartDateFilter !== '' && courseEndDateFilter !== '') {
                
                if (coursestartdate >= courseStartDateFilter && courseenddate <= courseEndDateFilter)
                    rows.push(<CourseRow
                        enrolled={this.state.enrolled.get(course.get('sessionId'))}
                        rem_seats={this.state.remainingseats.get(course.get('sessionId'))}
                        setRemainingSeats={this.setRemainingSeats}
                        setEnrolled={this.setEnrolled}
                        course={course} />);
            }
            else if (courseStartDateFilter !== '') {
              
                if (coursestartdate >= courseStartDateFilter)
                    rows.push(<CourseRow
                        enrolled={this.state.enrolled.get(course.get('sessionId'))}
                        rem_seats={this.state.remainingseats.get(course.get('sessionId'))}
                        setRemainingSeats={this.setRemainingSeats}
                        setEnrolled={this.setEnrolled}
                        course={course} />);
            }
            else if (courseEndDateFilter !== '') {
             
                if (courseenddate <= courseEndDateFilter)
                    rows.push(<CourseRow
                        enrolled={this.state.enrolled.get(course.get('sessionId'))}
                        rem_seats={this.state.remainingseats.get(course.get('sessionId'))}
                        setRemainingSeats={this.setRemainingSeats}
                        setEnrolled={this.setEnrolled}
                         course={course} />);
            }
            else {
                rows.push(<CourseRow
                    enrolled={this.state.enrolled.get(course.get('sessionId'))}
                    rem_seats={this.state.remainingseats.get(course.get('sessionId'))}
                    setRemainingSeats={this.setRemainingSeats}
                    setEnrolled={this.setEnrolled}
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
    
 

    
    componentDidMount() {

        const profile = getUser();
        var userid = profile.id;
        var password = profile.password;

        var local_courses = [];
        var local_enrolled = new Map();
        var local_remainingseats = new Map();
        axios.get("/api/core/category/")
            .then((res) =>
            {
               
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
                    enrolledids.push(enrolledsession.course);
                })
                this.setState({ enrolledcourses_sessionids: enrolledids })
                console.log(this.state.enrolledcourses_sessionids);
            })
            .then(() => {


                //****************************************************************
                axios.get("/api/core/sessions/")
                    .then(res1 => {

                        const course_sessions_data = res1.data.results
                        console.log(course_sessions_data);
                        // NESTED AXIOS CALLS
                        course_sessions_data.forEach(coursesession => {
                          
                            var local_course = new Map();
                            local_course.set('sessionId', coursesession.id);

                            local_course.set('tot_seats', coursesession.tot_seats);
                            local_course.set('rem_seats', coursesession.rem_seats);
                            local_remainingseats.set(coursesession.id, coursesession.rem_seats);
                            local_course.set('start_date', new Date(coursesession.start_date));
                            local_course.set('end_date', new Date(coursesession.end_date));
                            local_course.set('courseId', coursesession.course);
                            axios.get("/api/core/courses/" + coursesession.course + "/")
                                .then(res2 => {
                                    //console.log(res2.data);
                                    local_course.set('credits', res2.data.credit);
                                    local_course.set('duration', res2.data.duration);

                                    local_course.set('name', res2.data.name);
                                    const course_category_id = res2.data.category
                                    //console.log("course name: " + course_name);
                                    //console.log("category id:" + course_category_id);

                                    axios.get("/api/core/category/" + course_category_id + "/")
                                        .then(res3 => {
                                            //console.log(res3.data);
                                            const course_category = res3.data.name
                                            //console.log("category:" + course_category);
                                            local_course.set('category', course_category);
                                            //console.log(local_course);
                                            local_enrolled.set(local_course.get('sessionId'),
                                                this.state.enrolledcourses_sessionids.includes(local_course.get('sessionId')));
                                            local_courses.push(local_course);
                                        })

                                })

                                .catch(err => {
                                    console.log(err);
                                });
                        })
                        console.log(local_enrolled);
                        console.log(local_remainingseats);
                        this.setState({ courses: local_courses, enrolled: local_enrolled, remainingseats:local_remainingseats});
                        console.log(this.state.courses);
                    })
            })
            .catch(err => {
                console.log(err);
            });
        
    }


    
    render() {
        const categorynames = [];
        this.state.categories.map((category) => categorynames.push(category.name));
            
     
       
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
                                            <Form.Control className="d-flex justify-content-center"  lg={3}type="text" id="coursename" name="coursename"
                                                    placeholder="React JS" onBlur={this.handleCourseNameChange} />
                                            </Col>    
                                        
                                      
                                        <Col as="div">
                                            <Form.Label className="d-flex justify-content-center" column="lg" lg={1} htmlFor="coursecategory">Course Category: </Form.Label>
                                        </Col>
                                        <Col className="d-flex justify-content-center" >

                                            <Form.Control className="d-flex justify-content-center" size="lg"  lg={3}  id="coursecategory" name="coursecategory" as="select" onChange={this.handleCourseCategoryChange}>
                                                <option></option>
                                                {categorynames.map((category) =>
                                                    <option>{category}</option>
                                                )}
                                                  
                                                </Form.Control>   
                                               
                                           </Col>
                                           
                                            <Col>
                                            <Form.Label className="d-flex justify-content-center" column="lg" lg={1} htmlFor="coursecredits">Course Credits: </Form.Label>
                                        </Col>
                                        <Col className="d-flex justify-content-center" >
                                                <Form.Control className="d-flex justify-content-center" size="lg" lg={2} id="coursecredits" name="coursecredits" onChange={this.handleCourseCreditsChange} as="select">
                                                <option></option>
                                                {this.credits.map((credit) =>
                                                    <option>{credit}</option>
                                                )}
                                                </Form.Control>
                                                
                                            </Col>
                                       
                                    </Form.Row>
                                    <Form.Row>
                                        <Col>
                                            <Form.Label className="d-flex justify-content-center" column="lg" lg={1} htmlFor="coursestartdate">Course StartDate:&nbsp;&nbsp;&nbsp;&nbsp;</Form.Label>
                                            <DatePicker selected={this.state.startdate} onChange={this.handleStartDateChange} name="coursestartdate" dateFormat="MM/dd/yyyy" />
                                        </Col>
                                        <Col>
                                            <Form.Label className="d-flex justify-content-center" column="lg" lg={1} htmlFor="courseenddate">Course EndDate: &nbsp;&nbsp;&nbsp;&nbsp; </Form.Label>
                                            <DatePicker className="d-flex justify-content-center" className="d-flex justify-content-center"selected={this.state.enddate} onChange={this.handleEndDateChange} name="courseenddate" dateFormat="MM/dd/yyyy" />
                                        </Col>
                                       
                                    </Form.Row>
                                    <Form.Row>
                                        <Col>
                                            <Button  onClick={this.handleOnSubmit} variant="primary" className="btn-class col-md-6" type="submit">Search</Button>
                                        </Col>
                                        <Col>
                                            <Button variant="secondary" className="btn-class-sec  col-md-6" type="cancel">Cancel</Button>
                                        </Col></Form.Row>
                                </Form>

                                   

                            </div> </div> </div> </div>  </div>
            

        );
    }
}
export default CourseSearch;