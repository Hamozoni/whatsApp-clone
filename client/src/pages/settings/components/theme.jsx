import { Header } from "./header"

export const Theme = ({setActivePage})=> {

    return (
        <div className="">
            <Header 
                title='theme' 
                setActivePage={() => setActivePage('main')}
                />
            
        </div>
    )
}