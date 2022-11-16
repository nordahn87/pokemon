import {FC} from "react";
import './Arena.scss'

interface ArenaProps {
    children: JSX.Element[] | JSX.Element
}

const PA_Arena:FC<ArenaProps> = (props) => {
    return (
        <div className="arena-wrapper">
            {props.children}
           <div className="arena-scene">
                <span className="skye"></span>
                <span className="ground"></span>
            </div>
        </div>
    );
};

export default PA_Arena
