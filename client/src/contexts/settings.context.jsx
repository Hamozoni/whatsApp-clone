import { createContext, useEffect, useState } from "react"

export const SettingsContext = createContext(null);

export const SettingsContextProvider = ({children})=> {

        const [theme,setTheme] = useState('dark');
    
        useEffect(()=> {
            document.documentElement.classList.toggle('dark',theme === 'dark')
        },[theme]);
    
        const toggleTheme = ()=> {
            setTheme(prev=> prev === 'dark' ? 'light' : 'dark');
        };
    return (
        <SettingsContext.Provider
            value={{
                theme,
                toggleTheme,
            }}
            >
            {children}
        </SettingsContext.Provider>
    )
}