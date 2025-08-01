import React, { useEffect, useState } from 'react';

const Ratings = ({ stats, year }) => {
    const [ratings, setRatings] = useState([]);
    const [totalRatings, setTotalRatings] = useState(0);

    const getData = async () => {
        const yearratings = stats;

        if(yearratings){
            var total = 0;

            yearratings.forEach(rating => {
                total += rating.count;
            })

            var ratingsArray = {
                5: 0,
                4: 0,
                3: 0,
                2: 0,
                1: 0
            }

            for(var i = 5; i > 0; i--){
                yearratings.forEach(rating => {
                    if(parseInt(rating.rating) === i){
                        ratingsArray[i] = rating.count
                    }
                });
            }

            setRatings(Object.entries(ratingsArray));
            setTotalRatings(total);
        }
    }

    useEffect(() => {
        getData();
    }, [stats])

    return (
        <React.Fragment>
            <div className="ratings">
                <span className="block_name">Ratings</span>
                <table className="ratingstable responsive nowrap" width="100%">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>percentage</th>
                            <th>aantal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ratings.map((rating, i) => {
                            var ratingstars = '';
                            var rating_percentage = rating[1] / totalRatings * 100;

                            if (rating[0]) {
                                for (var i = 0; i < rating[0]; i++) {
                                    ratingstars += "<i class='fas fa-star'></i>";
                                }
                            }

                            return(
                                <tr key={i}>
                                    <td style={{width: '200px'}} className='book_rating' dangerouslySetInnerHTML={{__html: ratingstars}}></td>
                                    <td style={{width: '257px'}}>
                                        <div className="progress">
                                            <div className="progress-bar" role="progressbar" style={{ width: rating_percentage ? rating_percentage : 0 + '%' }} aria-valuenow={rating_percentage ? rating_percentage : 0} aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </td>
                                    <td>{rating[1]}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </React.Fragment>
    )
}

export default Ratings;