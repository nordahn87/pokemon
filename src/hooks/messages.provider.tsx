import React, { useContext, useState} from "react";
import PA_MessageBox from "../components/molecules/MessageBox/MessageBox.component";
import {MessagesEnum} from "../models/messages.enum";

const MessagesContext = React.createContext<any>({});

export const MessagesProvider = ({ children }: any): JSX.Element => {
    const [message, setMessage] = useState<string>();

    // @ts-ignore
    const showMessage = (alias: string, ...rest) => {
        let result = "";
        switch (alias) {
            case MessagesEnum.PLAYER_ATTACK: {
                const playerName = rest?.[0];
                const opponentName = rest?.[1];
                const damageAmount = rest?.[2];

                result = `${playerName}: *Does a quick attack to ${opponentName} and deals ${damageAmount} damage`;
                break;
            }
        }
        setMessage(result);
    };

    const clearMessage = () => {
        setMessage(undefined);
    };

    return (
        <MessagesContext.Provider value={{
            message,
            showMessage,
            clearMessage
        }}>
            {message && message !== "" ? (
                <PA_MessageBox />
            ) : null}

            {children}
        </MessagesContext.Provider>
    );
};

export const useMessages = (): any => useContext(MessagesContext);
