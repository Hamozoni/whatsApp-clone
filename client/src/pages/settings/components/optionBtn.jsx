import { MdKeyboardArrowRight } from "react-icons/md";

export const OptionBtn = ({privacyName,onClick ,selectedOption = null})=> {
    return (
            <div onClick={onClick} className="flex justify-between cursor-pointer py-3 border-b border-b-gray-800">
                <div className="">
                    <h6 className="text-ms">
                        {privacyName}
                    </h6>
                    {
                        selectedOption && (
                            <p className="text-xs  text-gray-400">
                                {selectedOption}
                            </p>

                        )
                    }
                </div>
                <div className="text-gray-400">
                    <MdKeyboardArrowRight size={24}/>
                </div>
            </div>
        )
};