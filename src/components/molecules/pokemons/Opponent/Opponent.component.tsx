import React, { FC } from "react";
import { Action } from "../../../../models/action";
import { PA_OpponentProps } from "./Opponent.props";
import { usePlayers } from "../../../../providers/players/players.provider";
import { useAnimation } from "../../../../providers/animation.provider";
import { useApiData } from "../../../../providers/data.provider";
import "./Opponent.scss";

const PA_Opponent: FC<PA_OpponentProps> = (props) => {
    const { opponent } = usePlayers();
    const { pokeBallData } = useApiData();

    const { runningAnimation, setRunningAnimation } = useAnimation();

    const pokeBallSprite = pokeBallData.sprites?.default;

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
            {props.captureOpponent ? (
                <img src={pokeBallSprite} className="pokeball" alt="Pokeball" />
            ) : (
                <img
                    className="opponent-pokemon"
                    ref={opponent.opponentElement}
                    onAnimationEnd={animationOpponentCallBack}
                    src={opponent.opponentSprite}
                    alt={opponent.opponentName}
                />
            )}
        </div>
    );
};

export default PA_Opponent;
