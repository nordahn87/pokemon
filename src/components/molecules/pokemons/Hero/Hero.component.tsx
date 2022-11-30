import {FC} from "react";
import {PA_PlayerProps} from "./Hero.props";
import {usePokemons} from "../../../../hooks/pokemon.provider";
import './Hero.scss'
import {useApiData} from "../../../../hooks/apiData.provider";


const PA_Hero:FC<PA_PlayerProps> = (props) => {
    const { heroElement } = usePokemons();
    const { heroData } = useApiData();

    const heroSprite = heroData.sprites?.versions["generation-v"]["black-white"].animated.back_default;
    const heroName = heroData.species?.name;

    return (
        <div className="hero-container">
            <img
                className="hero-pokemon"
                ref={heroElement}
                onAnimationEnd={props.attackAnimationEnd}
                src={heroSprite}
                alt={heroName}
            />
        </div>
    );
};

export default PA_Hero;
