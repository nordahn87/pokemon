import React, { FC } from "react";
import { Action } from "../../../../models/action";
import { PA_OpponentProps } from "./Opponent.props";
import { useApiData } from "../../../../hooks/apiData.provider";
import { usePlayers } from "../../../../hooks/players.provider";
import { useAnimation } from "../../../../hooks/animation.provider";
import "./Opponent.scss";
import { useCaptureOpponent } from "../../../../hooks/capture.provider";

const PA_Opponent: FC<PA_OpponentProps> = (props) => {
    const { opponentData, pokeBallData } = useApiData();
    const { captureOpponent } = useCaptureOpponent();
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

    const pokeBallSprite = pokeBallData.sprites?.default;

    return (
        <div className="opponent-pokemon-container">
            {captureOpponent ? (
                <img className="pokeball" src={pokeBallSprite} alt="Pokeball" />
            ) : (
                <img
                    className="opponent-pokemon"
                    ref={opponentElement}
                    onAnimationEnd={animationOpponentCallBack}
                    src={opponentSprite}
                    alt={opponentName}
                />
            )}
        </div>
    );
};

export default PA_Opponent;
