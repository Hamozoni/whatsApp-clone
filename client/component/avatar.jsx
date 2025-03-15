import Image from "next/image"

export const Avatar = ({user_photo})=> {
    return (
    <div className="cursor-pointer">
        <Image 
            src={user_photo || '/placeholder_avatar.jpg'} 
            width={35} height={35} 
            alt="user photo" 
            className="rounded-full"
         />
    </div>
    )
}