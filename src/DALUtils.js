import axios from 'axios';

/**
 * Api url address.
 * @type {string}
 */
const apiUrl = `http://www.soft.test/years`;

/**
 * Returns year data
 * @param year
 * @returns {Promise<AxiosResponse<T>>}
 */
let getYearData = (year) =>
{
    return axios.get(`${apiUrl}/${year}`)
};

/**
 * Returns list of years
 * @returns {Promise<AxiosResponse<T>>}
 */
let getYearsList = () =>
{
    return axios.get(apiUrl);
};

export default {getYearData,getYearsList};