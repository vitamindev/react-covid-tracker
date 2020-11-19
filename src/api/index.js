import Axios from "axios"

export const fetchCountriesData = () => {
    return Axios
        .get('https://corona-api.com/countries')
        .then(response => {
            return response.data.data.sort((a, b) => {
                return (a.latest_data.confirmed > b.latest_data.confirmed) 
                    ? -1 
                    : (a.latest_data.confirmed < b.latest_data.confirmed 
                        ? 1 
                        : 0
                        );
        });
    });
}

export const fetchCountryData = (code) => {
    return Axios
        .get(`https://corona-api.com/countries/${code}`)
        .then(response => response.data.data);
}

export const fetchTimelineData = () => {
    return Axios
        .get('https://corona-api.com/timeline')
        .then(response => response.data.data);
}