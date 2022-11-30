import {FC} from "react";
import {PA_HeroProps} from "./Hero.props";
import {useApiData} from "../../../../hooks/apiData.provider";
import {useHero} from "../../../../hooks/players/hero.provider";
import './Hero.scss'

const PA_Hero:FC<PA_HeroProps> = (props) => {

    const { heroElement } = useHero();
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
