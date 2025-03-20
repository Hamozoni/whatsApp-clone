"use client";
import Chat_window from '@/component/chat_window/chat_window';
import Sidebar from '@/component/sidebar/sidebar';

export default function Home() {

  return (
    <main>
        <div className="flex h-screen max-h-screen w-screen">
            <Sidebar />
            <Chat_window />
        </div>
    </main>
  );
}