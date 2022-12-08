import React, { FC } from "react";
import { useApiData } from "../../../../hooks/apiData.provider";
import { usePlayers } from "../../../../hooks/players.provider";
import { useAnimation } from "../../../../hooks/animation.provider";
import { Action } from "../../../../models/action";
import { PA_OpponentProps } from "./Opponent.props";
import "./Opponent.scss";

const PA_Opponent: FC<PA_OpponentProps> = (props) => {
    const { opponentData } = useApiData();
    const { opponentElement } = usePlayers();
    const { runningAnimation, setRunningAnimation } = useAnimation();

    const opponentSprite = opponentData.sprites?.versions["generation-v"]["black-white"].animated.front_default;
    const opponentName = opponentData.species?.name;

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
                ref={opponentElement}
                onAnimationEnd={animationOpponentCallBack}
                src={opponentSprite}
                alt={opponentName}
            />
        </div>
    );
};

export default PA_Opponent;
