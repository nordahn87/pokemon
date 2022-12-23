import { useCallback, useState } from "react";
import { calculatePercentResult } from "../helpers/calculatePercentResult.helper";
import { calculateRandomResult } from "../helpers/calculateRandomResult.helper";

export const useCaptureOpponent = (currentOpponentHealth: number, maxOpponentHealth: number) => {
    const [captureOpponent, setCaptureOpponent] = useState<boolean>(true);

    const handleCaptureOpponent = useCallback(() => {
        const opponentHealthPercentResult = calculatePercentResult(currentOpponentHealth, maxOpponentHealth, 0);
        const captureOpponentChanceResult = calculateRandomResult(10);
        console.log(opponentHealthPercentResult);

        console.log("Capture Opponent");
    }, [currentOpponentHealth, maxOpponentHealth]);

    return {
        handleCaptureOpponent,
        captureOpponent,
        setCaptureOpponent,
    };
};
