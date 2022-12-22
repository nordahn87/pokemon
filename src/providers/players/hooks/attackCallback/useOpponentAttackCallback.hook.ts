import { Dispatch, SetStateAction, useCallback } from "react";
import { GameStateEnum } from "../../../../models/gameState.enum";
import { useGameState } from "../../../gamestate.provider";
import { RemoveClass } from "../../../../helpers/classList.helper";
import { usePlayers } from "../../players.provider";
import { calculateRandomResult } from "../../../../helpers/calculateRandomResult.helper";
import { MessagesEnum } from "../../../../models/messages.enum";
import { useMessages } from "../../../messages.provider";

export const useOpponentAttackCallback = (
    heroName: string,
    opponentName: string,
    currentHeroHealth: number,
    opponentAttackDamage: number,
    setCurrentHeroHealth: Dispatch<SetStateAction<number | null>>,
) => {
    const { setGameState } = useGameState();
    const { showMessage } = useMessages();
    const { opponentElement, heroElement } = usePlayers();

    // Opponent attack ending animation
    const opponentAttackCallback = useCallback(() => {
        const updatedCurrentHeroHealth = currentHeroHealth - opponentAttackDamage;
        const hitChanceResult = calculateRandomResult(10);

        RemoveClass(opponentElement, "opponent-attack-animation");
        RemoveClass(heroElement, "hero-takes-damage-animation");

        if (updatedCurrentHeroHealth <= 0) {
            setCurrentHeroHealth(0);
            return showMessage(MessagesEnum.OPPONENT_MESSAGE_DEFEATED, opponentName);
        }

        if (hitChanceResult <= 3) {
            showMessage(MessagesEnum.OPPONENT_MESSAGE_MISS, opponentName);
        } else {
            setCurrentHeroHealth(updatedCurrentHeroHealth);
            showMessage(MessagesEnum.OPPONENT_MESSAGE_ATTACK, opponentName, opponentAttackDamage);
        }
        setGameState(GameStateEnum.OPPONENT_DONE);
        console.log("Opponent attack hit chance:" + hitChanceResult);
    }, [
        currentHeroHealth,
        opponentAttackDamage,
        setGameState,
        opponentElement,
        heroElement,
        setCurrentHeroHealth,
        showMessage,
        opponentName,
    ]);

    return {
        opponentAttackCallback,
    };
};
