import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button'
class ModuleRow extends React.Component {

    constructor(props) {
        super(props);

       
   
        this.onAddTopicClick = this.onAddTopicClick.bind(this);
    }
    onViewTopicClick = (event, moduleid) => { 
    
        //alert("module");
        this.props.history.push({
            pathname: '/topics',
            "moduleid": moduleid,
        });
        event.preventDefault();
    }
    onAddTopicClick(event) {

    }
  
    render() {
        const module = this.props.module
       
        return (
            <tr className="table-light">

                <td >{module.name}</td>
               

                <td> <Button size="lg" onClick={(e) => { this.onViewTopicClick(e, module.id) }}
                    variant="link" > View</Button> </td>
                <td> <Button size="lg" onClick={this.onAddTopicClick}
                    variant="link" > Add </Button> </td>
            </tr>
        );
    }
}

export default ModuleRow;