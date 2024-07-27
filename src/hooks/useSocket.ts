import { useEffect, useState } from "react"

export const useSocket = () => {
   const [Socket,setSocket] = useState<WebSocket | null>(null);
   useEffect(() => {
     const ws = new WebSocket("ws://localhost:8080");

     ws.onopen = () => {
       setSocket(ws)
     }

     ws.onclose = () => {
       setSocket(null)
     }
     return () => {
       ws.close();
     }
   },[])
   return Socket;
}