import React from 'react';
import { getUser } from './../Common.js';
import axios from "axios";
import ModuleRow from './moduleRow.js';
import { withRouter } from 'react-router-dom';
import AddModule from './AddModule.js';

//import './AssignedCourseTable.css';
class ModuleTable extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            modules: [],
            modalshow: false,
            courseid: '',
        }
        this.getData = this.getData.bind(this);
        this.AddModule = this.AddModule.bind(this);
        this.AddCancel = this.AddCancel.bind(this);
        //this.getData();
    }
    AddModuleOnClick = (event, courseid) => {
        alert(courseid);
        this.setState({ courseid: courseid, modalshow: true }, () => { });
        //event.preventDefault();
    }
    AddModule(moduleid) {
        let courseid = this.state.courseid;
        const profile = getUser();
        var userid = profile.id;
        var password = profile.password;
        let updatesuccess = false;
     
        alert("AddModule: " + moduleid);

        var apiBaseUrl = "http://127.0.0.1:8000/api/core/";
        axios.get(apiBaseUrl + 'courses/' + courseid + '/',
            {

                auth: {
                    username: profile.email,
                    password: password
                }
            }
        )
            .then(function (res2) {

                if (res2.status === 200) {
                    let modulesarray = res2.data.modules;
                    let category = res2.data.category;
                    let credit = res2.data.credit;
                    let duration = res2.data.duration;
                    let coursename = res2.data.name;
                    console.log(modulesarray);
                    modulesarray.push(moduleid);
                    console.log(modulesarray);
                    let payload_update = {
                        "category": category,
                        "name": coursename,
                        "credit": credit,
                        "duration":duration,
                        "modules": modulesarray

                    }
                    axios.put(apiBaseUrl + 'courses/' + courseid + '/', payload_update,
                        {

                            auth: {
                                username: profile.email,
                                password: password
                            }
                        }
                    )
                        .then(function (response) {

                            if (response.status === 200) {
                                console.log(response.data);
                                console.log("module details updated");
                                updatesuccess = true;

                            }



                        })

                }
            })





            .catch(function (error) {
                console.log("")
                console.log(error);
            });
        this.setState({ modalshow: false }, () => { });
    }
    AddCancel() {
        this.setState({ modalshow: false }, () => { });
    }
     getData() {
       
        const profile = getUser();
        var userid = profile.id;
        var password = profile.password;
         //let fmoduleDetails = [];
         let courseid = this.props.location.courseid;
         console.log("getData");
        //alert(this.props.location.courseid);
             return new Promise(function (accept, reject) {
             let moduleDetails = [];

             axios.get('/api/core/courses/' + courseid + '/',
                 {

                     auth: {
                         username: profile.email,
                         password: password
                     }
                 }
             )
                 .then(res1 => {

                     if (res1.status === 200) {
                         const modulesData = res1.data.modules
                         console.log("moduleData");

                         modulesData.map((moduleid) => {
                             axios.get('/api/core/modules/' + moduleid + '/')
                                 .then(res2 => {
                                     console.log(res2.data);
                                     moduleDetails.push(res2.data);
                                 })
                                 .catch(err => {
                                     console.log(err);
                                 });
                         })
                         accept( moduleDetails);

                     }

                 })
                
                 .catch(err => {
                     console.log(err);
                 });
         })
            
                
            
    }
     componentDidMount() {
         console.log("componentDidMount - start");
         console.log(this.state.modules);
         var that = this;
     this.getData()
             .then(function (fmoduleDetails) {

                 console.log(fmoduleDetails);
                 that.setState({ modules: fmoduleDetails }, () => {
                     console.log(that.state.modules)
                 })
                 console.log(that.state.modules);
             });
   
        console.log("componentDidMount - end");
    }
    
    render() {
       const rows = [];
       // this.state.modules.forEach((module) => {
      //     rows.push(<ModuleRow module={module} history={this.props.history}/>);
      //  });
        console.log(this.state.modules);
       console.log(rows);
        var recCount = this.state.modules.length;
        return (

           
            <div className="container-fluid decor_bg" >
                <div className="row">
             
                <div className="panel panel-primary">
                   
                        <div className="container-fluid panel-heading"><h4>Modules</h4></div>
                        <button type="button" onClick={(e) => { this.AddModuleOnClick(e, this.props.location.courseid) }} className=" btn btn-warning"> Add  </button> 
                        <AddModule

                            show={this.state.modalshow}
                            onClick={this.AddModule}
                            onHide={this.AddCancel}

                        />
                        <div className="panel-body">
                            {
                                recCount == 0 ?
                                    <h2 className='noCourse'> No Modules </h2> :
                                    <table className="table table-bordered table-hover">
                                        <thead >
                                            <tr className="bg-primary">

                                                <th scope="col">Module</th>
                                                <th scope="col">Topics</th>
                                                <th scope="col">Add Topic</th>
                                                
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.modules.map(module => (
                                                <ModuleRow module={module} history={this.props.history} />
                                            ))}
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