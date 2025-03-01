import "./globals.css";

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
        {children}
      </body>
    </html>
  );
}
