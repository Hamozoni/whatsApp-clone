import { createContext } from "react"

export const SettingsContext = createContext(null);

export const settingsContextProvider = ({children})=> {
    return (
        <SettingsContext.Provider>
            {children}
        </SettingsContext.Provider>
    )
}