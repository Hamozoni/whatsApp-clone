import { IoDocumentTextOutline } from "react-icons/io5";
import { 
    MdOutlineAddPhotoAlternate, 
    MdOutlineVideoCall,MdOutlineLinkedCamera,
    MdOutlinePermContactCalendar 
} from "react-icons/md";


const documents = [
    {
        id: 1,
        name: 'document',
        Icon: IoDocumentTextOutline
    },
    {
        id: 2,
        name: 'photos',
        Icon: MdOutlineAddPhotoAlternate
    },
    {
        id: 3,
        name: 'videos',
        Icon: MdOutlineVideoCall
    },
    ,
    {
        id: 4,
        name: 'camera',
        Icon: MdOutlineLinkedCamera
    },
    {
        id: 5,
        name: 'contact',
        Icon: MdOutlinePermContactCalendar
    }
]

export const Chose_document = () => {
    return (
        <div className=" absolute left-0 top-0 -translate-y-[100%] bg-neutral-800 p-3 rounded-md">
            <ul>
                {
                    documents?.map(({id,name,Icon})=> (
                        <li  key={id} className="flex items-center gap-3 text-white">
                            <Icon />
                            <span>{name}</span>
                        </li>
                    ))
                }

            </ul>
        </div>
    )
}