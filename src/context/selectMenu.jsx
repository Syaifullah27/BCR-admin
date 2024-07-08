import { useState } from "react";
import { createContext } from "react";

const SelectContext = createContext()


// eslint-disable-next-line react/prop-types
const SelectContextProvider = ({ children }) => {
    const [selectMenu, setSelectMenu] = useState('Dashboard')


    return (
        <SelectContext.Provider value={{ selectMenu, setSelectMenu }}>
            {children}
        </SelectContext.Provider>
    )
}

export { SelectContext, SelectContextProvider }