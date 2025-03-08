import React from 'react';

const Sidebar = () => {
  return (
    <div className="w-80 h-screen bg-[#F6F6F6] border-r border-[#ddd] flex flex-col">
      {/* Header */}
      <div className="p-4 bg-[#128C7E] text-white flex items-center justify-between">
        <div className="font-bold text-lg">WhatsApp</div>
        <div className="text-white text-xl cursor-pointer">⋮</div>
      </div>

      {/* Search Bar */}
      <div className="p-4 border-b border-[#ddd]">
        <input
          type="text"
          placeholder="Search or start new chat"
          className="w-full p-2 rounded-lg bg-[#E9E9E9] border border-[#ccc] text-sm"
        />
      </div>

      {/* Contact List */}
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-2">
          {['John Doe', 'Jane Smith', 'Sarah Connor', 'Michael Scott'].map((contact, index) => (
            <div key={index} className="flex items-center px-4 py-3 cursor-pointer hover:bg-[#E5E5E5] rounded">
              <img
                src={`https://i.pravatar.cc/150?img=${index + 1}`}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover mr-3"
              />
              <div>
                <div className="font-semibold">{contact}</div>
                <div className="text-sm text-gray-600">Last message...</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
