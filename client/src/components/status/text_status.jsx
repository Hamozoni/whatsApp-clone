import { IoCloseSharp,IoColorPaletteSharp,IoSend } from "react-icons/io5";
import { BsEmojiSmile } from "react-icons/bs";
import { SiGradleplaypublisher } from "react-icons/si";
import { useState } from "react";

const bg_colors = ['#f44336','#e91e63','#9c27b0','#673ab7','#3f51b5','#2196f3','#009688','#4caf50','#8bc34a','#cddc39','#ffeb3b','#795548','#607d8b']
const font = ['sans','serif']
export const Text_status = ({set_status_type})=> {

    const [bg_color,set_bg_color] = useState('#f44336');
    const [is_color,set_is_color] = useState(false);


    const Color_picker = ()=> {
        return (
            <div className=" absolute right-0 top-full z-40 max-h-[350px] overflow-y-auto">
               {
                bg_colors?.map((color)=> (
                    <button 
                        style={{backgroundColor: color}}  
                        onClick={()=> set_bg_color(color)} 
                        className={`w-8 h-8 rounded-full border-white ${color === bg_color ? 'border-4' : 'border'}`}>
                    </button>
                ))
               } 
            </div>
        )
    }


    return (
        <div style={{backgroundColor: bg_color}} className={`fixed z-40 left-0 top-0 w-dvw h-dvh flex flex-col justify-between`}>
            <header className="flex items-center justify-between p-3">
                <button onClick={()=> set_status_type(null)} className="">
                    <IoCloseSharp size={26} />
                </button>
                <div className="flex items-center gap-3">
                    <button className=" hover:bg-[#00000046] rounded-full p-2">
                        <BsEmojiSmile size={26}  />
                    </button>
                    <button className=" hover:bg-[#00000046] rounded-full w-10 h-10 text-3xl">
                        T
                    </button>
                    <div className=" relative">
                        <button className=" hover:bg-[#00000046] rounded-full p-2" onClick={()=>set_is_color(!is_color)}>
                            <IoColorPaletteSharp size={26}  />
                        </button>
                        {
                            is_color && 
                            <Color_picker />
                        }
                    </div>
                </div>
            </header>
            <div className="p-3 flex items-center justify-center">
                <p className="text-6xl text-[#999] font-serif">Type a status</p>
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