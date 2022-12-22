import { useCallback } from "react";
import { GameStateEnum } from "../../../../models/gameState.enum";
import { Action } from "../../../../models/action";
import { useGameState } from "../../../gamestate.provider";
import { AddClass } from "../../../../helpers/classList.helper";
import { useAnimation } from "../../../animation.provider";
import { usePlayers } from "../../players.provider";

export const useOpponentAttack = (clearMessage: () => void) => {
    const { setGameState } = useGameState();
    const { setRunningAnimation } = useAnimation();
    const { opponent, hero } = usePlayers();

    // Handle opponent attack
    const handleOpponentAttack = useCallback(() => {
        setGameState(GameStateEnum.OPPONENT_ACT);
        clearMessage();
        AddClass(opponent.opponentElement, "opponent-attack-animation");
        AddClass(hero.heroElement, "hero-takes-damage-animation");
        setRunningAnimation(Action.OPPONENT_ACTION_ATTACK);
    }, [clearMessage, hero.heroElement, opponent.opponentElement, setGameState, setRunningAnimation]);

    return {
        handleOpponentAttack,
    };
};
