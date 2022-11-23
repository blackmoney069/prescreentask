import axios from "axios";
import React, { useEffect, useState } from "react";


async function fetchData(setUser){
    try{
        const response = await axios.get("https://random-data-api.com/api/users/random_user?size=3")
        setUser(response.data)
    }catch(error){
        console.log(error)
    }
}

export const FetchingAPI = ()=>{
    const [users, setUser] = useState(1)
    useEffect(()=>{
        fetchData(setUser);
    },[])
    console.log(users)
    return(
        <></>
    );
}