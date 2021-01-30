import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
class CategoryList extends React.Component
{
    render() {
        for (let i of this.props.categories) { console.log(i); }
        return (
            <div className="form-group col-md-4">
               
                <div className="dropdown show">
                    <label htmlFor="CategoryList" >Category:  &nbsp; &nbsp; &nbsp; </label>
                    <select className="btn btn-light dropdown" >
                        {this.props.categories.map((category) =>
                            <option className="dropdown-item" >{category}</option> 
                        )}
                       
                        
                      
                    </select>
                </div>
            </div>
        );
    }
}
export default CategoryList;