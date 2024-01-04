import axios from 'axios'
import { APIAmazon, APIURLAVENTAS, APIURLPROXY } from '../Constants/Api'

export const ReqRequestApiAventas = axios.create({
    baseURL: APIURLAVENTAS,
    headers:{
        'accept': 'application/json',
        'Content-Type':'application/json'
    }
})
export const ReqRequestApiProxy = axios.create({
    baseURL: APIURLPROXY,
    headers:{
        'Content-Type':'application/json'
    }
})

export const ReqRequestApiAmazon = axios.create({
    baseURL: APIAmazon,
    /*headers:{
        'accept': 'application/json',
        'Content-Type':'application/json',
        //'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb3ZpbCI6dHJ1ZSwicGFpc0lkIjoyLCJ1c3VhcmlvSWQiOjEsIndlYiI6dHJ1ZX0.W690A2NMXnrtGxITPhAUaA-sDjJstNd8g2NNqmgLzis'
    }*/
})