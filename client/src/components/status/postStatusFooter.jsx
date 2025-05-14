import { IoSend } from "react-icons/io5"
import { SiGradleplaypublisher } from "react-icons/si"


export const PostStatusFooter = ({onClick}) => {
    return (
        <footer className="bg-[#0000003a] h-20 flex items-center justify-between px-3">
            <button className="flex items-center gap-1 bg-[#00000065] py-2 px-6 rounded-3xl">
                <SiGradleplaypublisher size={20} /> <span>Status (Status)</span>
            </button>
            <button onClick={onClick} className="bg-[#14752181] rounded-full p-4">
                <IoSend size={22} />
            </button>
        </footer>
    )
}