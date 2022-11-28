import React, {useContext, useEffect, useState} from "react";
import PA_MessageBox from "../components/molecules/MessageBox/MessageBox.component";
import {MessagesEnum} from "../models/messages.enum";
import {convertToCapitalized} from "../helpers/convertToCapitalized";

const MessagesContext = React.createContext<any>({});

export const MessagesProvider = ({ children }: any): JSX.Element => {
    const [message, setMessage] = useState<string>();

    // @ts-ignore
    const showMessage = (alias: string, ...rest) => {
        let result = "";
        switch (alias) {
            case MessagesEnum.PLAYER_ATTACK: {
                const playerName = convertToCapitalized(rest?.[0]);
                const damageAmount = rest?.[2];

                result = `${playerName}: Does a quick attack and deals ${damageAmount} damage`;
                break;
            }
            case MessagesEnum.OPPONENT_KO: {
                const opponentName = convertToCapitalized(rest?.[1]);

                result = `${opponentName}: Is defeated`;
                break;
            }
        }
        setMessage(result);
    };

    useEffect(() => {
        setTimeout(() => {
            setMessage(undefined)
        }, 4000);
    }, [message]);

    return (
        <MessagesContext.Provider value={{
            message,
            showMessage,

        }}>
            {message && message !== "" ? (
                <PA_MessageBox />
            ) : null}

            {children}
        </MessagesContext.Provider>
    );
};

export const useMessages = (): any => useContext(MessagesContext);
