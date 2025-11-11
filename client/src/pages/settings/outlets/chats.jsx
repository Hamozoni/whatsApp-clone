import { useState } from "react"
import { Header } from "../components/header"
import { OptionBtn } from "../components/optionBtn"
import { Switch } from "../components/switch"
import { Theme } from "../modal/theme"
import { CloseModel } from "../modal/closeModel"

export const Chats = ({setActivePage})=> {

    const [isTheme,setIsTheme] = useState(false);
    
    return (
        <>
           <Header title='Chats' setActivePage={()=> setActivePage('main')} />
            <div className="flex-1 max-h-full overflow-y-auto p-6 flex flex-col gap-8">
                <section>
                    <h6 className="text-md text-gray-400 font-medium">
                        Display
                    </h6>
                    <br />
                    <OptionBtn 
                        privacyName='Theme'
                        selectedOption='Dark mode' 
                        onClick={()=> setIsTheme(true)}
                      />
                    <OptionBtn 
                         privacyName='Wallpaper'
                      />
                </section>
                <section>
                    <h6 className="text-md text-gray-400 font-medium">
                        Chats settings
                    </h6>
                    <br />
                    <OptionBtn 
                         privacyName='Media upload quality'
                      />
                    <OptionBtn 
                         privacyName='Media auto-download'
                      />
                      <br />
                      <Switch 
                            title='Spell check' 
                            desc="Check spelling while typing" 
                            />
                       <br />
                      <Switch 
                            title='Replace text with emoji' 
                            desc="Emoji will replace specific text as you type"
                             />
                        <br />
                      <Switch 
                        title='Enter is send' 
                        desc="Enter key will send your message" 
                        />
                </section>
            </div>
            {
                isTheme && (
                    <>
                      <CloseModel setCloseModel={setIsTheme} />
                       <Theme  setIsTheme={setIsTheme}/>
                    </>
                )
            }
        </>
    )
}