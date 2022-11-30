import React, {FC, useCallback, useEffect, useState} from "react";
import {MessagesEnum} from "../../../models/messages.enum";
import PA_Player from "../../molecules/pokemons/Player/Player.component";
import PA_Opponent from "../../molecules/pokemons/Opponent/Opponent.component";
import {ClassListAdd, ClassListRemove} from "../../../helpers/classList.helper";
import {useMessages} from "../../../hooks/messages.provider";
import {usePokemons} from "../../../hooks/pokemon.provider";
import {useApiData} from "../../../hooks/apiData.provider";
import PA_PlayerAction from "../../molecules/actions/PlayerAction/PlayerAction.component";
import PA_OpponentAction from "../../molecules/actions/OpponentAction/OpponentAction.component";
import './Arena.scss'

const PA_Arena:FC = () => {
    //Game state - "LOADING", "READY_PLAYER1", "READY_PLAYER2", "PLAYER1_ACTING"
    // const [gamestate, SetGameState] = useState("LOADING")

    // Hooks
    const { showMessage } = useMessages();
    const { playerElement, opponentElement } = usePokemons();
    const { playerData, opponentData, potionData, pokeBallData } = useApiData();

    // Disable button
    const [ buttonDisabled, setButtonDisabled ] = useState(false)

    // Attack
    const [quickAttackDamage, setQuickAttackDamage] = useState<number | null>(null)

    // Health state
    const [currentOppponentHealth, SetCurrentOppponentHealth ] = useState<number | null>(null)

    // Constants
    const playerName = playerData.species?.name
    const opponentName = opponentData.species?.name

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


    const attackAnimationEnd = () => {
        ClassListRemove(playerElement, "quick-attack-animation");
        ClassListRemove(opponentElement, "damage-taken-animation");
        setButtonDisabled(false)
    }

    return (
        <div className="arena-wrapper">
            <div>
                <PA_Player
                    playerData={playerData}
                    attackAnimationEnd={attackAnimationEnd}
                />
                <PA_PlayerAction
                    playerData={playerData}
                    potionData={potionData}
                    pokeBallData={pokeBallData}
                    handlePlayerAttack={handlePlayerAttack}
                    buttonDisabled={buttonDisabled}
                />
            </div>
            <div>
                <PA_OpponentAction
                    opponentData={opponentData}
                    currentOppponentHealth={currentOppponentHealth}
                />
                <PA_Opponent
                    opponentData={opponentData}
                    currentOppponentHealth={currentOppponentHealth}
                />
            </div>
           <div className="arena-scene">
                <span className="skye"></span>
                <span className="ground"></span>
            </div>
        </div>
    );
};

export default PA_Arena;
