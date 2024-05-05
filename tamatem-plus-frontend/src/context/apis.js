import React, {createContext, useState, useEffect } from 'react';
import  { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import cookie from 'react-cookies';
export const ApiContext = createContext(null)

const ApiContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const apiUrl = process.env.REACT_APP_API_URL;

    const signIn = async (userName, password) => {
        try {
            await axios.post(`${apiUrl}login/`, {
                username: userName,
                password: password
            }).then(res => {
                validToken(res.data);
            })
            return true
        } catch (error) {
            console.error(`Error occurred while signing in: ${error}`);
            return false;
        }
    }

    const validToken = (user) => {
        if (user) {
            const validUser = jwtDecode(user.access);
            if (validUser) {
                setIsLoggedIn(true);
                cookie.save('token', user.access);
            } else {
                setIsLoggedIn(false);
            }
        } else {
            setIsLoggedIn(false);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        const data = cookie.load('token');
        if (data) {
            setIsLoggedIn(true);
        }
        setIsLoading(false);
    }, []);

    const getToken = () => cookie.load('token');

    const state = {
        signIn,
        isLoggedIn,
        setIsLoggedIn,
        isLoading,
        getToken,
    }

    return (
        <ApiContext.Provider value={state}>
            {props.children}
        </ApiContext.Provider>
    )
}
export default ApiContextProvider