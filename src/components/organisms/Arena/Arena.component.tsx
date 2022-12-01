import React, {FC, useCallback, useEffect, useState} from "react";
import {MessagesEnum} from "../../../models/messages.enum";
import {useApiData} from "../../../hooks/apiData.provider";
import {ClassListAdd, ClassListRemove} from "../../../helpers/classList.helper";
import {useMessages} from "../../../hooks/messages.provider";
import {useHero} from "../../../hooks/players/hero.provider";
import {useOpponent} from "../../../hooks/players/opponent.provider";
import PA_Hero from "../../molecules/pokemons/Hero/Hero.component";
import PA_Opponent from "../../molecules/pokemons/Opponent/Opponent.component";
import PA_HeroAction from "../../molecules/actions/HeroAction/HeroAction.component";
import PA_OpponentAction from "../../molecules/actions/OpponentAction/OpponentAction.component";
import PA_MessageBox from "../../molecules/MessageBox/MessageBox.component";
import './Arena.scss'

const PA_Arena:FC = () => {

    const [ gameState, setGameState ] = useState("IDLE");

    // Hooks
    const { heroData, opponentData } = useApiData();
    const { showMessage, clearMessage } = useMessages();
    const { message } = useMessages();
    const { heroElement} = useHero();
    const { currentOpponentHealth, SetCurrentOpponentHealth, opponentElement } = useOpponent();

    // Attack
    const [quickAttackDamage, setQuickAttackDamage] = useState<number | null>(null)

    const heroName = heroData.species?.name;
    const opponentName = opponentData.species?.name;

    //Hero attacks - might add more damage types later on!
    useEffect(() => {
        setQuickAttackDamage(7);
        setGameState("HERO_READY")
    },[]);

    // Hero doing quick attack
    const handleHeroAttack = useCallback(() => {
        setGameState("HERO_ACT")
        clearMessage();
        ClassListAdd(heroElement, "quick-attack-animation")
        ClassListAdd (opponentElement, "damage-taken-animation")
    },[heroElement, opponentElement, clearMessage])


    const heroAttackCallback = useCallback(() => {
        const updatedCurrentOpponentHealth = currentOpponentHealth! - quickAttackDamage!
        setGameState("HERO_READY")

        ClassListRemove(heroElement, "quick-attack-animation");
        ClassListRemove(opponentElement, "damage-taken-animation");
        
        if (updatedCurrentOpponentHealth <= 0) {
            SetCurrentOpponentHealth(0)
            showMessage(MessagesEnum.OPPONENT_KO, opponentName);
        } else {
            SetCurrentOpponentHealth(updatedCurrentOpponentHealth)
            showMessage(MessagesEnum.HERO_ATTACK, heroName, opponentName, quickAttackDamage);
        }
    },[SetCurrentOpponentHealth, currentOpponentHealth, heroElement, heroName, opponentElement, opponentName, quickAttackDamage, showMessage])

    return (
        <div className="arena-wrapper">
            {JSON.stringify(gameState)}
            <div>
                {message && message !== "" ? (
                    <PA_MessageBox />
                ) : null}

                <PA_Hero heroAttackCallback={heroAttackCallback} />

                <PA_HeroAction
                    handleHeroAttack={handleHeroAttack}
                    disableButton={gameState !== "HERO_READY"}
                />
            </div>

            <div>
                <PA_OpponentAction />

                <PA_Opponent />
            </div>

           <div className="arena-scene">
                <span className="skye"></span>
                <span className="ground"></span>
            </div>
        </div>
    );
};

export default PA_Arena;
