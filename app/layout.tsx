import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers/providers";
import { AuthProvider } from "../context/AuthContext";
import { QueryProvider } from "@/lib/react-query/QueryProvider";


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
       <QueryProvider>
        <AuthProvider>
        {children}
        </AuthProvider>
        </QueryProvider>
        </Providers>
        </body>
    </html>
  );
}
