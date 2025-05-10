
export const Avatar = ({size = 'sm',user_photo})=> {
    return (
    <div className="cursor-pointer">
        <img 
            src={user_photo || '/placeholder_avatar.jpg'} 
            alt="user photo" 
            className={`${size === 'lg' ? 'w-[80px] h-[80px]' : 'w-[40px] h-[40px]'} rounded-full`}
         />
    </div>
    )
}