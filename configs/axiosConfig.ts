import axios from 'axios';
import Config from './config.export';


const baseUrl = Config().baseUrl
axios.defaults.baseURL = baseUrl



export default axios;