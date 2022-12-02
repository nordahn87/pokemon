import React, { useContext, useEffect, useRef, useState } from "react";

const HeroContext = React.createContext<any>({});

export const HeroProvider = ({ children }: any): JSX.Element => {
    const [currentHeroHealth, SetCurrentHeroHealth] = useState<number | null>(
        null,
    );
    const [maxHeroHealth, setMaxHeroHealth] = useState<number | null>(null);

    const heroElement = useRef(null);

    // Hero health
    useEffect(() => {
        let maxHealth = 120;

        SetCurrentHeroHealth(maxHeroHealth);
        setMaxHeroHealth(maxHealth);
    }, [maxHeroHealth]);

    return (
        <HeroContext.Provider
            value={{
                currentHeroHealth,
                SetCurrentHeroHealth,
                maxHeroHealth,
                setMaxHeroHealth,
                heroElement,
            }}
        >
            {children}
        </HeroContext.Provider>
    );
};

export const useHero = (): any => useContext(HeroContext);
