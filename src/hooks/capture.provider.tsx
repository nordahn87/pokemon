import React, { useContext, useState } from "react";

const CaptureOpponentContext = React.createContext<any>({});

export const CaptureOpponentProvider = (props: any): JSX.Element => {
    const [captureOpponent, setCaptureOpponent] = useState(false);

    return (
        <CaptureOpponentContext.Provider
            value={{
                captureOpponent,
                setCaptureOpponent,
            }}
        >
            {props.children}
        </CaptureOpponentContext.Provider>
    );
};

export const useCaptureOpponent = (): any => useContext(CaptureOpponentContext);
