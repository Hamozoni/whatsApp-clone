"use client";
import { createContext } from "react";

 

export const Chat_window_context = createContext(null);

export const Chat_window_context_provider = ({chilren})=> {
    return (
        <Chat_window_context.Provider
            value={{}}
        >
            {chilren}
        </Chat_window_context.Provider>
    )
}