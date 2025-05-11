
import { TbLibraryPhoto } from "react-icons/tb";
import { LiaPencilAltSolid } from "react-icons/lia";
import { FaRegFileVideo } from "react-icons/fa6";

export const Update_status_model = ({set_file,set_status_type})=> {

    const handle_file = (e)=> {
        if(e.target.files) {
            set_file(e.target.files[0]);
            if(e.target.files[0].type.startsWith('video')) {
                set_status_type('video')
            }else if (e.target.files[0].type.startsWith('image')) {
                set_status_type('image')
            }
        }
    }

    return (
        <div className="w-[200px] absolute -bottom-full left-3 z-20 bg-[#132730] rounded-xl p-2">
            <button className="w-full">
                <label htmlFor="status_photo" className="w-full flex items-center gap-3 rounded-xl p-2 hover:bg-[#252c30] cursor-pointer">
                    <TbLibraryPhoto /> <span>Photos</span>
                    <input onChange={handle_file} type="file" accept="image/*" id="status_photo" hidden />
                </label>
                
            </button>
            <button className="w-full">
               <label htmlFor="status_video" className="w-full flex items-center gap-3 rounded-xl p-2 hover:bg-[#252c30] cursor-pointer">
                   <FaRegFileVideo /> <span>Videos</span>
                   <input onChange={handle_file} type="file" accept="video/*" id="status_video" hidden />
                </label> 
            </button>
            <button onClick={()=> set_status_type('text')} className="w-full flex items-center gap-3 rounded-xl p-2 hover:bg-[#252c30] ">
                <LiaPencilAltSolid /> <span>Text</span>
            </button>
        </div>
    )
}