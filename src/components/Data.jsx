export const getReadingYears = () => {
    return fetch('https://novelmetrix-api.jordyvanzeeland.nl/years', {
        "method": "GET",
    })
        .then(response => response.json())
        .then(data => {
            return data
        })
}

export const getBooksPerYearPerGenres = (year) => {
    return fetch('https://novelmetrix-api.jordyvanzeeland.nl/stats/books/permonth', {
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
    return fetch('https://novelmetrix-api.jordyvanzeeland.nl/stats/books/genres', {
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
    return fetch('https://novelmetrix-api.jordyvanzeeland.nl/stats/books/ratings', {
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
    return fetch('https://novelmetrix-api.jordyvanzeeland.nl/stats/books/en', {
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