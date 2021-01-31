import React from 'react';
import ProfileS from './ProfileS.js';
import EnrolledCourseTable from './EnrolledCourseTable.js';

class DashBoardS extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            tot_credits:0
        }
        this.setTotalCredits = this.setTotalCredits.bind(this);
    }
    setTotalCredits(t_credits)
    {
        this.setState({ tot_credits: t_credits });
    }
    render() {
        return (
            <div>
                <ProfileS tot_credits={this.state.tot_credits} />
                <EnrolledCourseTable setTotalCredits={this.setTotalCredits} />
            </div>
        );
    }
}
export default DashBoardS;