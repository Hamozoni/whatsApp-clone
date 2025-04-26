import { Chat_window_context_provider } from "@/contexts/chat_window.context";
import "../style/globals.css";

import {User_context_provider }from '@/contexts/user.context';
import { Call_context_provider } from "@/contexts/call.context";
export const dynamic = 'force-dynamic';


export const metadata = {
  title: "whatsApp home",
  description: "WhatsApp home page",
  favicon: '/favicon.ico'

};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={``}
      >
        <main>
          <User_context_provider >
             <Chat_window_context_provider>
                <Call_context_provider >
                    {children}
                </Call_context_provider>
              </Chat_window_context_provider>
          </User_context_provider>
        </main>
      </body>
    </html>
  );
}
