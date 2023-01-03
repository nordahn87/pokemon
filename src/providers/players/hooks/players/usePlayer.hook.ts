import { useEffect, useRef, useState } from "react";
import { useApiData } from "../../../data.provider";

export const usePlayer = () => {
    const { heroData } = useApiData();

    const heroName = heroData.species?.name;
    const heroSprite = heroData.sprites?.versions["generation-v"]["black-white"].animated.back_default;

    // Hero elementRef
    const heroElement = useRef(null);

    // Hero health states
    const [currentHeroHealth, setCurrentHeroHealth] = useState<number | null>(null);
    const [maxHeroHealth, setMaxHeroHealth] = useState<number | null>(null);

    // Hero attack damage states
    const [heroAttackDamage, setHeroAttackDamage] = useState<number | null>(null);

    useEffect(() => {
        const heroMaxHealth = 121;
        const heroAttackDamage = 34;

        // Hero initial health
        setCurrentHeroHealth(maxHeroHealth);
        setMaxHeroHealth(heroMaxHealth);

        // Hero initial attack damage
        setHeroAttackDamage(heroAttackDamage || 0);
    }, [maxHeroHealth]);

    return {
        heroElement,
        heroName,
        heroSprite,
        currentHeroHealth,
        setCurrentHeroHealth,
        maxHeroHealth,
        setMaxHeroHealth,
        heroAttackDamage,
        setHeroAttackDamage,
    };
};
