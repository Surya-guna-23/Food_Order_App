import { useState,useCallback, useEffect } from "react"

async function sendHttpRequest(url,config){
    const response = await fetch(url,config)
    const resdata = await response.json()
    if(!response.ok){
        throw new Error(
            resdata.message|| 'something went wrong not able to send request '
        )
    }
    return resdata
}

export default function useHttp(url,config,initialdata){
    const [data,setdata]= useState(initialdata)
    const [isloading , setloading] = useState(false);
    const [error,seterror ]= useState();


    function cleardata(){
        setdata(initialdata)
    }
    const sendRequest = useCallback(async function sendRequest(data){
        setloading(true);
        try{
            const resdata = await sendHttpRequest(url,{...config,body:data});
            setdata(resdata)
        }catch(error){
            seterror(error.message || 'something went wrong')
        }
        setloading(false)
    },[url,config])

    useEffect(()=>{
        if(config&&(config.method==='GET'||!config.method)||!config) {
            sendRequest()
        }
    },[sendRequest,config]);
    return{
        data,
        isloading,
        error,
        sendRequest,
        cleardata
    };
}