import { Header } from "./header";

import { MdKeyboardArrowRight } from "react-icons/md";
import { Switch } from "./switch";

const personalInfo = [
    {id: 1, privacyName: 'Last seen and online', selectedOption: 'Everyone'},
    {id: 2, privacyName: 'Profile photo', selectedOption: 'Everyone'},
    {id: 3, privacyName: 'About', selectedOption: 'Everyone'},
    {id: 4, privacyName: 'Status', selectedOption: 'Everyone'},
];

const OptionBtn = ({privacyName,selectedOption})=> {
    return (
            <div className="flex justify-between cursor-pointer py-3 border-b border-b-gray-800">
                <div className="">
                    <h6 className="text-ms">{privacyName}</h6>
                    <span className="text-xs  text-gray-400">{selectedOption}</span>
                </div>
                <div className="text-gray-400">
                <MdKeyboardArrowRight size={24}/>
                </div>
            </div>
        )
};

export const Privacy = ({setActivePage})=> {

    return (
        <>
            <Header 
                title='Privacy' 
                setActivePage={()=> setActivePage('main')} 
                />
            <div className="flex-1 max-h-full overflow-y-auto p-3 flex flex-col gap-8">
                <section >
                    <h6 className="text-md text-gray-400 font-medium">
                        Who can see my personal info
                    </h6>
                    <div className="my-5">
                        {
                            personalInfo?.map(({id,privacyName,selectedOption})=> (
                                <OptionBtn 
                                    key={id}
                                    privacyName={privacyName} 
                                    selectedOption={selectedOption} 
                                    />
                            ))
                        }
                    </div>
                    <Switch 
                        title='Read receipts' 
                        desc="If turned off, you won't send or receive read receipts. Read receipts are always sent for group chats." 
                        isOn={false}
                        setIsOn={()=> ''}
                        />
                </section>
                <section>
                    <h6 className="text-md text-gray-400 font-medium mb-3">
                        Disappearing messages
                    </h6>
                    <div className="">
                    <OptionBtn 
                        privacyName='Defualt mesage timer' 
                        selectedOption='off' 
                        />
                    </div>
                </section>
                <section>
                    <h6 className="text-md text-gray-400 font-medium mb-3">
                        Advanced
                    </h6>
                    <div className="mb-3">
                        <OptionBtn 
                            privacyName='Defualt mesage timer' 
                            selectedOption='Off' 
                            />
                    </div>
                    <Switch 
                        title='Block unknown account messages'
                        desc="To protect your account and improve device performance, WhatsApp will block messages from unknown accounts if they exceed a certain volume."
                        setIsOn={()=> ''}
                      />
                </section>
            </div>
        </>
    )
}