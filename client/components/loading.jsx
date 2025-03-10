import { BarLoader } from "react-spinners"

export const Loading = ()=> {
    return (
        <div className="flex items-center justify-center h-screen w-screen bg-[#111b21]">
            <BarLoader width={200} height={10} speedMultiplier={5} color="#70ffd7"/>
        </div>
    )
}