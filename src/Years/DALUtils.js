import axios from 'axios';

/**
 * Api url address.
 * @type {string}
 */
const apiUrl = `http://www.soft.server/years`;

/**
 * Returns year data
 *
 * @param year
 * @returns {Promise<string>}
 */
let getYearData = (year) =>
{
    return Promise.resolve(year)
        .then( (year) =>
        {
            let yearData = localStorage.getItem(`yearData${year}`);
            if (yearData !== null) {
                return Promise.resolve(yearData);
            }
            return axios.get(`${apiUrl}/${year}`)
                .then(response =>
                {
                    localStorage.setItem(`yearData${year}`,response.data.data);
                    return Promise.resolve(response.data.data);
                })
        }
    )
};

/**
 * Returns list of years
 * @returns {Promise<AxiosResponse<T>>}
 */
let getYearsList = () =>
{
    localStorage.clear();
    return axios.get(apiUrl);
};

export default {getYearData,getYearsList};