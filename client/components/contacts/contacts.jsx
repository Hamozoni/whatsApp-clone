import { MdArrowBack } from "react-icons/md";
import { Search_form } from "../inputs/search_form";
import { useState } from "react";
import { GrGroup,GrUserAdd } from "react-icons/gr";

const Button = ({Icon,text,handle_cleck})=> {

    return (
        <button onClick={handle_cleck} className="cursor-pointer flex items-center gap-3">
             <div className="">
                <Icon />
             </div>
             <div className="flex items-center border border-b-amber-50">
                <h5>{text}</h5>
             </div>
        </button>
    )
};

export const Contacts = ({set_is_contact})=> {

    const [search_value,set_search_value] = useState('');

    return (
        <div className="">
            <header>
                <div className="">
                    <button onClick={()=> set_is_contact(false)}>

                       <MdArrowBack />
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