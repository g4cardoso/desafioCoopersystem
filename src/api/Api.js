import axios from 'axios';

const Api = axios.create({

    baseURL:'https://run.mocky.io/'
})

export default Api;