import React, { FC } from "react";
import { useGameState } from "../../../hooks/gamestate.provider";
import { useAnimation } from "../../../hooks/animation.provider";
import "./GameStates.scss";

const PA_GameStates: FC = () => {
    const { gameState } = useGameState();
    const { runningAnimation } = useAnimation();
    return (
        <div className="gamestates">
            <div>Gamestate:{JSON.stringify(gameState)}</div>
            <div>Animationstate:{JSON.stringify(runningAnimation)}</div>
        </div>
    );
};

export default PA_GameStates;
