export const hitChance = (state: any, message: string, setCurrentHealthState: any, updatedCurrentHealth: string) => {
    const hitChanceResult = Math.floor(Math.random() * 10) + 1;

    if (hitChanceResult <= 10 && hitChanceResult > 3) {
        state(message);
    } else {
        setCurrentHealthState(updatedCurrentHealth);
        state(message);
    }
};
