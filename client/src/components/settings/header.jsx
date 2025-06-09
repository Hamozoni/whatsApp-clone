import { IoArrowBack } from "react-icons/io5"
import { RoundedBtn } from "../ui/roundedBtn"


export const Header = ({setActivePage,title})=> {
    return (
        <header className="flex gap-3 items-center mb-5">
            <RoundedBtn Icon={IoArrowBack} onClick={setActivePage} />
            <h5 className="text-lg">{title}</h5>
        </header>
    )
}