import React, { useContext, useEffect, useRef, useState } from "react";

const PlayersContext = React.createContext<any>({});

export const PlayersProvider = (props: any): JSX.Element => {
    // TODO not sure having hero and opponent in same provider is the best way to handle global values

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

    return (
        <>
            <PlayersContext.Provider
                value={{
                    currentHeroHealth,
                    setCurrentHeroHealth,
                    maxHeroHealth,
                    setMaxHeroHealth,
                    heroElement,
                    currentOpponentHealth,
                    SetCurrentOpponentHealth,
                    maxOpponentHealth,
                    setMaxOpponentMaxHealth,
                    heroAttackDamage,
                    setHeroAttackDamage,
                    opponentAttackDamage,
                    setOpponentAttackDamage,
                    opponentElement,
                }}
            >
                {props.children}
            </PlayersContext.Provider>
        </>
    );
};

export const usePlayers = (): any => useContext(PlayersContext);
