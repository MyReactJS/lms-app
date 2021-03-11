import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class AddNewModule extends Component {

    constructor(props) {
        super(props);
       // this.handleChange = this.handleChange.bind(this);
        
        this.state = {
            name: '',
            desc: '',
            topics:[],
        }
       
    }
    handleNameChange = (e) => this.setState({ name: e.target.value })
    handleDescChange = (e) => this.setState({ desc: e.target.value })

    render() {
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
                        <Form.Label>Name: </Form.Label>
                        <Form.Control type="text" onChange={this.handleNameChange} placeholder="name input" />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Description: </Form.Label>
                        <Form.Control type="text" onChange={this.handleDescChange} placeholder="desc input" />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit" onClick={() => this.props.onClick(this.state.name,this.state.desc,this.state.topics)}>Add   </Button>
                    <Button variant="secondary" type="Cancel" onClick={() => this.props.onHide()} >Cancel   </Button>
                        
        
                </Modal.Footer>
            </Modal>
        </>
    )
}
}
export default AddNewModule;