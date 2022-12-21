import React, { FC, useCallback, useEffect } from "react";
import { GameStateEnum } from "../../../models/gameState.enum";
import { Action } from "../../../models/action";
import { MessagesEnum } from "../../../models/messages.enum";
import { TURN_ORDER_CHANCE } from "../../../constants/turnOrderChance";
import { useApiData } from "../../../providers/apiData.provider";
import { useMessages } from "../../../providers/messages.provider";
import { useAnimation } from "../../../providers/animation.provider";
import { usePlayers } from "../../../providers/players/players.provider";
import { useGameState } from "../../../providers/gamestate.provider";
import { ClassListAdd, ClassListRemove } from "../../../helpers/classList.helper";
import { calculateRandomResult } from "../../../helpers/calculateRandomResult.helper";
import PA_Hero from "../../molecules/pokemons/Hero/Hero.component";
import PA_Opponent from "../../molecules/pokemons/Opponent/Opponent.component";
import PA_HeroAction from "../../molecules/actions/HeroAction/HeroAction.component";
import PA_OpponentAction from "../../molecules/actions/OpponentAction/OpponentAction.component";
import PA_MessageBox from "../../molecules/MessageBox/MessageBox.component";
import PA_GameStates from "../../molecules/gameStates/GameStates.component";
import "./Arena.scss";
import { usePotion } from "../../../providers/players/hooks/userPotions.hooks";

const PA_Arena: FC = () => {
    // Hooks
    const { gameState, setGameState, isGameStateOpponentReady } = useGameState();
    const { heroData, opponentData } = useApiData();
    const { message, showMessage, clearMessage } = useMessages();
    const { setRunningAnimation } = useAnimation();
    // TODO Look into this later
    /* const {addClass, removeClass} = usePlayerElement(opponentElement);*/

    const {
        currentOpponentHealth,
        SetCurrentOpponentHealth,
        opponentElement,
        currentHeroHealth,
        setCurrentHeroHealth,
        heroElement,
        heroAttackDamage,
        opponentAttackDamage,
        maxHeroHealth,
    } = usePlayers();

    // TODO Find a better way to deal with names
    const heroName = heroData.species?.name;
    const opponentName = opponentData.species?.name;

    // TODO Need to refactor handleOpponentAttack
    // Opponent attack
    const handleOpponentAttack = useCallback(() => {
        setGameState(GameStateEnum.OPPONENT_ACT);
        clearMessage();
        ClassListAdd(opponentElement, "opponent-attack-animation");
        ClassListAdd(heroElement, "hero-takes-damage-animation");
        setRunningAnimation(Action.OPPONENT_ACTION_ATTACK);
    }, [clearMessage, heroElement, opponentElement, setGameState, setRunningAnimation]);

    // TODO Need to refactor opponentAttackCallback
    // Opponent attack ending animation
    const opponentAttackCallback = useCallback(() => {
        const updatedCurrentHeroHealth = currentHeroHealth - opponentAttackDamage;
        const hitChanceResult = calculateRandomResult(10);

        ClassListRemove(opponentElement, "opponent-attack-animation");
        ClassListRemove(heroElement, "hero-takes-damage-animation");

        if (updatedCurrentHeroHealth <= 0) {
            setCurrentHeroHealth(0);
            return showMessage(MessagesEnum.OPPONENT_MESSAGE_DEFEATED, opponentName);
        }

        if (hitChanceResult <= 3) {
            showMessage(MessagesEnum.OPPONENT_MESSAGE_MISS, opponentName);
        } else {
            setCurrentHeroHealth(updatedCurrentHeroHealth);
            showMessage(MessagesEnum.OPPONENT_MESSAGE_ATTACK, opponentName, opponentAttackDamage);
        }
        setGameState(GameStateEnum.OPPONENT_DONE);
        console.log("Opponent attack hit chance:" + hitChanceResult);
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

    // TODO Need to refactor handleHeroAttack
    // Hero attack
    const handleHeroAttack = useCallback(() => {
        setGameState(GameStateEnum.HERO_ACT);
        clearMessage();
        ClassListAdd(heroElement, "hero-attack-animation");
        ClassListAdd(opponentElement, "opponent-takes-damage-animation");
        setRunningAnimation(Action.HERO_ACTION_ATTACK);
    }, [clearMessage, heroElement, opponentElement, setGameState, setRunningAnimation]);

    // TODO Need to refactor heroAttackCallback
    // Hero attack ending animation
    const heroAttackCallback = useCallback(() => {
        const updatedCurrentOpponentHealth = currentOpponentHealth - heroAttackDamage;
        const hitChanceResult = calculateRandomResult(10);

        ClassListRemove(heroElement, "hero-attack-animation");
        ClassListRemove(opponentElement, "opponent-takes-damage-animation");

        if (updatedCurrentOpponentHealth <= 0) {
            SetCurrentOpponentHealth(0);
            return showMessage(MessagesEnum.OPPONENT_MESSAGE_DEFEATED, opponentName);
        }

        if (hitChanceResult <= 2) {
            showMessage(MessagesEnum.HERO_MESSAGE_MISS, heroName);
        } else {
            SetCurrentOpponentHealth(updatedCurrentOpponentHealth);
            showMessage(MessagesEnum.HERO_MESSAGE_ATTACK, heroName, heroAttackDamage);
        }
        setGameState(GameStateEnum.HERO_DONE);
        console.log("Hero attack hit chance:" + hitChanceResult);
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

    // Healing potion
    const { handleHealingPotion } = usePotion(currentHeroHealth, maxHeroHealth, setCurrentHeroHealth);

    // TODO Need to refactor turnOrder
    // Calculate turn order
    const turnOrder = useCallback(() => {
        if (TURN_ORDER_CHANCE <= 4) {
            setGameState(GameStateEnum.OPPONENT_READY);
            showMessage(MessagesEnum.OPPONENT_MESSAGE_TURN, opponentName);
        } else {
            setGameState(GameStateEnum.HERO_READY);
            showMessage(MessagesEnum.HERO_MESSAGE_TURN, heroName);
        }
    }, [heroName, opponentName, setGameState, showMessage]);

    // Games initial encounter
    useEffect(() => {
        if (gameState === GameStateEnum.GAME_INIT && heroName && opponentName) {
            turnOrder();
            console.count("Rerender");
        }

        if (gameState === GameStateEnum.HERO_DONE && message === undefined) {
            showMessage(MessagesEnum.OPPONENT_MESSAGE_TURN, opponentName);
            setGameState(GameStateEnum.OPPONENT_READY);
            console.log(message);
        }

        if (gameState === GameStateEnum.OPPONENT_DONE && message === undefined) {
            showMessage(MessagesEnum.HERO_MESSAGE_TURN, heroName);
            setGameState(GameStateEnum.HERO_READY);
            console.log(message);
        }
    }, [clearMessage, gameState, heroName, message, opponentName, setGameState, showMessage, turnOrder]);

    return (
        <>
            <PA_GameStates />
            <div className="arena-wrapper">
                <div>
                    {message && message !== "" ? <PA_MessageBox /> : null}

                    <PA_Hero heroAttackCallback={heroAttackCallback} />

                    <PA_HeroAction handleHeroAttack={handleHeroAttack} handleHealingPotion={handleHealingPotion} />
                </div>

                <div>
                    <PA_OpponentAction />
                    <PA_Opponent opponentAttackCallback={opponentAttackCallback} />

                    {/* TODO This has to be a function running when hero has finished his turn*/}
                    <button onClick={handleOpponentAttack} disabled={isGameStateOpponentReady}>
                        ** TEMP Opponent Attack
                    </button>
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
