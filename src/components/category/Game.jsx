import { useEffect, useState } from "react";
import axios from "axios";
import { serverUrl } from "../../redux/modules";

const GamePage = () => {
  const [games, setGames] = useState();

  const getGame = async () => {
    const res = await axios.get(`${serverUrl}/api/room?category=game`);
    setGames(res);
  };

  useEffect(() => {
    getGame();
  }, []);

  return (
    <div>
      <h1>게임</h1>
      <p>게임으로 분류된 채팅방</p>
      {games.map((game, idx) => {
        <div key={idx}>
          <h4>채팅방 제목{game.roomName}</h4>
        </div>;
      })}
    </div>
  );
};

export default GamePage;
