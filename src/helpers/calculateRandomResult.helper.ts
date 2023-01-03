export const calculateRandomResult = (maxChance: number) => {
    return Math.floor(Math.random() * maxChance) + 1;
};
