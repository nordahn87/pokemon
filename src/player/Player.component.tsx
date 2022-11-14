import {FC, useEffect, useState} from "react";
import {API_BASE_URL, ENDPOINT_PLAYER} from "../constants/baseUrls";
import {PA_Pokemon} from "../interface/pokemon";
import '../player/Player.css'


const PA_Player:FC = () => {
    const [playerData, setPlayerData ] = useState<PA_Pokemon>({})

useEffect(() => {
    fetch(`${API_BASE_URL}${ENDPOINT_PLAYER}`)
        .then((response) => response.json())
        .then((data) => {
            setPlayerData(data)
        })
}, []);

    const moves = playerData.moves?.filter((item: any) => {
        return item.move.name === "quick-attack"
    })
    console.log(moves)


    return (
        <div className="player-section">
            <img className="player-pokemon" src={playerData.sprites?.back_default} alt={playerData.species?.name} />
            <div className="player-action">
                {moves?.map((item:any, index:any) => {
                    return (
                        <button key={index} onClick={() => {
                            console.log("Attack")
                        }}>
                            {item.move.name}
                        </button>
                    )
                })}
            </div>
        </div>
    );
};

export default PA_Player
