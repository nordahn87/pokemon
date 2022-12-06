// Calculate turn order
export const turnOrder = (heroStatus: string, opponentStatus: string, setState: (newState: string) => void) => {
    const result = Math.floor(Math.random() * 10) + 1;

    if (result <= 10 && result > 3) {
        setState(heroStatus);
    } else {
        setState(opponentStatus);
    }
};
