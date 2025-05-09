
import { TbLibraryPhoto } from "react-icons/tb";
import { LiaPencilAltSolid } from "react-icons/lia";
export const Update_status_model = ()=> {
    return (
        <div className="w-[200px] absolute -bottom-full left-3 z-20 bg-[#132730] rounded-xl p-2">
            <button className="w-full flex items-center gap-3 rounded-xl p-2 hover:bg-[#252c30]">
                <TbLibraryPhoto /> <span>Photos & videos</span>
            </button>
            <button className="w-full flex items-center gap-3 rounded-xl p-2 hover:bg-[#252c30] ">
                <LiaPencilAltSolid /> <span>Text</span>
            </button>
        </div>
    )
}