
import axios from "./axios"

const getData = (r:any)=>r.data

export const sendOrder = (body: any) => axios.post("checkout",body).then(getData).then(response=>{
    console.log(response)
})