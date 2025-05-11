import { IoCloseSharp,IoColorPaletteSharp } from "react-icons/io5";
import { BsEmojiSmile } from "react-icons/bs";
import { useState } from "react";

const bg_colors = ['#f44336','#e91e63','#9c27b0','#673ab7','#3f51b5','#2196f3','#009688','#4caf50','#8bc34a','#cddc39','#ffeb3b','#795548','#607d8b']

export const Text_status = ({set_status_type})=> {

    const [bg_color,set_bg_color] = useState('#f44336');
    const [is_color,set_is_color] = useState(false);

    const Color_picker = ()=> {
        return (
            <div className=" absolute right-0 top-full z-40">
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
        <div style={{backgroundColor: bg_color}} className={`fixed z-40 left-0 top-0 w-dvw h-dvh  p-3`}>
            <div className="flex items-center justify-between">
                <button onClick={()=> set_status_type(null)} className="">
                    <IoCloseSharp size={26} />
                </button>
                <div className="flex items-center gap-3">
                    <button>
                        <BsEmojiSmile size={26}  />
                    </button>
                    <div className=" relative">
                        <button onClick={()=>set_is_color(!is_color)}>
                            <IoColorPaletteSharp size={26}  />
                        </button>
                        {
                            is_color && 
                            <Color_picker />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}