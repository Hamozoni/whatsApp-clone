import { useContext } from "react";
import { SettingsContext } from "../../contexts/settings.context";

export const Theme = ({setIsTheme})=> {

    const {theme,setTheme} = useContext(SettingsContext);

    const ThemeBtn = ({name})=> {
        return (
            <div onClick={()=> setTheme(name)}  className="flex gap-3 items-center cursor-pointer">
                <div className="rounded-full w-5 border-2 h-5 border-emerald-500 ">
                    {
                        theme === name && (
                            <div 
                                className="min-w-4 w-4 h-4 rounded-full border-3 border-neutral-900 bg-emerald-500">
                            </div>
                        )
                    }
                </div>
                <span className=" capitalize">
                    {name}
                </span>
            </div>
        )
    };

    return (
        <div className="fixed z-50 left-1/2 top-1/2 w-[380px] max-w-screen -translate-1/2 rounded-lg bg-neutral-900 p-5">
            <header >
                <h5>theme</h5>
            </header>
            <div className="flex flex-col gap-6 my-5">
                 <ThemeBtn name='light' />
                 <ThemeBtn name='dark' />
                 <ThemeBtn name='system default' />
            </div>
            <footer className="flex items-center justify-end gap-5">
                <button 
                    onClick={()=> setIsTheme(false)}
                    className="text-gray-400 font-light"
                    >
                    cancel
                </button>
                <button className="bg-emerald-500 rounded-lg px-4 py-1">ok</button>
            </footer>
        </div>
    )
}