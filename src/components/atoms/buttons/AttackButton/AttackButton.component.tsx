import {FC} from "react";
import {PA_AttackButtonProps} from "./AttackButton.props";
import "./AttackButton.scss"
import {useApiData} from "../../../../hooks/apiData.provider";

const PA_AttackButton:FC<PA_AttackButtonProps> = (props) => {

    const { heroData } = useApiData();

    const moves = heroData.moves?.filter((item: any) => {
        return item.move.name === "quick-attack"
    })

    return (
        <>
            {moves?.map((item: any, index: any) => {
                return (
                    <button
                        key={index}
                        onClick={props.handleHeroAttack}
                        className="btn-attack-container"
                        disabled={props.disableButton}>

                        <div className="btn-content">
                            {item.move?.name.replace('-', ' ')}
                        </div>
                    </button>
                )
            })}
        </>
    );
};

export default PA_AttackButton;
