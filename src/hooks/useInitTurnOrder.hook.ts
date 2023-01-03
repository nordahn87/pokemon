import { useCallback } from "react";
import { TURN_ORDER_CHANCE } from "../constants/turnOrderChance";
import { MessagesEnum } from "../models/messages.enum";
import { GameStateEnum } from "../models/gameState.enum";
import { useApiData } from "../providers/data.provider";
import { useGameState } from "../providers/gamestate.provider";
import { useMessages } from "../providers/messages.provider";
import { useOpponentAttack } from "../providers/players/hooks/attack/useOpponentAttack.hooks";

export const useInitTurnOrder = () => {
    const { heroData, opponentData } = useApiData();
    const { handleOpponentAttack } = useOpponentAttack();
    const { setGameState } = useGameState();
    const { showMessage } = useMessages();

    const heroName = heroData.species?.name;
    const opponentName = opponentData.species?.name;

    const initTurnOrder = useCallback(() => {
        if (TURN_ORDER_CHANCE <= 4) {
            setGameState(GameStateEnum.OPPONENT_READY);
            showMessage(MessagesEnum.OPPONENT_MESSAGE_TURN, opponentName);
            setTimeout(handleOpponentAttack, 2000);
        } else {
            setGameState(GameStateEnum.HERO_READY);
            showMessage(MessagesEnum.HERO_MESSAGE_TURN, heroName);
        }
    }, [handleOpponentAttack, heroName, opponentName, setGameState, showMessage]);

    return {
        initTurnOrder,
    };
};
