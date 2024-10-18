import React from "react";
import { useState, useEffect } from 'react'
import Genres from "./components/Genres";
import Books from "./components/Books";
import Ratings from "./components/Ratings";
import Languages from "./components/Languages";
import moment from 'moment';
import 'flag-icon-css/css/flag-icons.min.css';
moment.locale('nl');

function App() {
  const currentyear = new Date().getFullYear();
  const [year, setYear] = useState(currentyear);
  const [readingYears, setReadingYears] = useState([]);

  const getData = async () => {
    const data = await import("./components/Data.jsx");
    const getYears = await data.getReadingYears();
    setReadingYears(getYears);
  }

  useEffect(() => {
    getData();
  }, [year]);

  return (
    <React.Fragment>
            <div className="topbar">
                <img className="logo" src="/logo-new.png" />
                <div className="chooseYear">
                    <i className="fas fa-calendar-alt"></i>
                    <select className="yearselector" value={year ? year : currentyear} onChange={(event) => setYear(event.target.value)}>
                        {readingYears.map((year, i) => {
                            return (<option key={i} value={year.name}>{year.name}</option>)
                        })}
                    </select>
                </div>
            </div>
            
            <div className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6">
                            <Books year={year} />
                        </div>
                        <div className="col-md-3">
                            <Genres year={year} />
                        </div>
                        <div className="col-md-3">
                            <Ratings year={year} />
                            <Languages year={year} />
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default App