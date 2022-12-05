import React, { FC, useCallback, useEffect, useState } from "react";
import { GameStateEnum } from "../../../models/gameState.enum";
import { ActionsEnum } from "../../../models/actions.enum";
import { MessagesEnum } from "../../../models/messages.enum";
import { useApiData } from "../../../hooks/apiData.provider";
import { useMessages } from "../../../hooks/messages.provider";
import { useAnimation } from "../../../hooks/animation.provider";
import { usePlayers } from "../../../hooks/players.provider";
import { ClassListAdd, ClassListRemove } from "../../../helpers/classList.helper";
import PA_Hero from "../../molecules/pokemons/Hero/Hero.component";
import PA_Opponent from "../../molecules/pokemons/Opponent/Opponent.component";
import PA_HeroAction from "../../molecules/actions/HeroAction/HeroAction.component";
import PA_OpponentAction from "../../molecules/actions/OpponentAction/OpponentAction.component";
import PA_MessageBox from "../../molecules/MessageBox/MessageBox.component";
import "./Arena.scss";

const PA_Arena: FC = () => {
    const [gameState, setGameState] = useState(GameStateEnum.GAME_IDLE);

    // Hooks
    const { heroData, opponentData } = useApiData();
    const { message, showMessage, clearMessage } = useMessages();
    const { runningAnimation, setRunningAnimation } = useAnimation();

    const {
        currentOpponentHealth,
        SetCurrentOpponentHealth,
        opponentElement,
        currentHeroHealth,
        setCurrentHeroHealth,
        heroElement,
    } = usePlayers();

    // Players attack damage
    const [heroAttackDamage, setHeroAttackDamage] = useState<number | null>(null);
    const [opponentAttackDamage, setOpponentAttackDamage] = useState<number | null>(null);

    const heroName = heroData.species?.name;
    const opponentName = opponentData.species?.name;

    //Hero attacks - might add more damage types later on!
    useEffect(() => {
        setHeroAttackDamage(7);
        setOpponentAttackDamage(4);
        setGameState(GameStateEnum.HERO_READY);
    }, []);

    const handleOpponentAttack = useCallback(() => {
        setGameState(GameStateEnum.OPPONENT_ACT);
        ClassListAdd(opponentElement, "opponent-attack-animation");
        ClassListAdd(heroElement, "hero-takes-damage-animation");
        setRunningAnimation(ActionsEnum.OPPONENT_ACTION_ATTACK);
    }, [heroElement, opponentElement, setRunningAnimation]);

    const opponentAttackCallback = useCallback(() => {
        const updatedCurrentHeroHealth = currentHeroHealth - (opponentAttackDamage || 0);

        setGameState(GameStateEnum.OPPONENT_READY);

        ClassListRemove(opponentElement, "opponent-attack-animation");
        ClassListRemove(heroElement, "hero-takes-damage-animation");

        if (updatedCurrentHeroHealth <= 0) {
            setCurrentHeroHealth(0);
        } else {
            setCurrentHeroHealth(updatedCurrentHeroHealth);
        }
    }, [currentHeroHealth, opponentAttackDamage, heroElement, opponentElement, setCurrentHeroHealth]);

    // Hero doing quick attack
    const handleHeroAttack = useCallback(() => {
        setGameState(GameStateEnum.HERO_ACT);
        clearMessage();
        ClassListAdd(heroElement, "hero-attack-animation");
        ClassListAdd(opponentElement, "opponent-takes-damage-animation");
        setRunningAnimation(ActionsEnum.HERO_ACTION_ATTACK);
    }, [clearMessage, heroElement, opponentElement, setRunningAnimation]);

    const heroAttackCallback = useCallback(() => {
        const updatedCurrentOpponentHealth = currentOpponentHealth - (heroAttackDamage || 0);
        setGameState(GameStateEnum.HERO_READY);
        ClassListRemove(heroElement, "hero-attack-animation");
        ClassListRemove(opponentElement, "opponent-takes-damage-animation");

        if (updatedCurrentOpponentHealth <= 0) {
            SetCurrentOpponentHealth(0);
            showMessage(MessagesEnum.OPPONENT_MESSAGE_KO, opponentName);
        } else {
            SetCurrentOpponentHealth(updatedCurrentOpponentHealth);
            showMessage(MessagesEnum.HERO_MESSAGE_ATTACK, heroName, opponentName, heroAttackDamage);
        }
    }, [
        SetCurrentOpponentHealth,
        currentOpponentHealth,
        heroElement,
        heroName,
        opponentElement,
        opponentName,
        heroAttackDamage,
        showMessage,
    ]);

    return (
        <>
            <div style={{ backgroundColor: "white", zIndex: 4, padding: "5px" }}>
                <div>
                    Gamestate:
                    {JSON.stringify(gameState)}
                </div>
                <div>
                    Animationstate:
                    {JSON.stringify(runningAnimation)}
                </div>
            </div>
            <div className="arena-wrapper">
                <div>
                    {message && message !== "" ? <PA_MessageBox /> : null}

                    <PA_Hero heroAttackCallback={heroAttackCallback} />

                    <PA_HeroAction handleHeroAttack={handleHeroAttack} disableButton={gameState !== "HERO_READY"} />
                </div>

                <div>
                    <PA_OpponentAction />

                    <PA_Opponent opponentAttackCallback={opponentAttackCallback} />

                    <button onClick={handleOpponentAttack}>** TEMP Opponent Attack</button>
                </div>

                <div className="arena-scene">
                    <span className="skye"></span>
                    <span className="ground"></span>
                </div>
            </div>
        </>
    );
};

export default PA_Arena;
