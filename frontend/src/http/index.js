import axios from 'axios';

const api = axios.create({
    baseURL:process.env.REACT_APP_API_URL,
    withCredentials:true,
    headers:{
        'Content-Type':'application/json',
        Accept:'application/json'
    }

});


export const sendOtp = (data)=> api.post('/api/sendOtp',data);
export const verifyOtp = (data)=> api.post('/api/verifyOtp',data);
export const activate = (data)=>api.post('/api/activate',data);

export default api;