import { IoArrowBack } from "react-icons/io5"
import { RoundedBtn } from "../../../components/ui/roundedBtn"
import { Link } from "react-router-dom"

export const Header = ({title})=> {
    return (
        <header className="flex gap-3 items-center mb-5 p-3 bg-[#162127] rounded-md">
            <Link to='/settings'>
                <RoundedBtn Icon={IoArrowBack} onClick={()=> ''} />
            </Link>
            <h5 className="text-lg">{title}</h5>
        </header>
    )
}