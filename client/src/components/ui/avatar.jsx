
export const Avatar = ({size = 'sm',user_photo})=> {
    return (
    <div className="cursor-pointer">
        <img 
            src={user_photo || '/placeholder_avatar.jpg'} 
            alt="user photo" 
            className={`${size === 'lg' ? 'w-[50px] h-[50px]' : 'w-[35px] h-[35px]'} rounded-full`}
         />
    </div>
    )
}