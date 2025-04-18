import React, { useEffect } from 'react';

const Books = (props) => {
    const getData = async () => {
        const [data, charts] = await Promise.all([
            import("./Data.jsx"),
            import("./Charts.jsx")
        ]);

        const yearbooks = await data.getBooksPerYearPerGenres(props.year);
        console.log(yearbooks);

        if(yearbooks){
            charts.initChart(yearbooks, props.year);
        }
    }

    useEffect(() => {
        getData();
    }, [props.year]);

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