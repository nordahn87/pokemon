import {FC, useCallback, useEffect, useState} from "react";
import {API_BASE_URL, ENDPOINT_PLAYER} from "../../../constants/baseUrls";
import {PA_API} from "../../../interface/api";
import "../AttackButton/AttackButton.scss"

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

    const handleAttack = useCallback(() => {
        console.log("Quick attack")
        setQuickAttackDamage(quickAttackDamage - currentHealth)
    }, [quickAttackDamage])

    return (
        <>
            {moves?.map((item:any, index:any) => {
                return (
                    <button key={index} onClick={handleAttack}>
                        {item.move.name}
                    </button>
                )
            })}
        </>
    );
};

export default PA_AttackButton;