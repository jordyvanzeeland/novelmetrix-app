export const getReadingYears = () => {
    return fetch('http://localhost:5000/years', {
        "method": "GET",
    })
        .then(response => response.json())
        .then(data => {
            return data
        })
}

export const getBooksPerYearPerGenres = (year) => {
    return fetch('http://localhost:5000/stats/books/permonth', {
        "method": "GET",
        "headers": {
            "year": year
        }
    })
        .then(response => response.json())
        .then(data => {
            return data;
        })
}

export const getGenresCount = (year) => {
    return fetch('http://localhost:5000/stats/books/genres', {
        "method": "GET",
        "headers": {
            "year": year
        }
    })
        .then(response => response.json())
        .then(data => {
            return data;
        })
}

export const getRatingsCount = (year) => {
    return fetch('http://localhost:5000/stats/books/ratings', {
        "method": "GET",
        "headers": {
            "year": year
        }
    })
        .then(response => response.json())
        .then(data => {
            return data;
        })
}

export const getLanguagesBooks = (year) => {
    return fetch('http://localhost:5000/stats/books/en', {
        "method": "GET",
        "headers": {
            "year": year
        }
    })
        .then(response => response.json())
        .then(data => {
            return data;
        })
}