import React from 'react';
import ProfileF from './ProfileF.js';
import AssignedCourseTable from './AssignedCourseTable.js';

class DashBoardF extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tot_classes: 0
        }
        this.setTotalClasses = this.setTotalClasses.bind(this);
    }
    setTotalClasses(tot_classes) {
        this.setState({ tot_classes: tot_classes });
    }
    render() {
        return (
            <div>
                <ProfileF tot_classes={this.state.tot_classes} />
                <AssignedCourseTable setTotalClasses={this.setTotalClasses} />
            </div>
        );
    }
}



export default DashBoardF;