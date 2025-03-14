import { FaArrowLeftLong } from "react-icons/fa6";
import { Search_form } from "../inputs/search_form";
import { useState } from "react";
import { GrGroup,GrUserAdd } from "react-icons/gr";

const Button = ({Icon,text,handle_cleck})=> {

    return (
        <button onClick={handle_cleck} className="cursor-pointer flex items-center gap-3 w-full p-2">
             <div className="">
                <Icon />
             </div>
             <div className="flex items-center border-b flex-1 border-b-[#1b363f]">
                <h5>{text}</h5>
             </div>
        </button>
    )
};

export const Contacts = ({set_is_contact})=> {

    const [search_value,set_search_value] = useState('');

    return (
        <div className="">
            <header className="p-3">
                <div className="mb-2 flex items-center gap-6">
                    <button className=" cursor-pointer" onClick={()=> set_is_contact(false)}>

                       <FaArrowLeftLong size={22} />
                    </button>
                    <h4>new chat</h4>
                </div>
                <Search_form  value={search_value} set_value={set_search_value} handle_search={_=> ''}/>
            </header>
            <div className="">
                <Button Icon={GrGroup} text='new group' handle_cleck={()=> ''} />
                <Button Icon={GrUserAdd} text='new contact' handle_cleck={()=> ''} />
                
            </div>

        </div>
    )
}