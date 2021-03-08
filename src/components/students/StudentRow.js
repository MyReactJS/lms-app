import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button'

class StudentRow extends React.Component {

    constructor(props) {
        super(props);

    
    }

        render() {
        return (
            <tr className="table-light" >

                <td >{this.props.student.id}</td>
                <td >{this.props.student.name}</td>
                <td>{this.props.student.email}</td>
                <td>{this.props.student.phone}</td>
               
            </tr>

        );
    }
}

export default StudentRow;