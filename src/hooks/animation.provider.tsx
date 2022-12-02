import React, {useContext, useState} from "react";

const AnimationContext = React.createContext<any>({});

export const AnimationProvider = ({ children }: any): JSX.Element => {
    const [runningAnimation, setRunningAnimation] = useState(undefined)

    return (
        <AnimationContext.Provider value={{
            runningAnimation,
            setRunningAnimation,
        }}>
            {children}
        </AnimationContext.Provider>
    );
};

export const useAnimation = (): any => useContext(AnimationContext);
