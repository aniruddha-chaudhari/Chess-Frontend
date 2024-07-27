import { Color, PieceSymbol, Square } from "chess.js"
import { useState } from "react";

const Chessboard = ({board,socket}:{
  board: (
    {
      square:Square;
      type:PieceSymbol;
      color:Color
    }|null)[][];
    socket : WebSocket;
}) => {
  const [from,setFrom]=useState<null | Square>(null);
  const [to,setTo]=useState<null | Square>(null);
  return (

    <div className="text-white-200 w-full">
      <div className="text-white-200">
        {board.map((row, i) => {
          return <div key={i} className="flex">
            {row.map((square, j) => {
              return <div onClick={() => {
                if(!from){
                  setFrom(square?.square ?? null);
                }else{
                  setTo(square?.square ?? null);
                  socket.send(JSON.stringify({type:"move",
                    payload:{
                      from,to
                    
                    }}));
                    console.log(from,to);
                }
              }}
                key={j}
                className={`w-16 h-16 ${(i+j)%2===0 ? "bg-green-500" : "bg-green-50"}`}
              >
                <div className="w-full h-full flex justify-center items-center">
                {square ? square.type : ""}
                </div>
              </div>
        })}
          </div>
})}
      </div>
    </div>
  );
  
}

export default Chessboard