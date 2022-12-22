import { useEffect, useRef, useState } from "react";
import { useApiData } from "../../../data.provider";

export const useOpponent = () => {
    const { opponentData } = useApiData();

    const opponentName = opponentData.species?.name;
    const opponentSprite = opponentData.sprites?.versions["generation-v"]["black-white"].animated.front_default;

    // Opponent elementRef
    const opponentElement = useRef(null);

    // Opponent health states
    const [currentOpponentHealth, setCurrentOpponentHealth] = useState<number | null>(null);
    const [maxOpponentHealth, setMaxOpponentHealth] = useState<number | null>(null);

    // Opponent  attack damage states
    const [opponentAttackDamage, setOpponentAttackDamage] = useState<number | null>(null);

    useEffect(() => {
        const opponentMaxHealth = 132;
        const opponentAttackDamage = 8;

        // Opponent initial health
        setCurrentOpponentHealth(maxOpponentHealth);
        setMaxOpponentHealth(opponentMaxHealth);

        // Opponent initial attack damage
        setOpponentAttackDamage(opponentAttackDamage || 0);
    }, [maxOpponentHealth]);

    return {
        opponentElement,
        opponentName,
        opponentSprite,
        currentOpponentHealth,
        setCurrentOpponentHealth,
        maxOpponentHealth,
        setMaxOpponentHealth,
        opponentAttackDamage,
        setOpponentAttackDamage,
    };
};
