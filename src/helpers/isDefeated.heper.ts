export const isPlayerDefeated = (currentHealth: number, message: string) => {
    if (currentHealth === 0) {
        console.log(message);
    }
};
