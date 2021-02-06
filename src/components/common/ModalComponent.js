import React, { Component } from "react";

import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class ModalComponent extends Component {

    render() {

        return (
            <div>
                <Modal show={this.props.show} onHide={() => this.props.onHide()}
                    animation={false} backdrop="static" keyboard={false} centered>

                    <Modal.Header closeButton>
                        <Modal.Title>
                            {this.props.title}
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        {this.props.body}


                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="primary" onClick={() => this.props.onClick()} >Close</Button>
                    </Modal.Footer>

                </Modal>
            </div>
        )
    };
}

export default ModalComponent;










