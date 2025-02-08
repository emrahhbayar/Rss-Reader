import React, { createContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

export const Context = createContext();

function RssContext({ children }) {
    const [rssList, setRssList] = useLocalStorage([], "rssList");
    return (

        <Context.Provider value={{ rssList, setRssList }}>
            {children}
        </Context.Provider>
    )
}

export default RssContext