"use client";
import Chat_window from '@/components/chat_window/chat_window';
import Sidebar from '@/components/sidebar/sidebar';

export default function Home() {

  return (
    <main>
        <div className="flex h-screen max-h-screen w-screen hide_model">
            <Sidebar />
            <Chat_window />
        </div>
    </main>
  );
}