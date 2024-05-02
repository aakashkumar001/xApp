import StreamVideoPriovider from "@/app/providers/StreamClientProvider";
import { ReactNode } from "react"


const RoomLayout = ({children}: Readonly<{children:ReactNode}>) => {
    return (
        <main>
            <StreamVideoPriovider>
                {children}
            </StreamVideoPriovider>
        </main>
    )
}


export default RoomLayout;