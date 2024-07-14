import { useState } from "react"
import './test.css'

const TestPage = () => {
    const [toggle, setToggle] = useState(false)

    const toggleMenu = () => {
        setToggle(!toggle)
    }
    return (
        // <nav className="navbar">
        // <h1 className={`text-3xl font-semibold bg-[#0D28A6] text-[#f5f5f5] py-2 px-5 `}>Logo</h1>
        <div className="border-2 border-black p-4 ">
            <div className="menu-toggle" onClick={toggleMenu}>
            <input type="checkbox" />
            <span></span>
            <span></span>
            <span></span>
        </div>
       </div>
    //     <ul className={`menu-list ${toggle ? 'active' : ''}`}>
    //             <li><a href="#services">Our Services</a></li>
    //             <li><a href="#whyUs">Why Us</a></li>
    //             <li><a href="#testimony">Testimony</a></li>
    //             <li><a href="#faq">FAQ</a></li>  
    //     </ul>
    // </nav>
    )
}

export default TestPage