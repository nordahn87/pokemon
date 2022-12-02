import React, {useContext, useEffect, useRef, useState} from "react";

const OpponentContext = React.createContext<any>({});

export const OpponentProvider = ({ children }: any): JSX.Element => {
    const [currentOpponentHealth, SetCurrentOpponentHealth ] = useState<number | null>(null)
    const [maxOpponentHealth, setMaxOpponentMaxHealth] = useState<number | null>(null)

    const opponentElement = useRef(null);

    // Opponent health
    useEffect(() => {
        let maxHealth = 110

        SetCurrentOpponentHealth(maxOpponentHealth);
        setMaxOpponentMaxHealth(maxHealth);
    },[maxOpponentHealth])

    return (
        <OpponentContext.Provider value={{
            currentOpponentHealth,
            SetCurrentOpponentHealth,
            maxOpponentHealth,
            setMaxOpponentMaxHealth,
            opponentElement,
        }}>
            {children}
        </OpponentContext.Provider>
    );
}

export const useOpponent = (): any => useContext(OpponentContext);
