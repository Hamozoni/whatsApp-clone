import { useContext } from "react"
import { SettingsContext } from "../../contexts/settings.context"

export const Theme = ()=> {

    const {theme,setTheme} = useContext(SettingsContext);


    return (
        <div className="fixed z-50 left-1/2 top-1/2 -translate-1/2 rounded-lg bg-gray-800">
            <header>
                <h5>theme</h5>
            </header>
            <div className="">
                <div className="">
                    <button className="rounded-full border-2 border-emerald-500 ">
                        <span className="w-6 h-6 full border-2 border-gray-500 bg-emerald-500"></span>
                    </button>
                    <h6>light</h6>
                </div>
                <div className="">
                    <button className="rounded-full border-2 border-emerald-500 ">
                        <span className="w-6 h-6 full border-2 border-gray-500 bg-emerald-500"></span>
                    </button>
                     <h6>dark</h6>
                </div>
                <div className="">
                    <button className="rounded-full border-2 border-emerald-500 ">
                        <span className="w-6 h-6 full border-2 border-gray-500 bg-emerald-500"></span>
                    </button>
                     <h6>system default</h6>
                </div>
            </div>
            <footer>
                <button>cancel</button>
                <button>ok</button>
            </footer>
        </div>
    )
}