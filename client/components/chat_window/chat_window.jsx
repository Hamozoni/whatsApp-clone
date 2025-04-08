"use cleint"
import { Chat_window_context } from "@/contexts/chat_window.context";
import { useContext } from "react"
import Active_chat from "./active_chat";
import { Chat_header } from "./chat_header";
import { Message_input } from "./message_input";


export const Chat_window = ()=> {

    const {is_document} = useContext(Chat_window_context);

    return (

            <div className="text-[#f7f8fa] flex-1 hide_model">
                <div className=" h-screen max-h-full flex flex-col hide_model">
                   <Chat_header />
                   {
                      is_document ? ''
                      : <Active_chat />
                   }
                   <Message_input />
                </div>
            </div>
    )
}