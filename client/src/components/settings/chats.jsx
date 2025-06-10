import { Header } from "./header"
import { OptionBtn } from "./optionBtn"
import { Switch } from "./switch"

export const Chats = ({setActivePage})=> {
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

        </>
    )
}