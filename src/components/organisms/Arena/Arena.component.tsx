import React, {FC, useEffect, useState} from "react";
import {PA_API} from "../../../interface/api";
import {ENDPOINT_OPPONENT, ENDPOINT_PLAYER, ENDPOINT_POKEBALL, ENDPOINT_POTION} from "../../../constants/endpoints";
import PA_Player from "../../molecules/pokemons/Player/Player.component";
import PA_Opponent from "../../molecules/pokemons/Opponent/Opponent.component";
import {FetchApi} from "../../../helpers/api.helper";
import './Arena.scss'

const PA_Arena:FC = () => {
    // State Pokémon
    const [playerData, setPlayerData ] = useState<PA_API>({})
    const [opponentData, setOpponentData ] = useState<PA_API>({})

    // State item
    const [potionData, setPotionData ] = useState<PA_API>({})
    const [pokeBallData, setPokeBallData ] = useState<PA_API>({})

    // Fetch Pokémon
    useEffect(() => {
        FetchApi(ENDPOINT_PLAYER)
            .then((data) => {
                setPlayerData(data)
            })
    }, [setPlayerData]);

    useEffect(() => {
        FetchApi(ENDPOINT_OPPONENT)
            .then((data) => {
                setOpponentData(data)
            })
    }, [setOpponentData]);

    // Fetch item
    useEffect(() => {
        FetchApi(ENDPOINT_POTION)
            .then((data) => {
                setPotionData(data)
            })
    }, [setPotionData]);

    useEffect(() => {
        FetchApi(ENDPOINT_POKEBALL)
            .then((data) => {
                setPokeBallData (data)
            })
    }, [setPokeBallData ]);

    return (
        <div className="arena-wrapper">
            <PA_Player playerData={playerData} potionData={potionData} pokeBallData={pokeBallData} />
            <PA_Opponent opponentData={opponentData} />
           <div className="arena-scene">
                <span className="skye"></span>
                <span className="ground"></span>
            </div>
        </div>
    );
};

export default PA_Arena;
