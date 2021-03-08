import React from 'react';
import { getUser } from './../Common.js';
import axios from "axios";
import ModuleRow from './moduleRow.js';
import { withRouter } from 'react-router-dom';

//import './AssignedCourseTable.css';
class ModuleTable extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            modules:[]
        }

    }
    getData() {
       
        const profile = getUser();
       
        
        axios.get('/api/core/modules/',
            {
               

                params: {
                    courseid: this.props.courseid,

                },
            }
        )
            .then(res1 => {
              
                const modules = res1.data.results
                this.setState({ modules: modules }, () => {
                    console.log(this.state.modules)
                    
                    });
               




            })
            .catch(err => {
                console.log(err);
            });
    }
    componentDidMount() {
        this.getData();
    }
    render() {
        const rows = [];
        this.state.modules.forEach((module) => {
            rows.push(<ModuleRow module={module} />);

        });
        var recCount = rows.length;
        return (

            <div className="row">
                <div className="container-fluid decor_bg" >
                    <div className="panel panel-primary">
                        <div className="container-fluid panel-heading"><h4>Assigned Courses</h4></div>
                        <div className="panel-body">
                            {
                                recCount == 0 ?
                                    <h2 className='noCourse'> No Courses </h2> :
                                    <table className="table table-bordered table-hover">
                                        <thead >
                                            <tr className="bg-primary">

                                                <th scope="col">Module</th>
                                                <th scope="col">Topics</th>
                                                <th scope="col">Add Topic</th>
                                                
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {rows}
                                        </tbody></table>
                            }
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}
//export default withRouter(connect(mapStateToProps, matchDispatchToProps)(ModuleTable));
export default (withRouter(ModuleTable));