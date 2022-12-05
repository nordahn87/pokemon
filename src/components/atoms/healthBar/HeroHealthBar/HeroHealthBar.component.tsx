import { FC } from "react";
import { usePlayers } from "../../../../hooks/players.provider";
import "./HeroHealthBar.scss";

const PA_HeroHealthBar: FC = () => {
    const { currentHeroHealth, maxHeroHealth } = usePlayers();

    return (
        <div className="hero-healthbar-container">
            <div className="hero-healthbar-hp">HP</div>
            <div>
                {currentHeroHealth}/{maxHeroHealth}
            </div>
        </div>
    );
};

export default PA_HeroHealthBar;
