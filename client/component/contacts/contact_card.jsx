import { Avatar } from "../avatar";

export const Contact_card = ({email,photo,name})=> {
    return (
        <div className="w-full max-w[500px] flex items-center gap-2">
           <Avatar user_photo={photo} />
           <div className="">
                <h3>{name}</h3>
                <h5>{email}</h5>
           </div>
        </div>
    )
}