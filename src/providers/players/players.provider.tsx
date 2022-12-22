import React, { useContext, useEffect, useRef, useState } from "react";
import { useApiData } from "../data.provider";

const PlayersContext = React.createContext<any>({});

export const PlayersProvider = (props: any): JSX.Element => {
    const { heroData, opponentData } = useApiData();
    // Hero health states
    const [currentHeroHealth, setCurrentHeroHealth] = useState<number | null>(null);
    const [maxHeroHealth, setMaxHeroHealth] = useState<number | null>(null);

    // Opponent health states
    const [currentOpponentHealth, SetCurrentOpponentHealth] = useState<number | null>(null);
    const [maxOpponentHealth, setMaxOpponentMaxHealth] = useState<number | null>(null);

    // Players attack damage states
    const [heroAttackDamage, setHeroAttackDamage] = useState<number | null>(null);
    const [opponentAttackDamage, setOpponentAttackDamage] = useState<number | null>(null);

    // Hero elementRef
    const heroElement = useRef(null);

    // Opponent elementRef
    const opponentElement = useRef(null);

    useEffect(() => {
        const heroMaxHealth = 121;
        const heroAttackDamage = 11;

        const opponentMaxHealth = 132;
        const opponentAttackDamage = 8;

        // Hero initial health
        setCurrentHeroHealth(maxHeroHealth);
        setMaxHeroHealth(heroMaxHealth);

        // Opponent initial health
        SetCurrentOpponentHealth(maxOpponentHealth);
        setMaxOpponentMaxHealth(opponentMaxHealth);

        // Players initial attack damage
        setHeroAttackDamage(heroAttackDamage || 0);
        setOpponentAttackDamage(opponentAttackDamage || 0);
    }, [maxHeroHealth, maxOpponentHealth]);

    const heroName = heroData.species?.name;
    const opponentName = opponentData.species?.name;
    const heroSprite = heroData.sprites?.versions["generation-v"]["black-white"].animated.back_default;
    const opponentSprite = opponentData.sprites?.versions["generation-v"]["black-white"].animated.front_default;

    return (
        <>
            <PlayersContext.Provider
                value={{
                    hero: {
                        heroName,
                        heroSprite,
                        heroElement,
                        health: {
                            currentHeroHealth,
                            setCurrentHeroHealth,
                            maxHeroHealth,
                            setMaxHeroHealth,
                        },
                        damage: {
                            heroAttackDamage,
                            setHeroAttackDamage,
                        },
                    },
                    opponent: {
                        opponentName,
                        opponentSprite,
                        opponentElement,
                        health: {
                            currentOpponentHealth,
                            SetCurrentOpponentHealth,
                            maxOpponentHealth,
                            setMaxOpponentMaxHealth,
                        },
                        damage: {
                            opponentAttackDamage,
                            setOpponentAttackDamage,
                        },
                    },
                }}
            >
                {props.children}
            </PlayersContext.Provider>
        </>
    );
};

export const usePlayers = (): any => useContext(PlayersContext);
