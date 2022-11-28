import {FC} from "react";
import {PA_AttackButtonProps} from "./AttackButton.props";
import "./AttackButton.scss"

const PA_AttackButton:FC<PA_AttackButtonProps> = ({playerData, handlePlayerAttack}) => {

    const moves = playerData.moves?.filter((item: any) => {
        return item.move.name === "quick-attack"
    })

    return (
        <>
            {moves?.map((item:any, index:any) => {
                return (
                    <button className="btn-attack-container" key={index} onClick={handlePlayerAttack}>
                        <div className="btn-content">
                            {item.move?.name.replace('-',' ')}
                        </div>
                    </button>
                )
            })}
        </>
    );
};

export default PA_AttackButton;
