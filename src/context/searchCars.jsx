import { useState } from "react";
import { createContext } from "react";

const Searchcars = createContext()


// eslint-disable-next-line react/prop-types
const SearchCarshProvider = ({ children }) => {
    const [search, setSearch] = useState('')


    return (
        <Searchcars.Provider value={{ search, setSearch  }}>
            {children}
        </Searchcars.Provider>
    )
}

export { Searchcars, SearchCarshProvider }