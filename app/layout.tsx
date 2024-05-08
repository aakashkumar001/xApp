import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
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
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        <Providers>
       <QueryProvider>
        <AuthProvider>
        {children}
        </AuthProvider>
        </QueryProvider>
        </Providers>
        </ThemeProvider>
        </body>
    </html>
  );
}
