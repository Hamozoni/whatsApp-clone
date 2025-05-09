
import { TbLibraryPhoto } from "react-icons/tb";
import { LiaPencilAltSolid } from "react-icons/lia";
export const Update_status_model = ()=> {
    return (
        <div className="">
            <button className="flex items-center gap-3 rounded-xl ">
                <TbLibraryPhoto /> <span>Photos & videos</span>
            </button>
            <button className="flex items-center gap-3 rounded-xl ">
                <LiaPencilAltSolid /> <span>Text</span>
            </button>
        </div>
    )
}