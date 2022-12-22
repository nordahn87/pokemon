import React, { useContext } from "react";
import { usePlayer } from "./hooks/players/usePlayer.hook";
import { useOpponent } from "./hooks/players/useOpponent.hook";

const PlayersContext = React.createContext<any>({});

export const PlayersProvider = (props: any): JSX.Element => {
    const {
        heroElement,
        heroName,
        heroSprite,
        currentHeroHealth,
        setCurrentHeroHealth,
        maxHeroHealth,
        setMaxHeroHealth,
        heroAttackDamage,
        setHeroAttackDamage,
    } = usePlayer();

    const {
        opponentElement,
        opponentName,
        opponentSprite,
        currentOpponentHealth,
        setCurrentOpponentHealth,
        maxOpponentHealth,
        setMaxOpponentHealth,
        opponentAttackDamage,
        setOpponentAttackDamage,
    } = useOpponent();

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
                            setCurrentOpponentHealth,
                            maxOpponentHealth,
                            setMaxOpponentHealth,
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
