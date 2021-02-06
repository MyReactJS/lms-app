import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { getUser } from './../../Common.js';
import './ProfileF.css';
class ProfileF extends React.Component
{
   

    render() {
        //const fname = profile.firstName;
        //const lname = profile.lastName;
        //const email = profile.email;
        //const name = fname + ' ' + lname;
        //const phonenum = profile.phoneNumbers[0].number;
        const profile = getUser();
        //const fname = profile.firstName;
        //const lname = profile.lastName;
        const email = profile.email;
        const name = profile.name;
        const phonenum = profile.phonenum.substring(0, 3) + "- " + profile.phonenum.substring(3, 6) + "- " + profile.phonenum.substring(6);


        return (
            <div className="row">
                <div className="container-fluid decor_bg" >
                    <div className="panel panel-primary">
                        <div className="container-fluid panel-heading"><h4>Faculty Profile</h4></div>
                        <div className="panel-body">
                            <Form>
                                
                                    <Row>
                                        <Col>
                                            <Form.Group as={Row} controlId="name">
                                            <Form.Label column="lg">Faculty Name</Form.Label>
                                            <Col>
                                                <Form.Control className="border-0" font-size="xx-large" type="text" value={name} disabled />
                                            </Col>
                                             </Form.Group>
                                        </Col>

                                        <Col>
                                            <Form.Group as={Row} controlId="totcredits">
                                                <Form.Label column="lg">
                                                    Total Class(es)
                                                </Form.Label>
                                                <Col>
                                                <Form.Control type="text" disabled placeholder="" value={this.props.tot_classes} />
                                                </Col>
                                            </Form.Group>
                                        </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group as={Row} controlId="email">
                                            <Form.Label column="lg">
                                                Email
                                            </Form.Label>
                                            <Col>
                                                <Form.Control value={email} disabled type="email" placeholder="Email" />
                                            </Col>
                                        </Form.Group>
                                    </Col>

                                    <Col>
                                        <Form.Group as={Row} controlId="phonenum">
                                            <Form.Label column="lg">
                                                Phone Number
                                                </Form.Label>
                                            <Col>
                                                <Form.Control type="text"  readOnly size="lg" value={phonenum} />
                                            </Col>
                                        </Form.Group>
                                    </Col>
                                   
                                </Row>
                               
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
            );
     }
}


export default ProfileF;
