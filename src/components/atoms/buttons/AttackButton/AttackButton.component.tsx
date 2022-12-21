import { FC } from "react";
import { PA_AttackButtonProps } from "./AttackButton.props";
import { useApiData } from "../../../../providers/apiData.provider";
import "./AttackButton.scss";
import { useGameState } from "../../../../providers/gamestate.provider";

const PA_AttackButton: FC<PA_AttackButtonProps> = (props) => {
    const { heroData } = useApiData();
    const { isGameStateHeroDone } = useGameState();

    const moves = heroData.moves?.filter((item: any) => {
        return item.move.name === "quick-attack";
    });

    return (
        <>
            {moves?.map((item: any, index: any) => {
                return (
                    <button
                        key={index}
                        onClick={props.handleHeroAttack}
                        disabled={isGameStateHeroDone}
                        className="attack-button-container"
                    >
                        <div>{item.move?.name.replace("-", " ")}</div>
                    </button>
                );
            })}
        </>
    );
};

export default PA_AttackButton;
