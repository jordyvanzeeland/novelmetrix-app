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