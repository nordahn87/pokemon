import {FC, useEffect, useState} from "react";
import {API_BASE_URL} from "../../../../constants/baseUrls";
import {ENDPOINT_PLAYER} from "../../../../constants/endpoints";
import {PA_API} from "../../../../interface/api";
import PA_PlayerAction from "../../actions/PlayerAction/PlayerAction.component";
import './Player.scss'

const PA_Player:FC = () => {
    const [playerData, setPlayerData ] = useState<PA_API>({})

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

        <div>
            <div className="player-container">
                <img className="player-pokemon" src={playerData.sprites?.back_default} alt={playerData.species?.name} />
            </div>
            <PA_PlayerAction />
        </div>
    );
};

export default PA_Player
