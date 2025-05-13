import { useContext } from "react";
import { User_context } from "../../contexts/user.context";


export const Status_avatar_ring = ({status,status_count,size = 56,ring_width = 3})=> {

    const {user} = useContext(User_context)
    const radius = (size - ring_width) / 2;
    const circumference = 2 * Math.PI * radius;
    const gap_angle = 4;
    const arc_angle = (360 - status_count * gap_angle) / status_count;

    const get_arc_offset = (index)=> {
        const total_angle = index * (arc_angle + gap_angle);

        return (total_angle / 360) * circumference
    };

    const get_color = (seen)=> (seen ? '#aaa' : '#25D366');
    const style = {
        width: `${size - ring_width * 2}px`,
        height: `${size - ring_width * 2}px`,
        left: `${ring_width}px`,
        top: `${ring_width}px`,
        position : 'absolute'
    }

    return (
        <div className=" relative">
            <svg width={size} height={size}>
                <defs>
                    <clipPath id='avatar_clip'>
                        <circle 
                            cx={size / 2} 
                            cy={size / 2} 
                            r={radius - ring_width / 2}
                            />
                    </clipPath>
                </defs>
                {
                    status.map((st,i)=> (
                        <circle 
                            key={st?._id}
                            r={radius}
                            cx={size / 2}
                            cy={size / 2}
                            fill="transparent"
                            stroke={get_color(st.seen_by.includes(user?._id))}
                            strokeWidth={ring_width}
                            strokeDasharray={`${(arc_angle / 360) * circumference} ${circumference}`}
                            strokeDashoffset={-get_arc_offset(i)}
                            transform={`rotate(-90 ${size / 2} ${size / 2})`}
                        />
                    ))
                }
            </svg>

            {
                status[status_count - 1]?.type === 'TEXT' ? 
                <div 
                        style={{
                            fontFamily:status[status_count - 1].font_family,
                            backgroundColor: status[status_count - 1].text_bg_color,
                            ...style
                        }} 
                        className={`flex items-center justify-center absolute z-30 rounded-full text-[3px] overflow-hiden`}
                        >
                        {status[status_count - 1].text}
                </div>
                :  status[status_count - 1]?.file?.type === 'IMAGE' ?
                <img
                    src={status[status_count - 1].file.url} 
                    style={style} 
                    className="object-cover rounded-full"
                    alt="status avatar"
                    />
                :
                status[status_count - 1]?.file?.type === 'VIDEO' &&
                <video
                    src={status[status_count - 1].file.url} 
                    className="object-cover rounded-full"
                    style={style} />
            }

        </div>
    )
}