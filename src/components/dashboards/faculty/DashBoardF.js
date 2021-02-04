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
    setTotalClasses(t_credits) {
        this.setState({ tot_credits: t_credits });
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