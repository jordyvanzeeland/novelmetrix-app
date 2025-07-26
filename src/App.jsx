import React from "react";
import { useState, useEffect } from 'react'
import Genres from "./components/Genres";
import Books from "./components/Books";
import Ratings from "./components/Ratings";
import Languages from "./components/Languages";
import { getReadingYears, getDashStats } from "./components/Data";
import moment from 'moment';
import 'flag-icon-css/css/flag-icons.min.css';
moment.locale('nl');

function App() {
  const currentyear = new Date().getFullYear();
  const [year, setYear] = useState(currentyear);

  const [booksMonth, setBooksMonth] = useState([]);
  const [genres, setGenres] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [readingYears, setReadingYears] = useState([]);

  const getData = async () => {
    const getYears = await getReadingYears();
    const getStats = await getDashStats(year ? year : currentyear);
    setReadingYears(getYears);

    setBooksMonth(getStats.books);
    setGenres(getStats.genres);
    setLanguages(getStats.languages);
    setRatings(getStats.ratings);
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
                        {readingYears.map((data, i) => {
                            return (<option key={i} value={data.year}>{data.year}</option>)
                        })}
                    </select>
                </div>
            </div>

            <div className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6">
                            <Books stats={booksMonth} year={year} />
                        </div>
                        <div className="col-md-3">
                            <Genres stats={genres} year={year} />
                        </div>
                        <div className="col-md-3">
                            <Ratings stats={ratings} year={year} />
                            <Languages stats={languages} year={year} />
                        </div>
                    </div>
                </div>
            </div>
            
        </React.Fragment>
    )
}

export default App