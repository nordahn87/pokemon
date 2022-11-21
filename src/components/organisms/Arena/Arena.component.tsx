import React, {FC, useCallback, useContext, useEffect, useState} from "react";
import {PA_API} from "../../../interface/api";
import {ENDPOINT_OPPONENT, ENDPOINT_PLAYER, ENDPOINT_POKEBALL, ENDPOINT_POTION} from "../../../constants/endpoints";
import PA_Player from "../../molecules/pokemons/Player/Player.component";
import PA_Opponent from "../../molecules/pokemons/Opponent/Opponent.component";
import {FetchApi} from "../../../helpers/api.helper";
import {useMessages} from "../../../hooks/messages.provider";
import {MessagesEnum} from "../../../models/messages.enum";
import './Arena.scss'

const PA_Arena:FC = () => {
    //Game state - "LOADING", "READY_PLAYER1", "READY_PLAYER2", "PLAYER1_ACTING"
    // const [gamestate, SetGameState] = useState("LOADING")

    const { showMessage } = useMessages();

    //Pokémon data
    const [playerData, setPlayerData ] = useState<PA_API>({})
    const [opponentData, setOpponentData ] = useState<PA_API>({})

    //Item data
    const [potionData, setPotionData ] = useState<PA_API>({})
    const [pokeBallData, setPokeBallData ] = useState<PA_API>({})

    //Attack
    const [quickAttackDamage, setQuickAttackDamage] = useState<number | null>(null)

    //Health state
    const [currentOppponentHealth, SetCurrentOppponentHealth ] = useState<number | null>(null)

    const playerName = playerData.species?.name
    const opponentName = opponentData.species?.name

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

    // Opponent current health
    useEffect(() => {
        SetCurrentOppponentHealth(130)
    },[])

    //Player attacks - might add more damage types later on!
    useEffect(() => {
        setQuickAttackDamage(7)
    },[])


    //Player doing quick attack
    const handlePlayerAttack = useCallback(() => {
        const isDealingDamage = currentOppponentHealth! - quickAttackDamage!

        SetCurrentOppponentHealth(isDealingDamage)

        if (currentOppponentHealth! <= 0) {
            SetCurrentOppponentHealth(0)
            return false
        } else if (isDealingDamage < 0) {
            SetCurrentOppponentHealth(0)
        } else {
            SetCurrentOppponentHealth(isDealingDamage)
        }
            showMessage(MessagesEnum.PLAYER_ATTACK, playerName, opponentName, "damageAmount");

    },[currentOppponentHealth, opponentName, playerName, quickAttackDamage, showMessage])

    return (
        <div className="arena-wrapper">
            <PA_Player
                playerData={playerData}
                potionData={potionData}
                pokeBallData={pokeBallData}
                handlePlayerAttack={handlePlayerAttack}
            />

            <PA_Opponent
                opponentData={opponentData}
                currentOppponentHealth={currentOppponentHealth}
            />
           <div className="arena-scene">
                <span className="skye"></span>
                <span className="ground"></span>
            </div>
        </div>
    );
};

export default PA_Arena;
