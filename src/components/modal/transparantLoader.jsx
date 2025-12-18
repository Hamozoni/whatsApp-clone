import { BeatLoader } from "react-spinners"

export const TransparantLoader = ()=> {
    return (
    <div className="fixed inset-0 bg-[#00000060] flex items-center justify-center z-[80]">
        <BeatLoader color='#fff' />
    </div>
    )
}