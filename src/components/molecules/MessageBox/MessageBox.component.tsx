import {FC} from "react";
import {useMessages} from "../../../hooks/messages.provider";
import './MessageBox.scss';

const PA_MessageBox:FC = () => {
    const { message } = useMessages();

    return (
         <div className="message-container">
            {message}
         </div>
    );
};

export default PA_MessageBox;
