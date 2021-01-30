import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
class CreditsList extends React.Component {
    render() {
        const optins = [];
        

        return (
            <div className="form-group col-md-3">
                
                <div className="dropdown show">
                    <label htmlFor="CreditsList" >Credits:  &nbsp; &nbsp; &nbsp; </label>
                    <select className="btn btn-light dropdown" >
                        {this.props.credits.map((credit) =>
                            <option className="dropdown-item" >{credit}</option>
                        )}
                       
                    </select>
                </div>
                </div>
        )
    }
}
export default CreditsList;