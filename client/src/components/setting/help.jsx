import { Header } from "./header";

import { TbHelpTriangle } from "react-icons/tb";
import { MdOutlineContactSupport } from "react-icons/md";
import { FaRegFileAlt } from "react-icons/fa";
import { GrHelpBook } from "react-icons/gr";
import { IconTextBtn } from "../ui/iconTextBtn";

let helpOptions = [
    {id: 1, title: 'help center', Icon : TbHelpTriangle},
    {id: 2, title: 'contact us', Icon : MdOutlineContactSupport},
    {id: 3, title: 'terms and privacy policy', Icon : GrHelpBook},
    {id: 4, title: 'Channels reports', Icon : FaRegFileAlt},
]

export const Help = ({setActivePage})=> {
    return (
        <>
         <Header title='Help' setActivePage={()=> setActivePage('main')} />
            <div className="">
                {
                    helpOptions?.map(({id,title})=> (
                        <IconTextBtn key={id} text={title} onClick={()=> ''} />
                    ))
                }
            </div>
        </>
    )
}