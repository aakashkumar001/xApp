"use client"
import { QueryProvider } from "@/lib/react-query/QueryProvider";

export default function SignUpLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
    <>
    <div className="w-full h-full">
      <div className=" grow h-full border-r-2 lg:ml-64 p-6">
        <QueryProvider>
      {children}
      </QueryProvider>
      </div>
    </div>
    </>
    )
    ;
  }