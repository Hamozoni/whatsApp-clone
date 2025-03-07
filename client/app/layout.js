import "./globals.css";

import {Auth_context_provider }from '@/components/auth/context';

export const metadata = {
  title: "whatsApp home",
  description: "WhatsApp home page",
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
