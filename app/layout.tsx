import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers/providers";
import { AuthProvider } from "../context/AuthContext";

const poppins = Poppins({ weight: "500", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Network",
  description: "Connect to the world!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Providers>
    
        <AuthProvider>
        {children}
        </AuthProvider>
       
        </Providers>
        </body>
    </html>
  );
}
