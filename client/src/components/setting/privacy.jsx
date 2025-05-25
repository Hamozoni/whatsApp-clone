import { Header } from "./header";

import { MdKeyboardArrowRight } from "react-icons/md";
const personalInfo = [
    {id: 1, privacyName: 'Last seen and online', selectedOption: 'Everyone'},
    {id: 2, privacyName: 'Profile photo', selectedOption: 'Everyone'},
    {id: 3, privacyName: 'about', selectedOption: 'Everyone'},
    {id: 4, privacyName: 'status', selectedOption: 'Everyone'},
]
export const Privacy = ({setActivePage})=> {
    return (
        <div className="">
            <Header 
                title='Privacy' 
                setActivePage={()=> setActivePage('main')} 
                />
            <section className="">
                <h6>Who can see my personal info</h6>
                <div className="">
                    {
                        personalInfo?.map(({id,privacyName,selectedOption})=> (
                            <div key={id} className="flex justify-between b">
                                <div className="">
                                    <h6>{privacyName}</h6>
                                    <span>{selectedOption}</span>
                                </div>
                                <MdKeyboardArrowRight size={24}/>
                            </div>
                        ))
                    }
                </div>
                <div className="">

                </div>
            </section>
        </div>
    )
}