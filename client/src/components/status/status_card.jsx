import { time_formater } from "../../utils/time_formater"

export const Status_card = ({status})=> {
    return (
        <div className="flex items-center gap-2">
                {
                    status[1].type === 'TEXT' && 
                    <div 
                        style={{fontFamily:status[1].font_family,backgroundColor: status[1].text_bg_color}} 
                        className="flex items-center justify-center w-[50px] h-[50px] rounded-full text-[8px] overflow-hiden"
                        >
                        {status[1].text}
                    </div>
                }
                <div className="">
                    <h6>{status[1].user.name}</h6>
                    <p>{new Date(status[1].createdAt).toLocaleTimeString([],{hour: '2-digit',minute: '2-digit'}) }</p>
                </div>
        </div>
    )
}