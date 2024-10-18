import React, { useEffect, useState } from 'react';

const Languages = (props) => {
    const [languageBooks, setLanguageBooks] = useState([])

    const getData = async () => {
        const [data, charts] = await Promise.all([
            await import("./Data.jsx"),
            await import("./Charts.jsx")
        ]);

        const languagebooks = await data.getLanguagesBooks(props.year)

        if(languagebooks){
            charts.initDoughnut2(languagebooks, props.year);
            setLanguageBooks(languagebooks);
        }
    }

    useEffect(() => {
        getData();
    }, [props.year])

    return (
        <React.Fragment>
            <div className="ratings languages">
                <span className="block_name">Talen</span>
                <table className="ratingstable responsive nowrap" width="100%">
                    <thead>
                        <tr>
                            <th>language</th>
                            <th>count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {languageBooks.map((language, i) => {
                            return (
                            <tr key={i}>
                                <td><span className={`flag-icon flag-icon-${language.lang == 'en' ? 'gb' : language.lang} mx3`} /> {language.name}</td>
                                <td style={{textAlign: 'right'}}>{language.count}</td>
                            </tr>)
                        })}
                    </tbody>
                </table>

                <canvas id="chartLangs"></canvas>
            </div>
        </React.Fragment>
    )
}

export default Languages;