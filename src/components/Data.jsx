export const getReadingYears = () => {
    return fetch('http://localhost:8000/api/years', {
        "method": "GET",
    })
        .then(response => response.json())
        .then(data => {
            return data
        })
}

export const getBooksPerYearPerGenres = (year) => {
    return fetch('http://localhost:8000/api/books/permonth', {
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
    return fetch('http://localhost:8000/api/books/genres/count', {
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
    return fetch('http://localhost:8000/api/books/ratings', {
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
    return fetch('http://localhost:8000/api/books/en', {
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