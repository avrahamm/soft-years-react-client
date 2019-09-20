import axios from 'axios';

const apiUrl = `http://www.soft.test/years`;

let getYearData = (year) =>
{
    // const url = `http://www.soft.test/years`;
    return axios.get(`${apiUrl}/${year}`)
};

let getYearsList = () =>
{
    // const url = `http://www.soft.test/years`;
    return axios.get(apiUrl);
};


export default {getYearData,getYearsList};