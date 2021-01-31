import React from 'react';
import profile from './profile.json';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
class ProfileS extends React.Component
{
   

    render() {
        const fname = profile.firstName;
        const lname = profile.lastName;
        const email = profile.email;
        const name = fname + ' ' + lname;
        const phonenum = profile.phoneNumbers[0].number;
        return (
            <div className="row">
                <div className="container-fluid decor_bg" >
                    <div className="panel panel-primary">
                        <div className="container-fluid panel-heading"><h4>Student Profile</h4></div>
                        <div className="panel-body">
                            <Container>
                                
                                    <Row>
                                        <Col>
                                            <div> Student Name </div>
                                            <div>{name}</div>
                                        </Col>

                                        <Col>
                                            <div> Total Credit(s) </div>                                              
                                             <div> 100"</div>
                                          
                                        </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <div> Email </div>
                                            <div>{email}</div>
                                      
                                    </Col>

                                    <Col>
                                        <div>
                                                Phone Number
                                                </div>
                                            <div>
                                                {phonenum} </div>
                                         
                                    </Col>
                                   
                                </Row>
                               
                            </Container>
                        </div>
                    </div>
                </div>
            </div>
            );
     }
}
export default ProfileS;