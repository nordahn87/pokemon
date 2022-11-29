import React, {FC, useCallback, useEffect, useState} from "react";
import {PA_API} from "../../../interface/api";
import {ENDPOINT_OPPONENT, ENDPOINT_PLAYER, ENDPOINT_POKEBALL, ENDPOINT_POTION} from "../../../constants/endpoints";
import PA_Player from "../../molecules/pokemons/Player/Player.component";
import PA_Opponent from "../../molecules/pokemons/Opponent/Opponent.component";
import {FetchApi} from "../../../helpers/api.helper";
import {ClassListAdd} from "../../../helpers/classList.helper";
import {useMessages} from "../../../hooks/messages.provider";
import {MessagesEnum} from "../../../models/messages.enum";
import {usePokemons} from "../../../hooks/pokemon.provider";
import './Arena.scss'

const PA_Arena:FC = () => {
    //Game state - "LOADING", "READY_PLAYER1", "READY_PLAYER2", "PLAYER1_ACTING"
    // const [gamestate, SetGameState] = useState("LOADING")

    // Hooks
    const { showMessage } = useMessages();
    const { playerElement, opponentElement } = usePokemons();

    // Disable button
    const [ buttonDisabled, setButtonDisabled ] = useState(false)

    // API data
    const [playerData, setPlayerData ] = useState<PA_API>({})
    const [opponentData, setOpponentData ] = useState<PA_API>({})
    const [potionData, setPotionData ] = useState<PA_API>({})
    const [pokeBallData, setPokeBallData ] = useState<PA_API>({})

    // Attack
    const [quickAttackDamage, setQuickAttackDamage] = useState<number | null>(null)

    // Health state
    const [currentOppponentHealth, SetCurrentOppponentHealth ] = useState<number | null>(null)

    // Constants
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
        SetCurrentOppponentHealth(30)
    },[])

    //Player attacks - might add more damage types later on!
    useEffect(() => {
        setQuickAttackDamage(7)
    },[])

    // Player doing quick attack
    const handlePlayerAttack = useCallback(() => {
        const updatedCurrentOpponentHealth = currentOppponentHealth! - quickAttackDamage!


        if (updatedCurrentOpponentHealth <= 0) {
            SetCurrentOppponentHealth(0)
            showMessage(MessagesEnum.OPPONENT_KO, playerName, opponentName, quickAttackDamage);
        } else {
            SetCurrentOppponentHealth(updatedCurrentOpponentHealth)
            ClassListAdd(playerElement, "quick-attack-animation")
            ClassListAdd (opponentElement, "damage-taken-animation")
            setButtonDisabled(true)
        }

        showMessage(MessagesEnum.PLAYER_ATTACK, playerName, opponentName, quickAttackDamage);

    },[currentOppponentHealth, opponentElement, opponentName, playerElement, playerName, quickAttackDamage, showMessage])

    return (
        <div className="arena-wrapper">
            <PA_Player
                playerData={playerData}
                potionData={potionData}
                pokeBallData={pokeBallData}
                handlePlayerAttack={handlePlayerAttack}
                buttonDisabled={buttonDisabled}
                setButtonDisabled={setButtonDisabled}
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
