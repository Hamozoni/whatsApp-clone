import { Outlet } from "react-router-dom";

import {IoSettingsOutline } from "react-icons/io5";


const Settings = ()=> {

    return (
        <div  className="flex gap-1 h-full flex-1 overflow-y-auto">
            <div className="flex-1 flex flex-col w-full min-w-[380px] md:w-[380px] max-w-full rounded-lg bg-p ">
               <Outlet />
            </div>
            <section className="hidden md:flex text-gray-400 flex-2 items-center justify-center flex-col gap-5 bg-s rounded-lg">
                <IoSettingsOutline size={48} />
                <h6 className='text-3xl'>Settings</h6>
            </section>
        </div>
    )
};

export default Settings;