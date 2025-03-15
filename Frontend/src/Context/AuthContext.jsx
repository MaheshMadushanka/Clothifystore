import {  useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { useRouteLoaderData } from "react-router-dom";


const AuthContext=createContext();

export const useAuth=()=>useContext(AuthContext);

export const AuthProvider =({children})=>{
    const [user,setUser]=useState(null);

    useEffect(()=>{
        const storedUser=JSON.parse(localStorage.getItem("user"));
        if(storedUser) setUser(storedUser);
    },[]);

    const login=(useData)=>{
        setUser(useData)
        localStorage.setItem("user",JSON.stringify(useData));
    };

    const logout=()=>{
        setUser(null);
        localStorage.removeItem("user");
    };

    return(
        <AuthContext.Provider value={{user,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
}