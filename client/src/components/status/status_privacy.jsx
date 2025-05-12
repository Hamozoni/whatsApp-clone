import { IoCloseSharp } from "react-icons/io5"

export const Status_privacy = ()=> {
    return (
        <div className="">
            <div className="">
                <button>
                    <IoCloseSharp />
                </button>
                <p>Status privacy</p>
            </div>
            <h6>Who can see my status on AkhbarkApp</h6>
            <div className="">
                <div className="">
                    <span></span>
                    <div className="">
                        <h6>My contacts</h6>
                        <p>Share with all of your contacts</p>
                    </div>
                </div>
                <div className="">
                    <span></span>
                    <div className="">
                        <h6>My contacts except...</h6>
                        <p>Share with your contacts except people you select</p>
                    </div>
                </div>
                <div className="">
                    <span></span>
                    <div className="">
                        <h6>Only share with...</h6>
                        <p>Only share with selected contacts</p>
                    </div>
                </div>
            </div>
        </div>
    )
}