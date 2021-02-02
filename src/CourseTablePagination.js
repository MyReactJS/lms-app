import React from 'react';
import Pagination from 'react-bootstrap-4-pagination';


class CourseTablePagination extends React.Component
{

    constructor(props) {
        super(props);
        this.state = { currentPage: 1, totalPages: 7 };
        this.refreshTable = this.refreshTable.bind(this);
       
    }
    refreshTable(currentpage)
    {
        this.setState({ currentPage: currentpage});
    }
    render() {
        const recs = Array.from(Array(68).keys());
        const recrows = [];
        const startrec = 10 * this.state.currentPage -10;
        const endrec = startrec + 10;
        recs.map((rec) =>
            recrows.push(<tr> <td> {rec} </td> </tr>))
        var arrrOfRecs = recrows.slice(startrec, endrec);
        return (
         <React.Fragment>   
                <CourseTableWithPagination
                    currentPage={this.state.currentPage} recrows={arrrOfRecs} />
                <CustumPagination totalPages={this.state.totalPages} currentPage={this.state.currentPage}
                    refreshTable={this.refreshTable} />
         </React.Fragment>
        );
    }
}



class CourseTableWithPagination extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentPage: this.props.currentPage,
            
            rectags: this.props.recrows
        };
        
    }

    render() {
        console.log(this.state.rectags);


        return (
            <div>

                <table>
                    <thead>
                        <tr> <th> heading</th> </tr>
                    </thead>
                    <tbody>
                        {this.state.rectags}
                    </tbody>
                </table>
            </div>);
    }
}

class CustumPagination extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let paginationConfig = {
            totalPages: this.props.totalPages,
            currentPage: this.props.currentPage,
            showMax: 5,
            size: "lg",
            threeDots: true,
            prevNext: true,
            onClick: function (page) {
                console.log(page);               
                this.props.refreshTable(page);
            }
        };
        return (
            <Pagination {...paginationConfig} />

        );
    }

}

export default CourseTablePagination;