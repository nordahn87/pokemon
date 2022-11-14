import {FC} from "react";
import './Arena.css'

interface ArenaProps {
    children: JSX.Element[] | JSX.Element
}

const PA_Arena:FC<ArenaProps> = (props) => {
    return (
        <div className="container">
            {props.children}
        </div>
    );
};

export default PA_Arena
