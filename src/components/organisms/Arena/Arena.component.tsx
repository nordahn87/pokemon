import React, { FC, useCallback, useEffect } from "react";
import { GameStateEnum } from "../../../models/gameState.enum";
import { ActionsEnum } from "../../../models/actions.enum";
import { MessagesEnum } from "../../../models/messages.enum";
import { useApiData } from "../../../hooks/apiData.provider";
import { useMessages } from "../../../hooks/messages.provider";
import { useAnimation } from "../../../hooks/animation.provider";
import { usePlayers } from "../../../hooks/players.provider";
import { useGameState } from "../../../hooks/gamestate.provider";
import { ClassListAdd, ClassListRemove } from "../../../helpers/classList.helper";
import { turnOrder } from "../../../helpers/random.helper";
import PA_Hero from "../../molecules/pokemons/Hero/Hero.component";
import PA_Opponent from "../../molecules/pokemons/Opponent/Opponent.component";
import PA_HeroAction from "../../molecules/actions/HeroAction/HeroAction.component";
import PA_OpponentAction from "../../molecules/actions/OpponentAction/OpponentAction.component";
import PA_MessageBox from "../../molecules/MessageBox/MessageBox.component";
import "./Arena.scss";

const PA_Arena: FC = () => {
    // Hooks
    const { gameState, setGameState } = useGameState();
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
        heroAttackDamage,
        opponentAttackDamage,
    } = usePlayers();

    // TODO find a better way to deal with names
    const heroName = heroData.species?.name;
    const opponentName = opponentData.species?.name;

    // Games initial encounter
    useEffect(() => {
        turnOrder(GameStateEnum.HERO_READY, GameStateEnum.OPPONENT_READY, setGameState);

        const test = () => {
            const result = Math.floor(Math.random() * 10) + 1;

            if (result <= 10 && result > 3) {
                console.log("Attack deals damage");
            } else {
                console.log("Attack missed");
            }
            console.log(result);
        };
        test();
    }, [setGameState]);

    // Opponent attack
    const handleOpponentAttack = useCallback(() => {
        setGameState(GameStateEnum.OPPONENT_ACT);
        clearMessage();
        ClassListAdd(opponentElement, "opponent-attack-animation");
        ClassListAdd(heroElement, "hero-takes-damage-animation");
        setRunningAnimation(ActionsEnum.OPPONENT_ACTION_ATTACK);
    }, [clearMessage, heroElement, opponentElement, setGameState, setRunningAnimation]);

    // Opponent ending animation
    const opponentAttackCallback = useCallback(() => {
        const updatedCurrentHeroHealth = currentHeroHealth - opponentAttackDamage;
        setGameState(GameStateEnum.HERO_READY);
        ClassListRemove(opponentElement, "opponent-attack-animation");
        ClassListRemove(heroElement, "hero-takes-damage-animation");

        if (updatedCurrentHeroHealth <= 0) {
            setCurrentHeroHealth(0);
        } else {
            setCurrentHeroHealth(updatedCurrentHeroHealth);
            showMessage(MessagesEnum.OPPONENT_MESSAGE_ATTACK, opponentName, opponentAttackDamage);
        }
    }, [
        currentHeroHealth,
        opponentAttackDamage,
        setGameState,
        opponentElement,
        heroElement,
        setCurrentHeroHealth,
        showMessage,
        opponentName,
    ]);

    // Hero attack
    const handleHeroAttack = useCallback(() => {
        setGameState(GameStateEnum.HERO_ACT);
        clearMessage();
        ClassListAdd(heroElement, "hero-attack-animation");
        ClassListAdd(opponentElement, "opponent-takes-damage-animation");
        setRunningAnimation(ActionsEnum.HERO_ACTION_ATTACK);
    }, [clearMessage, heroElement, opponentElement, setGameState, setRunningAnimation]);

    // Hero ending animation
    const heroAttackCallback = useCallback(() => {
        const updatedCurrentOpponentHealth = currentOpponentHealth - heroAttackDamage;
        setGameState(GameStateEnum.OPPONENT_READY);
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
        currentOpponentHealth,
        heroAttackDamage,
        setGameState,
        heroElement,
        opponentElement,
        SetCurrentOpponentHealth,
        showMessage,
        opponentName,
        heroName,
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
