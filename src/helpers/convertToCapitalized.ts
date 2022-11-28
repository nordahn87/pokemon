export const convertToCapitalized = (value: string) => {
    const result: string[] = [];

    const characters = value.split("");

    characters.forEach((character, index) => {
        if (index === 0) {
            result.push(character.toUpperCase());
        }
        else {
            result.push(character);
        }
    })

    return result.join("");
};
