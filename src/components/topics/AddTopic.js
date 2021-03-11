import React, { Component } from "react";
import { getUser } from './../Common.js';
import Form from 'react-bootstrap/Form'
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import Col from 'react-bootstrap/Col';
import AddNewTopic from './AddNewTopic.js';
class AddTopic extends Component {

    constructor(props) {
        super(props);
        // this.handleChange = this.handleChange.bind(this);
        this.state =
        {
            alltopics: [],
            newtopicid: null,
            newtopicname:'',
            modalshow:false,
        }
        this.topicid = null;
        this.AddCancel = this.AddCancel.bind(this);
        this.AddNewTopic = this.AddNewTopic.bind(this);
        this.getTopics = this.getTopics.bind(this);

    }
    getTopics() {
        console.log("getTopics");
        const profile = getUser();
        var userid = profile.id;
        var password = profile.password;
        axios.get("http://localhost:8000/api/core/topics/",
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

                    let l_topics = response.data.results;
                    this.setState({
                        alltopics: l_topics

                    }, () => { console.log(this.state.alltopics); });
                }
            }).catch(error => {
                console.log(error);
            });
    }
    AddCancel() {
        this.setState({ modalshow: false }, () => { });
    }
    componentDidMount() {
        this.getTopics();

    }

    AddNewTopic(topicname) {
        let moduleid = this.state.moduleid;
        const profile = getUser();
        var userid = profile.id;
        var password = profile.password;
        let addsuccess = false;
        let self = this;
        let topicid = null;
        let alltopics = this.state.alltopics;
        alert("Add NewTopic: " + topicname);
        var payload = {
            "name": topicname

        }
        var apiBaseUrl = "http://127.0.0.1:8000/api/core/";
        axios.post(apiBaseUrl + 'topics/', payload,
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
                    alltopics.push(res1.data);
                    topicid = res1.data.id;
                    console.log("topicid:" + topicid);
                   
                } 



            })
            .then((self) => {


                this.setState({ alltopics: alltopics, newtopicname: topicname, newtopicid: topicid, modalshow: false }, () => { console.log(this.state.alltopics) });
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
        if (option == "newtopic")
        {
            this.setState({ modalshow: true }, () => { });
            //alert("new topic");
        }
        else
        this.topicid = parseInt(option);
    }
    render() {
        let rows = [];
        this.state.alltopics.map((topic) => rows.push(<option id={topic.id} onchang>{topic.name}</option>));
        if (this.state.newtopicid != null) {
            console.log("newtopicid: " + this.state.newtopicid);
           // rows.push(<option id={this.state.newtopicid} >{this.state.newtopicname} </option>)
        }
        rows.push(<option id="newtopic" > &lt; Add New Topic &gt; </option>)
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
                    <Modal.Title>Add Topic</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group >
                           
                         

                            <Form.Row >

                                <Col as="div">
                                    <Form.Label className="d-flex justify-content-center" column="lg" lg={1} htmlFor="topic">Topic: </Form.Label>
                                </Col>
                                <Col className="d-flex justify-content-center">

                                    <Form.Control className="d-flex justify-content-center" size="lg" lg={3} id="topic" name="topic" as="select" onChange={this.handleChange} >
                                        <option></option>
                                        {rows}

                                    </Form.Control>

                                </Col>


                            </Form.Row >  
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                     <Button variant="primary" type="submit" onClick={() => this.props.onClick(this.topicid)}>Add   </Button>    
                    <Button variant="secondary" type="Cancel" onClick={() => this.props.onHide()} >Cancel   </Button>
                        
        
                    </Modal.Footer>
                    <AddNewTopic
                        
                        show={this.state.modalshow}
                        onClick={this.AddNewTopic}
                        onHide={this.AddCancel}

                    />
            </Modal>
        </>
    )
}
}
export default AddTopic;