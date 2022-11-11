import {FC, useEffect, useState} from "react";
import '../player/Player.css'

type Player = {
    [key: string]: any
}

const PA_Player:FC = () => {
    const [playerData, setPlayerData ] = useState<Player>({})

useEffect(() => {
    fetch("./data/player.json")
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            setPlayerData(data)
        })
}, []);

    return (
        <div>
            <img className="player-pokemon" src={playerData.sprites?.back_default} alt={playerData.species?.name} />
        </div>
    );
};

export default PA_Player
