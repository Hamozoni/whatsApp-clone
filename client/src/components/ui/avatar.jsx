
export const Avatar = ({size = 'sm',user_photo})=> {
    return (
    <div className="cursor-pointer">
        <img 
            src={user_photo || '/placeholder_avatar.jpg'} 
            alt="user photo" 
            className={`${size === 'lg' ? 'w-[50px] h-[50px]' : size === 'sm' ? 'w-[35px] h-[35px]' : size === 'xl' ? 'w-[80px] h-[80px]' : size === '2xl' && 'w-[140px] h-[140px]'} rounded-full`}
         />
    </div>
    )
}