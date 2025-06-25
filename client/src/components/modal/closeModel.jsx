

export const CloseModel = ({setCloseModel}) => {
    return (
        <div 
            onClick={()=> setCloseModel(false)}  
            className=" fixed top-0 left-0 h-screen w-screen min-h-screen min-w-screen z-40 bg-[#00000025] cursor-pointer">

        </div>
    )
}