import React, { useEffect, useState } from 'react';
import Chessboard from '../components/Chessboard';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../hooks/useSocket';
import { Chess } from 'chess.js';

export const INIT_GAME = "init_game";
export const MOVE = "move";
export const GAME_OVER = "game_over";

const Game = () => {
  const socket = useSocket();
  const [chess, setChess] = useState(new Chess());
  const [board, setBoard] = useState(chess.board());
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!socket) {
      return;
    }  
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);

      switch (message.type) {
        case INIT_GAME:
          const newChess = new Chess();
          setBoard(newChess.board());
          console.log('init game');
          setStarted(true);
          break;
        case MOVE:
          const move = message.payload;
          chess.move(move);
          setBoard(chess.board());
          console.log('move');
          break;
        case GAME_OVER:
          console.log('game over');
          break;
        default:
          console.log('unknown type');
          break;
      }
    }
  }, [socket, chess])

  const navigate = useNavigate();
  if (!socket) return <div>Loading...</div>;

  return (
    <div className='flex justify-center'>
      <div className='pt-8 max-w-screen-lg w-full'>
        <div className='grid grid-cols-6 gap-4 w-full'>
          <div className='col-span-4 flex justify-center items-center'>
            <div className='w-full max-w-lg'>
              <Chessboard chess={chess} setBoard={setBoard} socket={socket} board={board} />
            </div>
          </div>
          <div className='col-span-2 bg-slate-900 flex justify-center items-center'>
            {!started &&<Button onClick={() => {
              socket.send(JSON.stringify({
                type: INIT_GAME,
              }));
            }}>
              PLAY
            </Button>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
