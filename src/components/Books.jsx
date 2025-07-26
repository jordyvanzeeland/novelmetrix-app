import React, { useEffect } from 'react';
import { initChart } from "./Charts.jsx";

const Books = ({ stats, year }) => {
    const getData = async () => {
        const yearbooks = stats;

        if(yearbooks){
            initChart(yearbooks, parseInt(year));
        }
    }

    useEffect(() => {
        getData();
    }, [stats]);

    return (
        <React.Fragment>
            <div className="books-per-month">
                <span className="block_name">Boeken per maand per genre</span>
                <canvas id="chart"></canvas>
            </div>
        </React.Fragment>
    )
}

export default Books;