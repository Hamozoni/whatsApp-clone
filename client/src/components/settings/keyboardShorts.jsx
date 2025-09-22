import { Header } from "./header"

const keyboardShorts = [
    {id: 1,shortName: 'Mark as unread', key: 'ctrl+alt+shift+u'},
    {id: 2,shortName: 'mute', key: 'ctrl+alt+shift+m'},
    {id: 3,shortName: 'archive chat', key: 'ctrl+alt+shift+e'},
    {id: 4,shortName: 'pin chat', key: 'ctrl+alt+shift+p'},
    {id: 5,shortName: 'search', key: 'ctrl+alt+/'},
    {id: 6,shortName: 'search chat', key: 'ctrl+shift+f'},
    {id: 7,shortName: 'new chat', key: 'ctrl+alt+n'},
    {id: 8,shortName: 'next chat', key: 'ctrl+alt+tap'},
    {id: 9,shortName: 'previous chat', key: 'ctrl+alt+shift+tap'},
    {id: 10,shortName: 'close chat', key: 'escape'},
    {id: 11,shortName: 'new group', key: 'ctrl+alt+shift+n'},
    {id: 12,shortName: 'profile and about', key: 'ctrl+alt+p'},
]
export const KeyboardShorts = ({setActivePage})=> {
    return (
        <div className="bg-gray-800 flex flex-col fixed z-50 p-5 rounded-md top-[50px] left-1/2 -translate-x-1/2 max-w-dvw w-[550px] max-h-5/6">
            <Header 
                title='keyboard shortcuts' 
                setActivePage={()=> setActivePage('main')}
            />
            <div className="flex-1 max-h-full overflow-y-auto flex flex-col p-3">
                {
                    keyboardShorts?.map(({id,shortName,key})=> (
                        <div key={id} className="flex justify-between items-center mb-4">
                            <h4 className="text-sm font-medium capitalize">
                                {shortName}
                            </h4>
                            <div className="flex items-center gap-1">
                                {
                                    key.split('+').map((key)=> (
                                        <div 
                                            key={key} 
                                            className="flex justify-center items-center p-1 text-xs font-medium capitalize rounded-md border border-gray-500"
                                            >
                                                {key}
                                            </div>
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
             
        </div>
    )
}