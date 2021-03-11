import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button'
class TopicRow extends React.Component {

    constructor(props) {
        super(props);

       
        this.onEditDeleteTopicClick = this.onEditDeleteTopicClick.bind(this);
    }
  
    onEditDeleteTopicClick(event) {

    }
  
    render() {
        const topic = this.props.topic
       
        return (
            <tr className="table-light">

                <td >{topic.name}</td>
               

                <td> <Button size="lg" onClick={this.onEditDeleteTopicClick}
                    variant="link" > Edit/Delete</Button> </td>
              
            </tr>
        );
    }
}

export default TopicRow;