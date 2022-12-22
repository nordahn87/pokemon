import { Dispatch, SetStateAction, useCallback } from "react";
import { MessagesEnum } from "../../../../models/messages.enum";
import { GameStateEnum } from "../../../../models/gameState.enum";
import { useMessages } from "../../../messages.provider";
import { useGameState } from "../../../gamestate.provider";

export const usePotion = (
    heroName: string,
    currentHeroHealth: number,
    maxHeroHealth: number,
    setCurrentHeroHealth: Dispatch<SetStateAction<number | null>>,
) => {
    const { setGameState } = useGameState();
    const { showMessage } = useMessages();

    const handleHealingPotion = useCallback(() => {
        const healingAmount = 5;
        const updatedCurrentHeroHealth = currentHeroHealth + healingAmount;

        if (updatedCurrentHeroHealth >= maxHeroHealth) {
            setCurrentHeroHealth(maxHeroHealth);
            showMessage(MessagesEnum.HERO_MESSAGE_MAXHEALTH, heroName);
        } else {
            setCurrentHeroHealth(updatedCurrentHeroHealth);
            showMessage(MessagesEnum.HERO_MESSAGE_HEALED, heroName, healingAmount);
            setGameState(GameStateEnum.OPPONENT_READY);
        }
    }, [currentHeroHealth, heroName, maxHeroHealth, setCurrentHeroHealth, setGameState, showMessage]);

    return {
        handleHealingPotion,
    };
};
