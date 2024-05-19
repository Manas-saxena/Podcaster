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


//interceptors
api.interceptors.response.use((config)=>{
    return config
},async (error)=>{   
    const orignialReq = error.config;

    if(error.response.status === 401 && !orignialReq?._isRetry){
        orignialReq._isRetry= true;

        try {
            await axios.get(`${process.env.REACT_APP_API_URL}/api/refresh`,{
                withCredentials:true
            });
            return await api.request(orignialReq);
        } catch (error) {
            console.log(error.nessage)
        }
    }
    throw error 
})

export default api;