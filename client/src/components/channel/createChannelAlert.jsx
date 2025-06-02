import { GrChannel } from "react-icons/gr";
import { GiWorld } from "react-icons/gi";
import { FaEyeSlash } from "react-icons/fa6";
import { SiSpringsecurity } from "react-icons/si";

export const CreateChannelAlert = ( )=> {
    return (
        <div className="">

            <header>
                <div className="">
                    <GrChannel />
                </div>
                <h4>create a channel to reach unlimted followers</h4>
            </header>
            <div className="">
                <div className="">
                    <div className="">
                        <GiWorld />
                    </div>
                    <div className="">
                        <h5>Anyone can discover your channel</h5>
                        <p>Channels are poblic, so anyone can find them and 30 dayes of history</p>
                    </div>
                </div>
                <div className="">
                    <div className="">
                        <FaEyeSlash />
                    </div>
                    <div className="">
                        <h5>Anyone can discover your channel</h5>
                        <p>"Followers can’t see your phone number, profile picture or name, but other admins can</p>
                    </div>
                </div>
                <div className="">
                    <div className="">
                        <SiSpringsecurity />
                    </div>
                    <div className="">
                        <h5>You’re responsible for your channel</h5>
                        <p></p>
                    </div>
                </div>
            </div>
            <footer>

            </footer>
        </div>
    )
}