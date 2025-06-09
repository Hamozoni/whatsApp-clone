import { Header } from "./header";
import { Switch } from "./switch";

export const Notifications = ({setActivePage})=> {
    return (
        <>
           <Header title='Notifications' setActivePage={()=> setActivePage('main')} />
            <div className="flex-1 max-h-full overflow-y-auto p-3 flex flex-col gap-8">
                <section>
                     <h6 className="text-md text-gray-400 font-medium">
                        Messages
                    </h6>
                    <br />
                    <div className="flex flex-col gap-5">
                        <div className="mb-5 pb-5 border-b border-b-gray-800">
                            <Switch 
                                title='Message notifications' 
                                desc="Show notifications for new messages"
                                />

                        </div>
                        <Switch 
                            title='Show previews' 
                            />
                        <Switch 
                            title='Show reaction notifications' 
                            />
                         <Switch 
                            title='Background sync' 
                            desc="Get faster performance by syncing messages in the background"
                            />
                         <Switch 
                            title='Incoming sounds' 
                            desc="Play sounds for incoming messages"
                            />
                         <Switch 
                            title='Outgoing sounds' 
                            desc="Play sounds for outgoing messages"
                            />
                    </div>
                </section>
            </div>
        </>
    )
}