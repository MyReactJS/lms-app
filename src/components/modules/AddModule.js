import React, { Component } from "react";
import { getUser } from './../Common.js';
import Form from 'react-bootstrap/Form'
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import Col from 'react-bootstrap/Col';
import AddNewModule from './AddNewModule.js';
class AddModule extends Component {

    constructor(props) {
        super(props);
        // this.handleChange = this.handleChange.bind(this);
        this.state =
        {
            allmodules: [],
            newmoduleid: null,
            newmodulename:'',
            modalshow:false,
        }
        this.moduleid = null;
        this.modulename = null;
        this.moduletopics = null;
        this.AddCancel = this.AddCancel.bind(this);
        this.AddNewModule = this.AddNewModule.bind(this);
        this.getModules = this.getModules.bind(this);

    }
    getModules() {
        console.log("getModules");
        const profile = getUser();
        var userid = profile.id;
        var password = profile.password;
        axios.get("http://localhost:8000/api/core/modules/",
            {
                auth: {
                    username: profile.email,
                    password: password
                }
            }
        )
            .then((response) => {
                if (response.status === 200) {
                    console.log(response.data.results);

                    let l_modules= response.data.results;
                    this.setState({
                        allmodules: l_modules

                    }, () => { console.log(this.state.allmodules); });
                }
            }).catch(error => {
                console.log(error);
            });
    }
    AddCancel() {
        this.setState({ modalshow: false }, () => { });
    }
    componentDidMount() {
        this.getModules();

    }

    AddNewModule(modulename,modueldesc,moduletopics) {
        let courseid = this.state.courseid;
        const profile = getUser();
        var userid = profile.id;
        var password = profile.password;
        let addsuccess = false;
        let self = this;
        let moduleid = null;
        let allmodules = this.state.allmodules;
        let payload = null;
        if (moduletopics.length != 0)
            payload = {
                "name": modulename,
                "desc": modueldesc,
                "topics": moduletopics

            };
        else
            payload={
                "name": modulename,
                "desc": modueldesc


            };
        alert("Add NewModules: " + modulename);
        
        console.log(payload);
        var apiBaseUrl = "http://127.0.0.1:8000/api/core/";
        axios.post(apiBaseUrl + 'modules/', payload,
            {

                auth: {
                    username: profile.email,
                    password: password
                }
            })
            .then(function (res1) {
                //console.log(response);
                if (res1.status === 201) {
                    addsuccess = true;
                   
                    console.log(res1.data);
                    allmodules.push(res1.data);
                    moduleid = res1.data.id;
                    console.log("moduleid:" + moduleid);
                   
                } 



            })
            .then((self) => {


                this.setState({ allmodules: allmodules, newmodulename: modulename, newmoduleid: moduleid, modalshow: false }, () => { console.log(this.state.allmodules) });
            })
            .catch(function (error) {
                    console.log("")
                    console.log(error);
                });
    }
    handleChange = (event) => {
        var index = event.target.selectedIndex;
        var optionElement = event.target.childNodes[index]
        var option = optionElement.getAttribute('id');
        alert(option);
        if (option == "newmodule")
        {
            this.setState({ modalshow: true }, () => { });
            //alert("new topic");
        }
        else
        this.moduleid = parseInt(option);
    }
    render() {
        let rows = [];
        this.state.allmodules.map((module) => rows.push(<option id={module.id} onchang>{module.name}</option>));
 
        rows.push(<option id="newmodule" > &lt; Add New Module &gt; </option>)
        console.log(rows);
        return (
           
        <>
            <div
                className="d-flex align-items-center justify-content-center"
                style={{ height: "100vh" }}
            >
            </div>

            <Modal
                show={this.props.show} onHide={() => this.props.onHide()}
                animation={false} backdrop="static" keyboard={false} centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Module</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group >
                           
                         

                            <Form.Row >

                                <Col as="div">
                                    <Form.Label className="d-flex justify-content-center" column="lg" lg={1} htmlFor="module">Module: </Form.Label>
                                </Col>
                                <Col className="d-flex justify-content-center">

                                    <Form.Control className="d-flex justify-content-center" size="lg" lg={3} id="module" name="module" as="select" onChange={this.handleChange} >
                                        <option></option>
                                        {rows}

                                    </Form.Control>

                                </Col>


                            </Form.Row >  
                    </Form.Group>
                </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" type="submit" onClick={() => this.props.onClick(this.moduleid)}>Add   </Button>    
                    <Button variant="secondary" type="Cancel" onClick={() => this.props.onHide()} >Cancel   </Button>
                        
        
                    </Modal.Footer>
                    <AddNewModule
                        
                        show={this.state.modalshow}
                        onClick={this.AddNewModule}
                        onHide={this.AddCancel}

                    />
            </Modal>
        </>
    )
}
}
export default AddModule;