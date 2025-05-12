import { IoCloseSharp,IoColorPaletteSharp,IoSend } from "react-icons/io5";
import { BsEmojiSmile } from "react-icons/bs";
import { SiGradleplaypublisher } from "react-icons/si";
import { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { Close_model } from "../ui/close_model";

const bg_colors = ['#f44336','#e91e63','#9c27b0','#673ab7','#3f51b5','#2196f3','#009688','#4caf50','#8bc34a','#cddc39','#ffeb3b','#795548','#607d8b']
const font_families = [
    "Arial, sans-serif",           
    "'Dancing Script', cursive",   
    "'Courier New', monospace",     
    "'Roboto', sans-serif",       
    "'Pacifico', cursive" 
  ];

let font_index = 0;


export const Text_status = ({set_status_type})=> {

    const [bg_color,set_bg_color] = useState('#f44336');
    const [is_color,set_is_color] = useState(false);
    const [font,set_font] = useState(font_families[font_index]);
    const [text,set_text] = useState('');
    const [show_emoji,set_show_emoji] = useState(false)


    const Color_picker = ()=> {
        return (
            <div className=" absolute flex items-center gap-2 right-0 top-full z-50 max-w-screen overflow-x-auto px-3">
               {
                bg_colors?.map((color)=> (
                    <button 
                        style={{backgroundColor: color}}  
                        onClick={()=> set_bg_color(color)} 
                        className={`w-8 h-8 min-w-8 rounded-full border-white ${color === bg_color ? 'border-4' : 'border'}`}>
                    </button>
                ))
               } 
            </div>
        )
    };

    const handle_emoji = (emojiObject)=> {
        set_text(prev=> `${prev} ${emojiObject.emoji}`);
    };


    const handle_font = ()=> {
        if(font_index < font_families.length) {
            set_font(font_families[font_index + 1])
            font_index += 1;
        }else {
            set_font(font_families[0])
            font_index = 0
        }
    }


    return (
        <div style={{backgroundColor: bg_color}} className={`fixed z-50 left-0 top-0 w-dvw h-dvh flex flex-col justify-between`}>
            <header className="flex items-center justify-between p-3">
                <button onClick={()=> set_status_type(null)} className="">
                    <IoCloseSharp size={26} />
                </button>
                <div className="flex items-center gap-3">
                    <div className=" relative">
                        <button 
                            onClick={()=> set_show_emoji(!show_emoji)} 
                            className=" hover:bg-[#00000046] rounded-full p-2"
                            >
                            <BsEmojiSmile size={26}  />
                        </button>
                        { show_emoji  &&
                        <>
                            <div className=" fixed top-10 right-3  z-50">
                                <EmojiPicker onEmojiClick={handle_emoji} />
                            </div>
                            <Close_model  set_model={set_show_emoji}/>
                        </>
                        }

                    </div>
                    <button 
                        onClick={ handle_font} 
                        style={{fontFamily:font}} 
                        className=" hover:bg-[#00000046] rounded-full w-10 h-10 text-3xl"
                        >
                        T
                    </button>
                    <div className=" relative">
                        <button 
                            className=" hover:bg-[#00000046] rounded-full p-2" 
                            onClick={()=>set_is_color(!is_color)}
                            >
                            <IoColorPaletteSharp size={26}  />
                        </button>
                        {
                            is_color && 
                            <>
                               <Color_picker />
                               <Close_model  set_model={set_is_color}/>
                            </>
                        }
                    </div>
                </div>
            </header>
            <div className="p-3 flex items-center justify-center relative">
                 <textarea 
                    value={text} 
                    onChange={(e)=> set_text(e.target.value)}  
                    style={{fontFamily:font}}
                     
                    className={`p-3 text-2xl md:text-6xl text-white outline-0 resize-none  ${text?.length === 0 && 'absolute top-0 left-0'} w-full`}
                    />
                <p style={{fontFamily:font}} className={`text-2xl md:text-6xl text-white`}>{text?.length === 0 ? 'Type a status' : ''}</p>
                
            </div>
            <footer className="bg-[#0000003a] h-20 flex items-center justify-between px-3">
                <button className="flex items-center gap-1 bg-[#00000065] py-2 px-6 rounded-3xl">
                    <SiGradleplaypublisher size={20} /> <span> Status (Status)</span>
                </button>
                <button className="bg-[#14752181] rounded-full p-4">
                    <IoSend size={22} />
                </button>

            </footer>
        </div>
    )
}