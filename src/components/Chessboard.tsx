import { Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";

const Chessboard = ({ board, socket, setBoard, chess }: {
  chess: any;
  setBoard: any;
  board: ({
    square: Square;
    type: PieceSymbol;
    color: Color
  } | null)[][];
  socket: WebSocket;
}) => {
  const [from, setFrom] = useState<null | Square>(null);
  const [to, setTo] = useState<null | Square>(null);

  return (
    <div className="text-white-200 w-full">
      <div className="text-white-200">
        {board.map((row, i) => (
          <div key={i} className="flex">
            {row.map((square, j) => {
              const squarerep = String.fromCharCode(97 + (j % 8)) + "" + (8 - i) as Square;
              return (
                <div
                  onClick={() => {
                    if (!from) {
                      setFrom(squarerep);
                    } else {
                      setTo(squarerep);
                      socket.send(JSON.stringify({
                        type: "move",
                        payload: {
                          move: {
                            from,
                            to: squarerep
                          }
                        }
                      }));
                      setFrom(null);
                      chess.move({ from, to: squarerep });
                      setBoard(chess.board());
                      console.log(from, to);
                    }
                  }}
                  key={j}
                  className={`w-16 h-16 ${(i + j) % 2 === 0 ? "bg-green-500" : "bg-green-50"}`}
                >
                  <div className="w-full h-full flex justify-center items-center">
                    {square ? (
                      <img 
                        className="w-4" 
                        src={`../assets/pieces/${square.color === 'b' ? square.type : square.type.toUpperCase()}1.png`} 
                      />
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Chessboard;