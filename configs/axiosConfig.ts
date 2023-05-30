import axios from 'axios';
import Config from './config.export';
import { useCookies } from 'react-cookie';

const baseUrl = Config().baseUrl
axios.defaults.baseURL = baseUrl
axios.defaults.headers.common["uuid"] = `${localStorage.getItem("uuid")}`;


export default axios;