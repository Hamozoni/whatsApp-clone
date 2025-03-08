import { AiOutlinePaperClip } from "react-icons/ai"
import { HiOutlineEmojiHappy } from "react-icons/hi"
import { SlMicrophone } from "react-icons/sl"

export const Message_input = ()=> {
    return (
        <div className="p-4 bg-[#f0f2f5] border-t">
        <div className="flex items-center space-x-2">
          <HiOutlineEmojiHappy className="h-6 w-6 text-[#54656f] cursor-pointer hover:text-[#00a884]" />
          <AiOutlinePaperClip className="h-6 w-6 text-[#54656f] cursor-pointer hover:text-[#00a884] rotate-90" />
          
          <div className="flex-1 relative">
            <input
              type="text"
            //   value={newMessage}
            //   onChange={(e) => setNewMessage(e.target.value)}
            //   onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type a message"
              className="w-full pl-4 pr-12 py-2 rounded-lg bg-white border focus:outline-none focus:border-[#00a884] text-[#111b21]"
            />
            <SlMicrophone className="h-6 w-6 text-[#54656f] absolute right-2 top-2 cursor-pointer hover:text-[#00a884]" />
          </div>

          <button
            // onClick={handleSendMessage}
            className="bg-[#00a884] p-2 rounded-full text-white hover:bg-[#008f76] transition-colors"
          >
            <svg viewBox="0 0 24 24" width="24" height="24" className="fill-current">
              <path d="M1.101 21.757L23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z"/>
            </svg>
          </button>
        </div>
      </div>
    )
}