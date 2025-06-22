import { useContext } from "react"
import { SettingsContext } from "../../contexts/settings.context"

export const Theme = ()=> {

    const {theme,setTheme} = useContext(SettingsContext);
    return (
        <div className="">
            <header>
                <h5>theme</h5>
            </header>
            <div className="">
                <div className="">
                    <button></button>
                    <h6>light</h6>
                </div>
                <div className="">
                    <button></button>
                     <h6>dark</h6>
                </div>
                <div className="">
                    <button></button>
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