import { useCallback, useState } from "react";
import { calculatePercentResult } from "../helpers/calculatePercentResult.helper";
import { calculateRandomResult } from "../helpers/calculateRandomResult.helper";
import { MessagesEnum } from "../models/messages.enum";
import { GameStateEnum } from "../models/gameState.enum";
import { useGameState } from "../providers/gamestate.provider";
import { useMessages } from "../providers/messages.provider";
import { usePlayers } from "../providers/players/players.provider";
import { AddClass, RemoveClass } from "../helpers/classList.helper";
import { useItems } from "../providers/items/items.provider";

export const useCaptureOpponent = (currentOpponentHealth: number, maxOpponentHealth: number) => {
    const [captureOpponent, setCaptureOpponent] = useState<boolean>(false);
    const { pokeBall } = useItems();
    const { setGameState } = useGameState();
    const { clearMessage, showMessage } = useMessages();
    const { opponent } = usePlayers();

    const captureOpponentResult = useCallback(() => {
        const opponentHealthPercentResult = calculatePercentResult(currentOpponentHealth, maxOpponentHealth);
        const captureOpponentChanceResult = calculateRandomResult(10);
        console.log(opponentHealthPercentResult);
        console.log(captureOpponentChanceResult);

        // 40 = 40%
        if (opponentHealthPercentResult > 40) {
            setCaptureOpponent(false);
            showMessage(MessagesEnum.OPPONENT_MESSAGE_CAPTURED_FAILED, opponent.opponentName);
            setGameState(GameStateEnum.HERO_DONE);
        }

        if (opponentHealthPercentResult <= 40 && captureOpponentChanceResult <= 4) {
            setCaptureOpponent(true);
            RemoveClass(pokeBall.pokeBallElement, "capture");
            AddClass(pokeBall.pokeBallElement, "capture-success");
            showMessage(MessagesEnum.OPPONENT_MESSAGE_CAPTURED_SUCCEED, opponent.opponentName);
        }

        if (opponentHealthPercentResult <= 20 && captureOpponentChanceResult >= 4) {
            setCaptureOpponent(true);
            RemoveClass(pokeBall.pokeBallElement, "capture");
            AddClass(pokeBall.pokeBallElement, "capture-success");
            showMessage(MessagesEnum.OPPONENT_MESSAGE_CAPTURED_SUCCEED, opponent.opponentName);
        }

        if (opponentHealthPercentResult <= 10 && captureOpponentChanceResult >= 1) {
            setCaptureOpponent(true);
            RemoveClass(pokeBall.pokeBallElement, "capture");
            AddClass(pokeBall.pokeBallElement, "capture-success");
            showMessage(MessagesEnum.OPPONENT_MESSAGE_CAPTURED_SUCCEED, opponent.opponentName);
        }
    }, [currentOpponentHealth, maxOpponentHealth, opponent.opponentName, pokeBall.pokeBallElement, showMessage]);

    const handleCaptureOpponent = useCallback(() => {
        setCaptureOpponent(true);
        clearMessage();
        setTimeout(captureOpponentResult, 3000);
    }, [captureOpponentResult]);

    return {
        handleCaptureOpponent,
        captureOpponent,
        setCaptureOpponent,
    };
};
