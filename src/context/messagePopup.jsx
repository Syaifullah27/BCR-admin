import { createContext, useState } from "react";

export const PopupContext = createContext();

// eslint-disable-next-line react/prop-types
const PopupProvider = ({ children }) => {
    const [popupMessage, setPopupMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    // console.log(popupMessage);

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



export const FormatMessage = (message) => {
    if (message === "Data Berhasil Disimpan") {
        return <div
            className="fixed translate-x-[325px] top-20 flex justify-center items-center bg-[#73CA5C] p-2 rounded-sm w-[500px] font-medium text-lg text-[#ffffff]">{message}
        </div>
    } else if (message === "Data Berhasil Diedit") {
        return <div
            className="fixed translate-x-[325px] top-20 flex justify-center items-center bg-[#f3ca44] p-2 rounded-sm w-[500px] font-medium text-lg text-[#ffffff]">{message}</div>
    } else if (message === "Data Berhasil Dihapus") {
        return <div
            className="fixed translate-x-[325px] top-20 flex justify-center items-center bg-[#000000] p-2 rounded-sm w-[500px] font-medium text-lg text-[#ffffff]">{message}</div>
    } else if (message === "Terjadi kesalahan saat menambahkan data mobil" || message === "Terjadi kesalahan saat mengedit data mobil" || message === "Terjadi kesalahan saat menghapus data mobil") {
        return <div
            className="fixed translate-x-[325px] top-20 flex justify-center items-center bg-[#ff3838] p-2 rounded-sm w-[500px] font-medium text-lg text-[#ffffff]">{message}</div>
    }
}
