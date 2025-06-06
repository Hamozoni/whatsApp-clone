import { useContext } from "react"
import { User_context } from "../../contexts/user.context"


export const ChannelsContainer = ()=> {

    const {channels} = useContext(User_context);

    return (
        <div className="">
            {
                channels?.map(()=> (
                    <div className="">
                        
                    </div>
                ))
            }
        </div>
    )
}