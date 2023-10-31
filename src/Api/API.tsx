import axios from 'axios'
import { APIURLAVENTAS, APIURLPROXY } from '../Constants/Api'

export const ReqRequestApiAventas = axios.create({
    baseURL: APIURLAVENTAS,
    headers:{
        'Content-Type':'application/json'
    }
})
export const ReqRequestApiProxy = axios.create({
    baseURL: APIURLPROXY,
    headers:{
        'Content-Type':'application/json'
    }
})