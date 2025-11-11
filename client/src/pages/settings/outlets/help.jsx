import { Header } from "../components/header";

import { TbHelpTriangle } from "react-icons/tb";
import { MdOutlineContactSupport } from "react-icons/md";
import { FaRegFileAlt } from "react-icons/fa";
import { GrHelpBook } from "react-icons/gr";
import { IconTextBtn } from "../ui/iconTextBtn";
import { Switch } from "../components/switch";

let helpOptions = [
    {id: 1, title: 'help center', Icon : TbHelpTriangle},
    {id: 2, title: 'contact us', Icon : MdOutlineContactSupport},
    {id: 3, title: 'terms and privacy policy', Icon : GrHelpBook},
    {id: 4, title: 'Channels reports', Icon : FaRegFileAlt},
]

export const Help = ({setActivePage})=> {
    return (
        <>
         <Header 
            title='Help' 
            setActivePage={()=> setActivePage('main')} 
            />
            <div className="mb-5 p-3 pb-6 border-b border-b-gray-800">
                {
                    helpOptions?.map(({id,title,Icon})=> (
                        <IconTextBtn 
                            key={id} 
                            text={title} 
                            Icon={Icon} 
                            onClick={()=> ''} 
                            />
                    ))
                }
            </div>
            <div className="my-5 p-6 pt-3 border-b border-b-gray-800">
                <Switch 
                    title='Join the beta' 
                    desc="Get new features before they released. Report bugs using the contact us form above."
                     />
            </div>
            
        </>
    )
}