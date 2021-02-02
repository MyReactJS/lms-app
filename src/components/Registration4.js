import React from 'react';
import './Registration.css'
import { FormErrors } from './FormErrors';
import { withRouter } from "react-router-dom";


import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Form';
import { connect } from 'react-redux';


import { ActionCreators } from '../actions/ActionCreators';
class Registration extends React.Component {

    constructor(props) {
        super(props);
      }

   
    render() {
             return (
                 <div id="content">
                     <div className="container-fluid decor_bg" >
                         <div className="row">
                             <div className="col-md-10">
                                 <div className="panel panel-primary">
                                     <div className="panel-heading"><h4>SIGN UP</h4></div>
                                     <div className="panel-body">
                                         <Form>
                                             <Form.Row>
                                                 <Form.Group as={Col} controlId="formGridEmail">
                                                     <Form.Label>Email</Form.Label>
                                                     <Form.Control type="email" placeholder="Enter email" />
                                                 </Form.Group>

                                                 <Form.Group as={Col} controlId="formGridPassword">
                                                     <Form.Label>Password</Form.Label>
                                                     <Form.Control type="password" placeholder="Password" />
                                                 </Form.Group>
                                             </Form.Row>

                                             <Form.Group controlId="formGridAddress1">
                                                 <Form.Label>Address</Form.Label>
                                                 <Form.Control placeholder="1234 Main St" />
                                             </Form.Group>

                                             <Form.Group controlId="formGridAddress2">
                                                 <Form.Label>Address 2</Form.Label>
                                                 <Form.Control placeholder="Apartment, studio, or floor" />
                                             </Form.Group>

                                             <Form.Row>
                                                 <Form.Group as={Col} controlId="formGridCity">
                                                     <Form.Label>City</Form.Label>
                                                     <Form.Control />
                                                 </Form.Group>

                                                 <Form.Group as={Col} controlId="formGridState">
                                                     <Form.Label>State</Form.Label>
                                                     <Form.Control as="select" defaultValue="Choose...">
                                                         <option>Choose...</option>
                                                         <option>...</option>
                                                     </Form.Control>
                                                 </Form.Group>

                                                 <Form.Group as={Col} controlId="formGridZip">
                                                     <Form.Label>Zip</Form.Label>
                                                     <Form.Control />
                                                 </Form.Group>
                                             </Form.Row>

                                             <Form.Group id="formGridCheckbox">
                                                 <Form.Check type="checkbox" label="Check me out" />
                                             </Form.Group>

                                             <Button variant="primary" type="submit">
                                                 Submit
  </Button>
                                         </Form>
                                </div></div></div></div></div> </div>
            );
        
        
    }
}
const mapStateToProps = (state) => {
    return {
        profile: state.user.profile
    }
}



export default connect(mapStateToProps)(withRouter(Registration));
