import { useCallback } from "react";
import { GameStateEnum } from "../../../../models/gameState.enum";
import { Action } from "../../../../models/action";
import { useGameState } from "../../../gamestate.provider";
import { AddClass } from "../../../../helpers/classList.helper";
import { useAnimation } from "../../../animation.provider";
import { usePlayers } from "../../players.provider";

export const useHeroAttack = (clearMessage: () => void) => {
    const { setGameState } = useGameState();
    const { setRunningAnimation } = useAnimation();
    const { opponentElement, heroElement } = usePlayers();

    // Handle hero attack
    const handleHeroAttack = useCallback(() => {
        setGameState(GameStateEnum.HERO_ACT);
        clearMessage();
        AddClass(heroElement, "hero-attack-animation");
        AddClass(opponentElement, "opponent-takes-damage-animation");
        setRunningAnimation(Action.HERO_ACTION_ATTACK);
    }, [clearMessage, heroElement, opponentElement, setGameState, setRunningAnimation]);

    return {
        handleHeroAttack,
    };
};
