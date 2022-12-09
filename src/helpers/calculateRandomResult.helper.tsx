// Return a number from 1 to maxChance
export const calculateRandomResult = (maxChance: number) => {
    return Math.floor(Math.random() * maxChance) + 1;
};
