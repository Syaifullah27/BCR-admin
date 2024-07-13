import { useState } from "react"
const TestPage = () => {
    const [toggle, setToggle] = useState(false)

    const toggleMenu = () => {
        setToggle(!toggle)
    }
    return (
        <div className="">
            <div className="menu-toggle" onClick={toggleMenu}>
                <input type="checkbox" />
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    )
}

export default TestPage