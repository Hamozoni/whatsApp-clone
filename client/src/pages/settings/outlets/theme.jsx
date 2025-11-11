import { Header } from "../components/header"

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