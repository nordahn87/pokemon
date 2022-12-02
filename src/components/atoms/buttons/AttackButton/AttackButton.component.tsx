import {FC} from "react";
import {PA_AttackButtonProps} from "./AttackButton.props";
import {useApiData} from "../../../../hooks/apiData.provider";
import "./AttackButton.scss"

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
                        className="attack-button-container"
                        disabled={props.disableButton}>

                        <div>
                            {item.move?.name.replace('-', ' ')}
                        </div>
                    </button>
                )
            })}
        </>
    );
};

export default PA_AttackButton;
