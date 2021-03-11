import React from 'react';
import { getUser } from './../Common.js';
import axios from "axios";
import TopicRow from './TopicRow.js';
import { withRouter } from 'react-router-dom';
import AddTopic from './AddTopic.js';


//import './AssignedCourseTable.css';
class TopicTable extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
           
            topics: [],
           
            modalshow: false,
            moduleid: '',
           
        }
        this.getData = this.getData.bind(this);
        this.AddTopic= this.AddTopic.bind(this);
        this.AddCancel = this.AddCancel.bind(this);
      //  this.getTopics = this.getTopics.bind(this);
      //  this.getTopics(); 
       // this.getData();
    }

    AddTopicOnClick = (event, moduleid) => {
        //alert(moduleid);
        this.setState({ moduleid: moduleid,modalshow: true }, () => { });
        //event.preventDefault();
    }
    AddTopic(topicid) {
        let moduleid = this.state.moduleid;
        const profile = getUser();
        var userid = profile.id;
        var password = profile.password;
        let updatesuccess = false;
        
        alert("AddTopic: " + topicid);
       
        var apiBaseUrl = "http://127.0.0.1:8000/api/core/";
        axios.get(apiBaseUrl + 'modules/' + moduleid + '/',
                        {

                            auth: {
                                username: profile.email,
                                password: password
                            }
                        }
                    )
                        .then(function (res2) {

                            if (res2.status === 200) {
                                var topicarray = res2.data.topics;
                                console.log(topicarray);
                                topicarray.push(topicid);
                                console.log(topicarray);
                                var payload_update = {
                                    "topics": topicarray

                                }
                                axios.put(apiBaseUrl + 'modules/' + moduleid + '/', payload_update,
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
                                            console.log("session details updated");
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

        let topicdetails = [];
        //alert(this.props.location.courseid);
        axios.get('/api/core/modules/' + this.props.location.moduleid + '/')
            .then(res1 => {

                const topicData = res1.data.topics

                
                     topicData.map((topicid) => {
                        axios.get('/api/core/topics/' + topicid + '/')
                            .then(res2 => {
                                //console.log(res2.data);
                                topicdetails.push(res2.data);
                            })
                            .catch(err => {
                                console.log(err);
                            });
                    })
                
                })
    
  
                .then(() => {
                this.setState({ topics: topicdetails }, () => {
                    console.log(this.state.topics)
                })
                    

            })
            .catch(err => {
                console.log(err);
            });
    }
    async  componentDidMount() {
           await this.getData();
        
    }
   
   
    render() {
        //this.getData();
        const rows = [];
        //alert(this.state.topics.length);
        this.state.topics.forEach((topic) => {
            rows.push(<TopicRow topic={topic} />);

        },console.log(rows));
        var recCount = rows.length;
        console.log(recCount);
        return (

           
            <div className="container-fluid decor_bg" >
                <div className="row">
             
                <div className="panel panel-primary">
                   
                        <div className="container-fluid panel-heading"><h4>Topics</h4></div>
                        <button type="button" onClick={(e) => { this.AddTopicOnClick(e, this.props.location.moduleid) }} className=" btn btn-warning"> Add  </button> 
                        <AddTopic
                           
                            show={this.state.modalshow}
                            onClick={this.AddTopic}
                            onHide={this.AddCancel}
                       
                          />
                        <div className="panel-body">
                            {
                                recCount == 0 ?
                                    <h2 className='noCourse'> No Topics </h2> :
                                    <table className="table table-bordered table-hover">
                                        <thead >
                                            <tr className="bg-primary">

                                                <th scope="col">Topic</th>
                                                <th scope="col">Edit/Delete</th>
                                           
                                                
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
export default (withRouter(TopicTable));