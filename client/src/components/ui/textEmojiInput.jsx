import { EmojiBtn } from "./emojiBtn"

export const TextEmojiInput = ({text,setText,placeholder,isEmojiBtn = true})=> {

    return (
        <div className="flex items-center rounded-full flex-1 relative bg-[#393a3b5e] px-3 py-1 border-2 border-[#111b2196]">
            {
                isEmojiBtn &&
                <EmojiBtn setText={setText} />
            }
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={placeholder}
                className="w-full focus:outline-none text-[#f7f8fa] px-2 py-1 hide_model"
            />
        </div>
    )
}