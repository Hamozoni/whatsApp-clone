import { Header } from "./header";

import { MdKeyboardArrowRight } from "react-icons/md";
const personalInfo = [
    {id: 1, privacyName: 'Last seen and online', selectedOption: 'Everyone'},
    {id: 2, privacyName: 'Profile photo', selectedOption: 'Everyone'},
    {id: 3, privacyName: 'About', selectedOption: 'Everyone'},
    {id: 4, privacyName: 'Status', selectedOption: 'Everyone'},
]
export const Privacy = ({setActivePage})=> {
    return (
        <div className="h-dvh max-h-dvh overflow-x-auto">
            <Header 
                title='Privacy' 
                setActivePage={()=> setActivePage('main')} 
                />
            <section className="p-3">
                <h6 className="text-md text-gray-400 font-medium">Who can see my personal info</h6>
                <div className="my-5">
                    {
                        personalInfo?.map(({id,privacyName,selectedOption})=> (
                            <div key={id} className="flex justify-between cursor-pointer py-3 border-b border-b-gray-800">
                                <div className="">
                                    <h6 className="text-ms">{privacyName}</h6>
                                    <span className="text-xs  text-gray-400">{selectedOption}</span>
                                </div>
                                <div className="text-gray-400">
                                   <MdKeyboardArrowRight size={24}/>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <section className="">
                    <h6 className="text-ms mb-3">Read receipts</h6>
                    <div className="flex justify-between">
                        <p className="text-xs  text-gray-400">
                            If turned off, you won't send or receive read receipts. Read receipts are always sent for group chats.
                        </p>
                        <div className="">
                            <span></span>
                        </div>
                    </div>
                </section>
            </section>
        </div>
    )
}