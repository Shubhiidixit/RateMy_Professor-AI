import './globals.css';
import React from 'react';


export const metadata = {
  title: 'Rate My Professor AI Assistant',
  description: 'AI-powered assistant to rate professors',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
