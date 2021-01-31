import React from 'react';
import categories from './coursecategories.json';
import 'bootstrap/dist/css/bootstrap.css';
import DatePicker from "react-datepicker";
//import { addMonths } from 'react';



import "react-datepicker/dist/react-datepicker.css";

class CourseSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            coursename: '',
            coursecategory: '',
            coursecredits: 0,
            coursestartdate: '',
            courseenddate: '',
            coursestatus:''
        }
        this.credits = [1,2,3,4,5,6,7,8,9,10];
        this.handleChange = this.handleChange.bind(this);
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);

        
    }
    handleStartDateChange(sdate) {
        this.setState({coursestartdate:sdate });
        console.log("coursestartdate=" + this.state.coursestartdate);   
        
    }

    handleEndDateChange(sdate) {
        this.setState({courseenddate:sdate });
        console.log("courseenddate=" + this.state.courseenddate);

    }
    handleChange(event)
    {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
        console.log(name + '=' + value);
        event.preventDefault();
    }
    



    
    render() {
        
     
       
        return (
            <div id="content">               
                    <div className="row">
                    <div className="container-fluid decor_bg" >
                            <div className="panel panel-primary col-md-12">
                            <div className="container-fluid panel-heading"><h4>COURSES</h4></div>
                                <div className="panel-body">
                                    <form  onSubmit={this.handleSubmit}>
                                    <div className="row">

                                        <div className="form-group  col-md-6">
                                            <label htmlFor="coursename" >Course Name: </label>
                                            <input type="text" name="coursename" placeholder="course name" onBlur={this.handleChange} />
                                    </div>

                                    <div className="form-group col-md-4">
                                            <div className="dropdown show">
                                                <label htmlFor="CategoryList" >Category: </label>
                                                <select name="coursecategory" className="btn btn-light dropdown" onChange={this.handleChange} >
                                                    {categories.map((category) =>
                                                        <option className="dropdown-item" >{category.name}</option>
                                                    )}
                                                </select>
                                            </div>
                                     </div>

                                    <div className="form-group col-md-2">
                                            <div className="dropdown show">
                                                <label htmlFor="CreditsList" >Credits:  </label>
                                                <select name="coursecredits" className="btn btn-light dropdown" onChange={this.handleChange}>
                                                    {this.credits.map((credit) =>
                                                        <option className="dropdown-item" >{credit}</option>
                                                    )}
                                                </select>   
                                            </div>
                                    </div>

                                    </div>
                                    <div className="row">
                                        <div className="form-group  col-md-5">
                                            <label htmlFor="startDate" >Start Date:  </label>
                                            <DatePicker selected={this.state.coursestartdate} onChange={this.handleStartDateChange} name="coursestartdate"  dateFormat="MM/dd/yyyy" />
                                        </div>

                                        <div className="form-group col-md-5">
                                            <label htmlFor="endDate" >End Date:  </label>
                                            <DatePicker value={new Date()} selected={this.state.courseenddate} onChange={this.handleEndDateChange} name="courseenddate" dateFormat="MM/dd/yyyy" />
                                        </div>

                                        <div className="form-group  center col-md-2">
                                            <input type="checkbox" name="coursestatus" onChange={this.handleChange}/>Completed
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="form-group col-md-12">
                                        <button type='submit' value='Submit' className=" btn btn-primary col-md-offset-2  btn-lg col-md-3"> Search </button>
                                        <button type='clear' value='Clear' className="btn  btn-secondary btn-lg col-md-offset-2 col-md-3"> Clear </button>
                                    
                                        </div>
                                        </div>
                                </form>

                                </div> </div> </div> </div>  </div>
        );
    }
}
export default CourseSearch;