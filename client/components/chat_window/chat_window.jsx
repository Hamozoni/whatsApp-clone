import React from 'react';


const Chat_window = () => {
  return (
    <div className="flex-1 h-screen max-h-full flex flex-col text-[#f7f8fa]">
      {/* Header */}
      <header className="p-3 bg-[#222e35] text-white flex items-center justify-between">
        <div className="flex items-center">
          <img
            src="https://i.pravatar.cc/150?img=1"
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover mr-3"
          />
          <div>
            <div className="font-semibold">John Doe</div>
            <div className="text-sm">Last seen recently</div>
          </div>
        </div>
        <div className="text-xl cursor-pointer">⋮</div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#111b21]">
        {/* Received message */}
        <div className="flex items-start bg-[#222e35] w-fit max-w-1/2 rounded-md">
          <div className="p-3 rounded-lg ">
              Hello, how are you?
          </div>
        </div>

        {/* Sent message */}
        <div className="flex justify-end">
          <div className="bg-[#00a884] p-3 rounded-lg max-w-[75%]">
            <span className="font-semibold">You:</span> I'm good, thanks!
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="p-4 bg-[#222e35]">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Type a message"
            className="w-full p-3 rounded-lg bg-[#303f47] text-[#f7f8fa] text-sm"
          />
          <button className="text-[#128C7E] ml-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 2L12 13l-3-3-7 7V4h18z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat_window;
