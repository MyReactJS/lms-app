import React from 'react';
import $ from 'jquery'; 
import CardDeck from 'react-bootstrap/CardDeck'
import CardGroup from 'react-bootstrap/CardGroup'
import CardColumns from 'react-bootstrap/CardColumns'
import './CourseTableWithoutPaginationWithCard.css';
class CourseTableWithoutPaginationWithCard extends React.Component
{CardDeck
    constructor(props) {
        super(props);
    }
    render() {
        var recCount = this.props.rows.length;
        var finalrows = [];
        if (recCount != 0)
        {
            var j = 0;
            for (var i = 0; i < recCount; i = i + 3) {
                j = recCount < (i + 3) ? recCount : (i + 3);
                finalrows.push(
                   
                    <CardDeck >
                        
                       
                            {this.props.rows.slice(i, j)};
                           
                            </CardDeck>
                       
                       
                         )
                        } 

                         
                        }
                        return (
            <div className="row">
                <div className="container-fluid decor_bg" >
                    <div className="panel panel-primary">
                        <div className="container-fluid panel-heading"><h4>Search Results</h4></div>
                        <div className="panel-body">
                           
                            {recCount == 0 ?
                                 <div className="col-lg-5"> <h2> {recCount} course(s) found </h2> </div>
                                 :
                                <div>
                                    <div className="row">
                                        <div className="col-lg-5"> <h2> {recCount} course(s) found </h2> </div>
                                
                                        </div>
                                    {finalrows}


                                    

                                </div>
                            }
                    </div> </div> </div>  </div>
        );
    }
}
export default CourseTableWithoutPaginationWithCard;