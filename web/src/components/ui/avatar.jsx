
export const Avatar = ({size = 'sm',userPhoto})=> {
    return (
    <div className="cursor-pointer min-w-fit max-w-fit">
        <img 
            src={userPhoto || './placeholder_avatar.jpg'} 
            alt="user photo" 
            className={`${size === 'lg' ? 'w-[50px] h-[50px]' : size === 'sm' ? 'w-[35px] h-[35px]' : size === 'xl' ? 'w-[80px] h-[80px]' : size === '2xl' && 'w-[140px] h-[140px]'} border border-gray-400 object-cover rounded-full`}
         />
    </div>
    )
}