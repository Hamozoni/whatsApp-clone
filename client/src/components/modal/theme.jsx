import { useContext } from "react"
import { SettingsContext } from "../../contexts/settings.context"

export const Theme = ()=> {

    const {theme,setTheme} = useContext(SettingsContext);


    const ThemeBtn = ({name})=> {
        return (
            <div className="flex gap-3 items-center">
                <div className="rounded-full w-5 border-2 h-5 border-emerald-500 cursor-pointer">
                    <div className="min-w-4 w-4 h-4 rounded-full border-3 border-gray-800 bg-emerald-500"></div>
                </div>
                <span className=" capitalize">
                    {name}
                </span>
            </div>
        )
    }
    return (
        <div className="fixed z-50 left-1/2 top-1/2 w-[380px] max-w-screen -translate-1/2 rounded-lg bg-gray-800 p-5">
            <header >
                <h5>theme</h5>
            </header>
            <div className="flex flex-col gap-5 my-5">
                 <ThemeBtn name='light' />
                 <ThemeBtn name='dark' />
                 <ThemeBtn name='system default<' />
            </div>
            <footer className="flex items-center justify-end gap-5">
                <button>cancel</button>
                <button>ok</button>
            </footer>
        </div>
    )
}