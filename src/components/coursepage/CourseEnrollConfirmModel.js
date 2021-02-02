
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Modal from 'react-bootstrap/Modal';
import ModalFooter from 'react-bootstrap/ModalFooter';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalTitle from 'react-bootstrap/ModalTitle';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalDialog from 'react-bootstrap/ModalDialog';
import Button from 'react-bootstrap/Button';
class CourseEnrollConfirmModel extends React.Component {
    constructor(props)
    {
        super(props)
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }
    handleClick(event)
    {
        event.preventDefault();
        event.stopPropagation();
    }
    handleClose(event) {

    }
    render() {
        return (
            <Modal.Dialog>
                <Modal.Header closeButton>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Modal body text goes here.</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary">Close</Button>
                    <Button variant="primary">Save changes</Button>
                </Modal.Footer>
            </Modal.Dialog>
        );
    }
}
export default CourseEnrollConfirmModel;