import { useCallback, useEffect } from "react";
import { TURN_ORDER_CHANCE } from "../constants/turnOrderChance";
import { MessagesEnum } from "../models/messages.enum";
import { GameStateEnum } from "../models/gameState.enum";
import { useApiData } from "../providers/data.provider";
import { useGameState } from "../providers/gamestate.provider";
import { useMessages } from "../providers/messages.provider";

export const useTurnOrder = () => {
    const { heroData, opponentData } = useApiData();
    const { setGameState } = useGameState();
    const { showMessage } = useMessages();

    const heroName = heroData.species?.name;
    const opponentName = opponentData.species?.name;

    const turnOrder = useCallback(() => {
        if (TURN_ORDER_CHANCE <= 4) {
            setGameState(GameStateEnum.OPPONENT_READY);
            showMessage(MessagesEnum.OPPONENT_MESSAGE_TURN, opponentName);
        } else {
            setGameState(GameStateEnum.HERO_READY);
            showMessage(MessagesEnum.HERO_MESSAGE_TURN, heroName);
        }
    }, [heroName, opponentName, setGameState, showMessage]);

    return {
        turnOrder,
    };
};
