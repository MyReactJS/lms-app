import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button'
class ModuleRow extends React.Component {

    constructor(props) {
        super(props);

       
        this.onViewTopicClick = this.onViewTopicClick.bind(this);
        this.onAddTopicClick = this.onAddTopicClick.bind(this);
    }
    onViewTopicClick(event)
    {

    }
    onAddTopicClick(event) {

    }
  
    render() {
        const module = this.props.module;
       
        return (
            <tr className="table-light">

                <td >{module.name}</td>
               

                <td> <Button size="lg" onClick={this.onViewTopicClick}
                    variant="link" > View</Button> </td>
                <td> <Button size="lg" onClick={this.onAddTopicClick}
                    variant="link" > Add </Button> </td>
            </tr>
        );
    }
}

export default ModuleRow;