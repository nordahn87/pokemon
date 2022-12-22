import { Dispatch, SetStateAction, useCallback } from "react";
import { GameStateEnum } from "../../../../models/gameState.enum";
import { useGameState } from "../../../gamestate.provider";
import { RemoveClass } from "../../../../helpers/classList.helper";
import { usePlayers } from "../../players.provider";
import { calculateRandomResult } from "../../../../helpers/calculateRandomResult.helper";
import { MessagesEnum } from "../../../../models/messages.enum";
import { useMessages } from "../../../messages.provider";

export const useHeroAttackCallback = (
    heroName: string,
    opponentName: string,
    currentOpponentHealth: number,
    heroAttackDamage: number,
    SetCurrentOpponentHealth: Dispatch<SetStateAction<number | null>>,
) => {
    const { setGameState } = useGameState();
    const { showMessage } = useMessages();
    const { opponent, hero } = usePlayers();

    // Hero attack ending animation
    const heroAttackCallback = useCallback(() => {
        const updatedCurrentOpponentHealth = currentOpponentHealth - heroAttackDamage;
        const hitChanceResult = calculateRandomResult(10);

        RemoveClass(hero.heroElement, "hero-attack-animation");
        RemoveClass(opponent.opponentElement, "opponent-takes-damage-animation");

        if (updatedCurrentOpponentHealth <= 0) {
            SetCurrentOpponentHealth(0);
            return showMessage(MessagesEnum.OPPONENT_MESSAGE_DEFEATED, opponentName);
        }

        if (hitChanceResult <= 2) {
            showMessage(MessagesEnum.HERO_MESSAGE_MISS, heroName);
        } else {
            SetCurrentOpponentHealth(updatedCurrentOpponentHealth);
            showMessage(MessagesEnum.HERO_MESSAGE_ATTACK, heroName, heroAttackDamage);
        }
        setGameState(GameStateEnum.HERO_DONE);
        console.log("Hero attack hit chance:" + hitChanceResult);
    }, [
        currentOpponentHealth,
        heroAttackDamage,
        hero.heroElement,
        opponent.opponentElement,
        setGameState,
        SetCurrentOpponentHealth,
        showMessage,
        opponentName,
        heroName,
    ]);

    return {
        heroAttackCallback,
    };
};
