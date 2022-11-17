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
    console.log(playerData.sprites?.versions["generation-v"]["black-white"].animated.back_default)

    return (

        <div>
            <div className="player-container">
                <img className="player-pokemon" src={playerData.sprites?.versions["generation-v"]["black-white"].animated.back_default} alt={playerData.species?.name} />
            </div>
            <PA_PlayerAction />
        </div>
    );
};

export default PA_Player
