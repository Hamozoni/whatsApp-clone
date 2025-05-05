
export const Avatar = ({size = 'sm',user_photo})=> {
    return (
    <div className="cursor-pointer">
        <img 
            src={user_photo || '/placeholder_avatar.jpg'} 
            width={size === 'lg' ? 55 : 40} height={size === 'lg' ? 55 : 40} 
            alt="user photo" 
            className="rounded-full"
         />
    </div>
    )
}