import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import reportWebVitals from './reportWebVitals';
import FilterCourseTable from './components/coursepage/FilterCourseTable.js';

const COURSES = [
    { category: 'Management', name: 'Principles of Management', credits: '7', duration: '39', tot_seats: '30', rem_seats: '4', start_date: '10-05-2021', end_date: '18-06-2021' },
    { category: 'Management', name: 'Business Economics', credits: '6', duration: '87', tot_seats: '30', rem_seats: '11', start_date: '15-04-2021', end_date: '11-07-2021' },
    { category: 'Management', name: 'Personnel Management & Industry Relations', credits: '4', duration: '31', tot_seats: '10', rem_seats: '3', start_date: '02-01-2021', end_date: '02-02-2021' },
    { category: 'Management', name: 'Business Laws', credits: '5', duration: '60', tot_seats: '10', rem_seats: '2', start_date: '02-03-2021', end_date: '01-05-2021' },
    { category: 'Management', name: 'Introduction to Sociology', credits: '7', duration: '36', tot_seats: '10', rem_seats: '2', start_date: '06-02-2021', end_date: '14-03-2021' },
    { category: 'Management', name: 'Essentials of Marketing', credits: '4', duration: '51', tot_seats: '30', rem_seats: '2', start_date: '11-03-2021', end_date: '01-05-2021' },
    { category: 'Management', name: 'MIS / Systems Design', credits: '5', duration: '66', tot_seats: '30', rem_seats: '2', start_date: '02-11-2020', end_date: '07-01-2021' },
    { category: 'Management', name: 'Strategy', credits: '7', duration: '73', tot_seats: '10', rem_seats: '3', start_date: '27-04-2021', end_date: '09-07-2021' },
    { category: 'Management', name: 'Sales & Distribution Management', credits: '6', duration: '88', tot_seats: '20', rem_seats: '4', start_date: '20-03-2021', end_date: '16-06-2021' },
    { category: 'Management', name: 'Manufacture Planning and Control', credits: '1', duration: '72', tot_seats: '20', rem_seats: '2', start_date: '03-05-2021', end_date: '14-07-2021' },
    { category: 'Management', name: 'E-Commerce', credits: '1', duration: '50', tot_seats: '10', rem_seats: '4', start_date: '04-04-2021', end_date: '24-05-2021' },
    { category: 'Technology', name: 'Data Science', credits: '3', duration: '80', tot_seats: '20', rem_seats: '8', start_date: '24-01-2021', end_date: '14-04-2021' },
    { category: 'Technology', name: 'Tableau', credits: '8', duration: '70', tot_seats: '30', rem_seats: '7', start_date: '10-04-2021', end_date: '19-06-2021' },
    { category: 'Technology', name: 'Selenium Advanced', credits: '8', duration: '56', tot_seats: '10', rem_seats: '2', start_date: '04-12-2020', end_date: '29-01-2021' },
    { category: 'Technology', name: 'Introduction to AWS Cloud Computing', credits: '9', duration: '47', tot_seats: '10', rem_seats: '2', start_date: '13-04-2021', end_date: '30-05-2021' },
    { category: 'Technology', name: 'Introduction to Google Cloud Platform ', credits: '4', duration: '45', tot_seats: '30', rem_seats: '2', start_date: '03-02-2021', end_date: '20-03-2021' },
    { category: 'Technology', name: 'Introduction to HTML5', credits: '6', duration: '40', tot_seats: '30', rem_seats: '10', start_date: '17-11-2020', end_date: '27-12-2020' },
    { category: 'Technology', name: 'Interactivity with Java Script', credits: '2', duration: '35', tot_seats: '20', rem_seats: '4', start_date: '07-02-2021', end_date: '14-03-2021' },
    { category: 'Technology', name: 'Django for Everybody', credits: '8', duration: '58', tot_seats: '20', rem_seats: '1', start_date: '22-11-2020', end_date: '19-01-2021' }];
ReactDOM.render(
    <FilterCourseTable courses={COURSES} />,
    document.getElementById('root')
);
/*
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
*/
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
