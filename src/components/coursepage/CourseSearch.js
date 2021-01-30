import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import CreditsList from './CreditsList.js';
import CategoryList from './CategoryList.js';
class CourseSearch extends React.Component {
    constructor(props) {
        super(props);
        this.credits = [1,2,3,4,5,6,7,8,9,10];

    }
  
    
    render() {

        return (
            <div id="content">
               
                    <div className="row">
                    <div className="container-fluid decor_bg" >
                            <div className="panel panel-primary col-md-9">
                            <div className="container-fluid panel-heading"><h4>COURSES</h4></div>
                                <div className="panel-body">
                                    <form role="form" onSubmit={this.handleSubmit}>

                                        <div className="form-group col-md-3">
                                            <label htmlFor="coursename" >Course Name:  &nbsp; &nbsp; &nbsp; </label>
                                            <input type="text" name="coursename" placeholder="course name" onBlur={this.handleTextOnChange} />
                                        </div>
                                    <CategoryList categories={this.props.categories}/>
                                    <CreditsList credits={this.credits}/>
                                        
                                    </form>
                                </div> </div> </div> </div>  </div>
        );
    }
}
export default CourseSearch;