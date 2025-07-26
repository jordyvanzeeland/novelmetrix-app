const ApiUrl = "http://localhost:8000";

export const getReadingYears = () => {
    return fetch(ApiUrl + '/api/years', {
        "method": "GET",
    })
        .then(response => response.json())
        .then(data => {
            return data
        })
}

export const getDashStats = (year) => {
    return fetch(ApiUrl + '/api/books/stats', {
        "method": "GET",
        "headers": {
            "year": year
        }
    })
        .then(response => response.json())
        .then(data => {
            return data
        })
}

export const getBooksPerYearPerGenres = (year) => {
    return fetch(ApiUrl + '/api/books/permonth', {
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
    return fetch(ApiUrl + '/api/books/genres/count', {
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
    return fetch(ApiUrl + '/api/books/ratings', {
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
    return fetch(ApiUrl + '/api/books/en', {
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