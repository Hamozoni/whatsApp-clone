import "./globals.css";

import {Auth_context_provider }from '@/components/auth/context';
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
        <Auth_context_provider >
            {children}
        </Auth_context_provider>
      </body>
    </html>
  );
}
