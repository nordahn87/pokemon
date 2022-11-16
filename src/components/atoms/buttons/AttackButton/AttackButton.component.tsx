import {FC, useEffect, useState} from "react";
import {API_BASE_URL} from "../../../../constants/baseUrls";
import { ENDPOINT_PLAYER} from "../../../../constants/endpoints";
import {PA_API} from "../../../../interface/api";
import "./AttackButton.scss"

const PA_AttackButton:FC = () => {
    const [playerData, setPlayerData ] = useState<PA_API>({})
    const [quickAttackDamage, setQuickAttackDamage, ] = useState(5)

    useEffect(() => {
        fetch(`${API_BASE_URL}${ENDPOINT_PLAYER}`)
            .then((response) => response.json())
            .then((data) => {
                setPlayerData(data)
            })
    }, []);

    const moves = playerData.moves?.filter((item: any) => {
        return item.move.name === "quick-attack"
    })

    /*const handleAttack = useCallback(() => {
        console.log("Quick attack")
        setQuickAttackDamage(quickAttackDamage - currentHealth)
    }, [quickAttackDamage])*/

    return (
        <>
            {moves?.map((item:any, index:any) => {
                return (
                    <button className="btn-attack-container" key={index} onClick={() => console.log("Quick attack")}>
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