"use client";

import { FaArrowLeftLong } from "react-icons/fa6";
import { Search_form } from "../inputs/search_form";
import { useContext, useState } from "react";
import { GrGroup,GrUserAdd } from "react-icons/gr";
import Image from "next/image";
import { User_context } from "../context";
import { v4 as uuid } from "uuid";
import { Contact_header } from "./contact_header";
import { New_contact } from "./new_contact";

const contacts = [
    {
        _id: 1,
        name: 'Ahmed Hamed',
        email: 'ahmed122@gmail.com',
        profile_picture: '/placeholder_avatar.jpg'
    },
    {
        _id: 2,
        name: 'osama ahmed',
        email: 'osama@gmail.com',
        profile_picture: '/placeholder_avatar.jpg'
    },
    {
        _id: 3,
        name: 'reem mohamed',
        email: 'reemmo@gmail.com',
        profile_picture: '/placeholder_avatar.jpg'
    },
    {
        _id: 4,
        name: 'Ahmed Hamed',
        email: 'ahmed122@gmail.com',
        profile_picture: '/placeholder_avatar.jpg'
    },
    {
        _id: 5,
        name: 'osama ahmed',
        email: 'osama@gmail.com',
        profile_picture: '/placeholder_avatar.jpg'
    },
    {
        _id: 6,
        name: 'reem mohamed',
        email: 'reemmo@gmail.com',
        profile_picture: '/placeholder_avatar.jpg'
    },
    {
        _id: 7,
        name: 'Ahmed Hamed',
        email: 'ahmed122@gmail.com',
        profile_picture: '/placeholder_avatar.jpg'
    },
    {
        _id: 8,
        name: 'osama ahmed',
        email: 'osama@gmail.com',
        profile_picture: '/placeholder_avatar.jpg'
    },
    {
        _id: 10,
        name: 'reem mohamed',
        email: 'reemmo@gmail.com',
        profile_picture: '/placeholder_avatar.jpg'
    },
]

const Button = ({Icon,text,handle_cleck})=> {
    return (
        <button onClick={handle_cleck} className="cursor-pointer flex items-center gap-3 w-full px-3 hover:bg-[#222e35]">
             <div className="p-3 my-2 bg-emerald-600 flex items-center justify-center rounded-full">
                <Icon size={26} />
             </div>
             <div className="flex items-center border-b flex-1 border-b-[#222e35] py-3">
                <h5>{text}</h5>
             </div>
        </button>
    )
};

export const Contacts = ({set_is_contact})=> {

    const {user,set_active_chat} = useContext(User_context);

    const [search_value,set_search_value] = useState('');
    const [is_new_contact,set_is_new_contact] = useState(false);

    const handle_open_chat = (id,name,email,profile_picture) => {
        const new_ative_chat = {
            id: uuid(),
            is_new: true,
            members: [
                {
                    id,
                    name,
                    email,
                    profile_picture,
                    is_online: false
                },
                {
                    id: user?.uid,
                    name: user?.name,
                    email:  user?.email,
                    profile_picture: user?.photoURL,
                    is_online: false
                },

            ]

        };
        set_active_chat(new_ative_chat);
        set_is_contact(false);

    }

    return (
        <div className="h-screen max-h-screen overflow-y-auto">
            {
                is_new_contact ? 
                 <New_contact set_is_new_contact={set_is_new_contact}/>
                 :
                <div className="">
                    <Contact_header 
                        title='new contact' 
                        set_backword={set_is_contact}
                        search_value={search_value}
                        set_search_value={set_search_value}
                        handle_search={()=> ''}
                        />
                    <div className="">
                        <Button Icon={GrGroup} text='new group' handle_cleck={()=> ''} />
                        <Button Icon={GrUserAdd} text='new contact' handle_cleck={()=> set_is_new_contact(true)} /> 

                            <h6 className="px-5 py-3 text-xs text-emerald-300">
                            contacts on whatsapp
                        </h6>
                        <div className="">
                            {
                                contacts?.map(({_id,name,email,profile_picture})=> (
                                    <div 
                                        onClick={()=>handle_open_chat(_id,name,email,profile_picture)}
                                        key={_id} 
                                        className="cursor-pointer flex items-center gap-3 w-full px-3 hover:bg-[#222e35]">
                                        <Image 
                                            className="flex items-center justify-center rounded-full"
                                            src={profile_picture} 
                                            width={50} 
                                            height={50} 
                                            alt="avatar"
                                        />
                                            <div className="flex flex-col border-b flex-1 border-b-[#222e35] py-3">
                                            <h5>{name}</h5>
                                            <span className="text-xs font-light text-gray-400">{email}</span>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                </div>
            }
        </div>
    )
}