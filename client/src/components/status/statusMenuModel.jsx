
import { TbLibraryPhoto } from "react-icons/tb";
import { LiaPencilAltSolid } from "react-icons/lia";
import { FaRegFileVideo } from "react-icons/fa6";

export const StatusMenuModel = ({setFile,setStatusType})=> {

    const handleFile = (e)=> {
        if(e.target.files) {
            setFile(e.target.files[0]);
            if(e.target.files[0].type.startsWith('video')) {
                setStatusType('video')
            }else if (e.target.files[0].type.startsWith('image')) {
                setStatusType('image')
            }
        }
    }

    return (
        <div className="w-[280px] absolute border border-[#153342] -bottom-full left-3 z-40 bg-[#04141d] rounded-lg p-3">
            <button className="w-full">
                <label 
                    htmlFor="status_photo" 
                    className="w-full flex items-center gap-3 rounded-lg p-2 hover:bg-[#1b252b] cursor-pointer border border-transparent hover:border-gray-700">
                    <TbLibraryPhoto size={24} /> 
                    <span className="text-sm text-gray-300">Photos</span>
                    <input onChange={handleFile} type="file" accept="image/*" id="status_photo" hidden />
                </label>
                
            </button>
            <button className="w-full">
               <label 
                    htmlFor="status_video" 
                    className="w-full flex items-center gap-3 rounded-xl p-2 hover:bg-[#252c30] cursor-pointer">
                   <FaRegFileVideo  size={24}  /> <span>Videos</span>
                   <input onChange={handleFile} type="file" accept="video/*" id="status_video" hidden />
                </label> 
            </button>
            <button onClick={()=> setStatusType('text')} className="w-full flex items-center gap-3 rounded-xl p-2 hover:bg-[#252c30] ">
                <LiaPencilAltSolid  size={24}  /> <span>Text</span>
            </button>
        </div>
    )
}