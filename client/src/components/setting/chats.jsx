import { Header } from "./header"
import { OptionBtn } from "./optionBtn"

export const Chats = ({setActivePage})=> {
    return (
        <>
           <Header title='Chats' setActivePage={()=> setActivePage('main')} />
            <div className="flex-1 max-h-full overflow-y-auto p-3 flex flex-col gap-8">
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
            </div>

        </>
    )
}