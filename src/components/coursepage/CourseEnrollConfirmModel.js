
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

class CourseEnrollConfirmModel extends React.Component {
    constructor(props)
    {
        super(props)
        this.handleClick = this.handleClick.bind(handleClick);
    }
    handleClick(event)
    {

    }
    render() {
        return (
            <div className="modal" tabindex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div claclassNamess="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Modal title</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>Confirm Your Enrollment on {this.props.coursename}</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" onClick={this.handleClick}  className="btn btn-primary">Confirm</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default CourseEnrollConfirmModel;