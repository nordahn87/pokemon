import React, { useContext, useState } from "react";
import { MessagesEnum } from "../models/messages.enum";
import { convertToCapitalizedHelper } from "../helpers/convertToCapitalized.helper";

const MessagesContext = React.createContext<any>({});

export const MessagesProvider = ({ children }: any): JSX.Element => {
    const [message, setMessage] = useState<string>();

    const showMessage = (alias: string, ...rest: string[]) => {
        let result = "";
        switch (alias) {
            case MessagesEnum.HERO_MESSAGE_ATTACK: {
                const heroName = convertToCapitalizedHelper(rest?.[0]);
                const damageAmount = rest?.[2];

                result = `${heroName}: Does a quick attack and deals ${damageAmount} damage`;
                break;
            }
            case MessagesEnum.OPPONENT_MESSAGE_KO: {
                const opponentName = convertToCapitalizedHelper(rest?.[0]);

                result = `${opponentName}: Is defeated`;
                break;
            }
        }
        setMessage(result);
        addSpaceBarEventListener();
    };

    const addSpaceBarEventListener = () => {
        document.addEventListener("keyup", onKeyupClicked);
    };

    const onKeyupClicked = (event: any) => {
        if (event.code === "Space") {
            setMessage(undefined);
            document.removeEventListener("keyup", onKeyupClicked);
        }
    };

    const clearMessage = () => {
        setMessage(undefined);
    };

    return (
        <MessagesContext.Provider
            value={{
                message,
                showMessage,
                clearMessage,
            }}
        >
            {children}
        </MessagesContext.Provider>
    );
};

export const useMessages = (): any => useContext(MessagesContext);
