import {FC, useEffect, useState} from "react";
import "./HealthBar.scss"

const PA_HealthBar:FC = () => {
    const [currentHealth, setCurrentHealth ] = useState(0)
    const [maxHealth, setMaxHealth ] = useState(0)

    useEffect(() => {
        setCurrentHealth(200)
        setMaxHealth(200)
    }, [currentHealth, maxHealth]);

    return (
        <div className="healthbar-container">
           {currentHealth}/{maxHealth}
        </div>
    );
};

export default PA_HealthBar;
