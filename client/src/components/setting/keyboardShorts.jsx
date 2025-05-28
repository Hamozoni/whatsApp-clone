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
export const KeyboardShorts = ()=> {
    return (
        <div className="bg-amber-300">
            <div className="">
                {
                    keyboardShorts?.map(({id,shortName,key})=> (
                        <div key={id} className="flex justify-between items-center">
                            <h4>{shortName}</h4>
                            <div className="flex items-center gap-3">
                                {
                                    key.split('+').map((key)=> (
                                        <div 
                                            key={key} 
                                            className="flex justify-center items-center w-8 rounded-md"
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