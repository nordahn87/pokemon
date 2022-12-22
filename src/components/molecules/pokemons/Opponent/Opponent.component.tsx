import React, { FC } from "react";
import { Action } from "../../../../models/action";
import { PA_OpponentProps } from "./Opponent.props";
import { usePlayers } from "../../../../providers/players/players.provider";
import { useAnimation } from "../../../../providers/animation.provider";
import "./Opponent.scss";

const PA_Opponent: FC<PA_OpponentProps> = (props) => {
    const { opponent } = usePlayers();
    const { runningAnimation, setRunningAnimation } = useAnimation();

    const animationOpponentCallBack = () => {
        switch (runningAnimation) {
            case Action.OPPONENT_ACTION_ATTACK:
                props.opponentAttackCallback();
                setRunningAnimation(undefined);
                break;
        }
    };

    return (
        <div className="opponent-pokemon-container">
            <img
                className="opponent-pokemon"
                ref={opponent.opponentElement}
                onAnimationEnd={animationOpponentCallBack}
                src={opponent.opponentSprite}
                alt={opponent.opponentName}
            />
        </div>
    );
};

export default PA_Opponent;
