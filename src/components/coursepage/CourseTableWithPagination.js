import React from 'react';
import $ from 'jquery'; 
class CourseTableWithPagination extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            
           
            currentPage: 1,
            rowsPerPage: 10,
            upperPageBound: 3,
            lowerPageBound: 0,
            isPrevBtnActive: 'disabled',
            isNextBtnActive: '',
            pageBound: 3
        };
       
            //console.log(this.props.courses);
       
        this.handleClick = this.handleClick.bind(this);
        this.btnDecrementClick = this.btnDecrementClick.bind(this);
        this.btnIncrementClick = this.btnIncrementClick.bind(this);
        this.btnNextClick = this.btnNextClick.bind(this);
        this.btnPrevClick = this.btnPrevClick.bind(this);
        // this.componentDidMount = this.componentDidMount.bind(this);
        this.setPrevAndNextBtnClass = this.setPrevAndNextBtnClass.bind(this);
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.courses.length != this.props.courses.length) {
            this.setState({


                currentPage: 1,
                rowsPerPage: 10,
                upperPageBound: 3,
                lowerPageBound: 0,
                isPrevBtnActive: 'disabled',
                isNextBtnActive: '',
                pageBound: 3
            });
            $("ul li.active").removeClass('active');
            $('ul li#' + this.state.currentPage).addClass('active');
        
            //this.setPrevAndNextBtnClass(this.state.currentPage)
        }
        else {
            $("ul li.active").removeClass('active');
            $('ul li#' + this.state.currentPage).addClass('active');
           // this.setPrevAndNextBtnClass(this.state.currentPage)
        }
    }
    handleClick(event) {
        let listid = Number(event.target.id);
        this.setState({
            currentPage: listid
        });
        $("ul li.active").removeClass('active');
        $('ul li#' + listid).addClass('active');
        this.setPrevAndNextBtnClass(listid);
    }
    setPrevAndNextBtnClass(listid) {
       // console.log("listid: " + listid);
        let totalPage = Math.ceil(this.props.courses.length / this.state.rowsPerPage);
        this.setState({ isNextBtnActive: 'disabled' });
        this.setState({ isPrevBtnActive: 'disabled' });
        //console.log('totalPage > 1 + ' + (totalPage > 1));
        if (totalPage === listid && totalPage > 1) {
            this.setState({ isPrevBtnActive: '' });
          //  console.log('isPrevBtnActive: ' + this.state.isPrevBtnActive);
            //console.log('isNextBtnActive: ' + this.state.isNextBtnActive);
        }
        else if (listid === 1 && totalPage > 1) {

            this.setState({ isNextBtnActive: '' });
            //console.log('isPrevBtnActive: ' + this.state.isPrevBtnActive);

            //console.log('isNextBtnActive: ' + this.state.isNextBtnActive);
        }
        else if (totalPage > 1) {
            this.setState({ isNextBtnActive: '' });
            this.setState({ isPrevBtnActive: '' });
            //console.log('isPrevBtnActive: ' + this.state.isPrevBtnActive);
            //console.log('isNextBtnActive: ' + this.state.isNextBtnActive);

        }
    }
    btnIncrementClick() {
        this.setState({ upperPageBound: this.state.upperPageBound + this.state.pageBound });
        this.setState({ lowerPageBound: this.state.lowerPageBound + this.state.pageBound });
        let listid = this.state.upperPageBound + 1;
        this.setState({ currentPage: listid });
        this.setPrevAndNextBtnClass(listid);
    }
    btnDecrementClick() {
        this.setState({ upperPageBound: this.state.upperPageBound - this.state.pageBound });
        this.setState({ lowerPageBound: this.state.lowerPageBound - this.state.pageBound });
        let listid = this.state.upperPageBound - this.state.pageBound;
        this.setState({ currentPage: listid });
        this.setPrevAndNextBtnClass(listid);
    }
    btnPrevClick() {
        if ((this.state.currentPage - 1) % this.state.pageBound === 0) {
            this.setState({ upperPageBound: this.state.upperPageBound - this.state.pageBound });
            this.setState({ lowerPageBound: this.state.lowerPageBound - this.state.pageBound });
        }
        let listid = this.state.currentPage - 1;
        this.setState({ currentPage: listid });
        this.setPrevAndNextBtnClass(listid);
    }
    btnNextClick() {
        if ((this.state.currentPage + 1) > this.state.upperPageBound) {
            this.setState({ upperPageBound: this.state.upperPageBound + this.state.pageBound });
            this.setState({ lowerPageBound: this.state.lowerPageBound + this.state.pageBound });
        }
        let listid = this.state.currentPage + 1;
        this.setState({ currentPage: listid });
        this.setPrevAndNextBtnClass(listid);
    }
    render() {
        if (this.props.courses == null)
            return null;
        var recCount =  this.props.courses.length;
        var {  currentPage, rowsPerPage, upperPageBound, lowerPageBound, isPrevBtnActive, isNextBtnActive } = this.state;
        // Logic for displaying current rowss
        const indexOfLastRow = currentPage * rowsPerPage;
        const indexOfFirstRow = indexOfLastRow - rowsPerPage;
        const currentRow = this.props.courses.slice(indexOfFirstRow, indexOfLastRow);

        const renderRows = currentRow.map((rows) => {
            return rows;
        });

        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.props.courses.length / rowsPerPage); i++) {
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
            if (number === 1 && currentPage === 1) {
                return (
                    <li key={number} className='active' id={number}><a href='#' id={number} onClick={this.handleClick}>{number}</a></li>
                )
            }
            else if ((number < upperPageBound + 1) && number > lowerPageBound) {
                return (
                    <li key={number} id={number}><a href='#' id={number} onClick={this.handleClick}>{number}</a></li>
                )
            }
        });
        let pageIncrementBtn = null;
        if (pageNumbers.length > upperPageBound) {
            pageIncrementBtn = <li className=''><a href='#' onClick={this.btnIncrementClick}> &hellip; </a></li>
        }
        let pageDecrementBtn = null;
        if (lowerPageBound >= 1) {
            pageDecrementBtn = <li className=''><a href='#' onClick={this.btnDecrementClick}> &hellip; </a></li>
        }
        let renderPrevBtn = null;
        if (isPrevBtnActive == 'disabled') {
            renderPrevBtn = <li className={isPrevBtnActive}><span id="btnPrev"> Prev </span></li>
        }
        else {
            renderPrevBtn = <li className={isPrevBtnActive}><a href='#' id="btnPrev" onClick={this.btnPrevClick}> Prev </a></li>
        }
        let renderNextBtn = null;
        if (isNextBtnActive == 'disabled') {
            renderNextBtn = <li className={isNextBtnActive}><span id="btnNext"> Next </span></li>
        }
        else {
            renderNextBtn = <li className={isNextBtnActive}><a href='#' id="btnNext" onClick={this.btnNextClick}> Next </a></li>
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
                                    <div className="col-lg-7 text-right">
                                    <ul id="page-numbers" className="pagination">
                                            {renderPrevBtn}
                                            {pageDecrementBtn}
                                            {renderPageNumbers}
                                            {pageIncrementBtn}
                                            {renderNextBtn}
                                        </ul>
                                        </div>
                                        </div>
                                    <table className="table table-bordered table-hover">
                                        <thead >
                                            <tr id='courserow' className="bg-primary">
                                                <th scope="col">Course Id</th>
                                                <th scope="col">Session Id</th>
                                                <th scope="col">Category</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Start Date</th>
                                                <th scope="col">End Date</th>
                                                <th scope="col">Duration (days)</th>
                                                <th scope="col">Credits</th>
                                                <th scope="col">Remaining Seats</th>
                                                <th scope="col">Enroll/Cancel</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {renderRows}
                                        </tbody>
                                    </table>
                                    

                                </div>
                            }
                    </div> </div> </div>  </div>
        );
    }
}
export default CourseTableWithPagination;