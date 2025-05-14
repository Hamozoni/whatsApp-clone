import { useContext } from "react";
import { User_context } from "../../contexts/user.context";


export const StatusAvatarRing = ({status,statusCount,size = 56,ring_width: ringWidth = 3})=> {

    const {user} = useContext(User_context)
    const radius = (size - ringWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const gapAngle = 4;
    const arcAngle = (360 - statusCount * gapAngle) / statusCount;

    const getArcOffset = (index)=> {
        const totalAngle = index * (arcAngle + gapAngle);

        return (totalAngle / 360) * circumference
    };

    const getColor = (seen)=> (seen ? '#aaa' : '#25D366');

    const style = {
        width: `${size - ringWidth * 2}px`,
        height: `${size - ringWidth * 2}px`,
        left: `${ringWidth}px`,
        top: `${ringWidth}px`,
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
                            r={radius - ringWidth / 2}
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
                            stroke={getColor(st.seen_by.includes(user?._id))}
                            strokeWidth={ringWidth}
                            strokeDasharray={`${(arcAngle / 360) * circumference} ${circumference}`}
                            strokeDashoffset={-getArcOffset(i)}
                            transform={`rotate(-90 ${size / 2} ${size / 2})`}
                        />
                    ))
                }
            </svg>

            {
                status[statusCount - 1]?.type === 'TEXT' ? 
                <div 
                        style={{
                            fontFamily:status[statusCount - 1].font_family,
                            backgroundColor: status[statusCount - 1].text_bg_color,
                            ...style
                        }} 
                        className={`flex items-center justify-center absolute z-30 rounded-full text-[3px] overflow-hiden`}
                        >
                        {status[statusCount - 1].text}
                </div>
                :  status[statusCount - 1]?.file?.type === 'IMAGE' ?
                <img
                    src={status[statusCount - 1].file.url} 
                    style={style} 
                    className="object-cover rounded-full"
                    alt="status avatar"
                    />
                :
                status[statusCount - 1]?.file?.type === 'VIDEO' &&
                <video
                    src={status[statusCount - 1].file.url} 
                    className="object-cover rounded-full"
                    style={style} />
            }

        </div>
    )
}