import { createContext, useState } from "react";

export const PopupContext = createContext();

// eslint-disable-next-line react/prop-types
const PopupProvider = ({ children }) => {
    const [popupMessage, setPopupMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    console.log(popupMessage);

    const showPopupMessage = (message) => {
        setPopupMessage(message);
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 3000); // Popup akan hilang setelah 3 detik
    };

    return (
    <PopupContext.Provider
        value={{ popupMessage, showPopup, showPopupMessage, setPopupMessage }}>
        {children}
    </PopupContext.Provider>
    );
};

export default PopupProvider;
