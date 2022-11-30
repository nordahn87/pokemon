import React, {FC, useCallback, useEffect, useState} from "react";
import {MessagesEnum} from "../../../models/messages.enum";
import {ClassListAdd, ClassListRemove} from "../../../helpers/classList.helper";
import {useMessages} from "../../../hooks/messages.provider";
import {usePokemons} from "../../../hooks/pokemon.provider";
import PA_Hero from "../../molecules/pokemons/Hero/Hero.component";
import PA_Opponent from "../../molecules/pokemons/Opponent/Opponent.component";
import PA_HeroAction from "../../molecules/actions/HeroAction/HeroAction.component";
import PA_OpponentAction from "../../molecules/actions/OpponentAction/OpponentAction.component";
import PA_MessageBox from "../../molecules/MessageBox/MessageBox.component";
import './Arena.scss'
import {useApiData} from "../../../hooks/apiData.provider";

const PA_Arena:FC = () => {
    //Game state - "LOADING", "READY_PLAYER1", "READY_PLAYER2", "PLAYER1_ACTING"
    // const [gamestate, SetGameState] = useState("LOADING")

    // Hooks
    const { showMessage } = useMessages();
    const { heroElement, opponentElement } = usePokemons();
    const { heroData, opponentData } = useApiData();
    const { message } = useMessages();

    // Disable button
    const [ buttonDisabled, setButtonDisabled ] = useState(false)

    // Attack
    const [quickAttackDamage, setQuickAttackDamage] = useState<number | null>(null)

    // Health state
    const [currentOppponentHealth, SetCurrentOppponentHealth ] = useState<number | null>(null)

    const heroName = heroData.species?.name;
    const opponentName = opponentData.species?.name;

    // Opponent current health
    useEffect(() => {
        SetCurrentOppponentHealth(30)
    },[])

    //Hero attacks - might add more damage types later on!
    useEffect(() => {
        setQuickAttackDamage(7)
    },[])

    // Hero doing quick attack
    const handlePlayerAttack = useCallback(() => {
        const updatedCurrentOpponentHealth = currentOppponentHealth! - quickAttackDamage!
        ClassListAdd(heroElement, "quick-attack-animation")
        ClassListAdd (opponentElement, "damage-taken-animation")

        if (updatedCurrentOpponentHealth <= 0) {
            SetCurrentOppponentHealth(0)
            showMessage(MessagesEnum.OPPONENT_KO, opponentName);
            setButtonDisabled(true)
        } else {
            SetCurrentOppponentHealth(updatedCurrentOpponentHealth)
            setButtonDisabled(true)
            showMessage(MessagesEnum.HERO_ATTACK, heroName, opponentName, quickAttackDamage);
        }
        
    },[currentOppponentHealth, quickAttackDamage, heroElement, opponentElement, showMessage])


    const attackAnimationEnd = () => {
        ClassListRemove(heroElement, "quick-attack-animation");
        ClassListRemove(opponentElement, "damage-taken-animation");
        setButtonDisabled(false)
    }

    return (
        <div className="arena-wrapper">
            <div>
                {message && message !== "" ? (
                    <PA_MessageBox />
                ) : null}

                <PA_Hero attackAnimationEnd={attackAnimationEnd} />

                <PA_HeroAction
                    handlePlayerAttack={handlePlayerAttack}
                    buttonDisabled={buttonDisabled}
                />
            </div>

            <div>
                <PA_OpponentAction currentOppponentHealth={currentOppponentHealth} />

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
