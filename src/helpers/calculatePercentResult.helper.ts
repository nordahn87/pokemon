export const calculatePercentResult = (x: number, y: number, toFixed: number) => {
    return ((x / y) * 100).toFixed(toFixed);
};
