import "../style/globals.css";

import {User_context_provider }from '@/contexts/context';
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
              {children}
          </User_context_provider>
        </main>
      </body>
    </html>
  );
}
