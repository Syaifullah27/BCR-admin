import { useContext } from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { SelectContext } from "../../context/selectMenu"
import { useNavigate } from "react-router-dom"

const AddCarPage = () => {
    const navigate = useNavigate()

    const [toggleMenu, setToggleMenu] = useState(false)

    // const [selectMenu, setSelectMenu] = useState('Cars')

    const { selectMenu ,setSelectMenu } = useContext(SelectContext)

    const handleSelectMenu = (e) => {
        setSelectMenu(e.target.value)
    }


    const handleToggleMenu = () => {
        setToggleMenu(!toggleMenu)
    }

    const handleBackToListCars = () => {
        setSelectMenu('Cars')
        navigate("/")
    }


    return (
        <div className="flex flex-col overflow-hidden">
        <div className="w-screen h-screen flex">
            <div className="bg-[#0D28A6] h-screen w-max flex flex-col gap-2">
                <div className="p-2 flex flex-col justify-center items-center h-14 pt-6">
                    <h1 className="bg-[#CFD4ED] p-2 py-2">logo</h1>
                </div>
                <div
                className={`p-2 flex flex-col  cursor-pointerjustify-center items-center h-14 ${selectMenu === "Dashboard" ? "bg-[#acb5df]" : ''}`}>
                    <img src="home-logo.png" alt="" />
                    <h1 className="text-white text-sm">Dashboard</h1>
                    <Link to={"/"}>
                    <label className="bank-option text-[1px] text-[#0D28A6] h-[57px]  w-[82px] absolute top-[63px] left-0">
                        <input 
                        value={"Dashboard"}
                        type="radio" 
                        checked={selectMenu === "Dashboard"}
                        onChange={handleSelectMenu}/>
                    test</label>
                    </Link>
                </div>
                <div
                className={`p-2 flex cursor-pointer flex-col justify-center items-center h-14 ${selectMenu === "Cars" ? "bg-[#acb5df]" : ''}`}>
                    <img src="truck-logo.png" alt="" />
                    <h1 className="text-white text-sm">Cars</h1>
                    <label className="bank-option  text-[1px] text-[#0D28A6] h-[57px]  w-[82px] absolute top-[126px] left-0">
                        <input 
                        value={"Cars"}
                        type="radio" 
                        className=""
                        checked={selectMenu === "Cars"}
                        onChange={handleSelectMenu}/>
                    test</label>
                </div>
            </div>

            <div className="flex flex-col w-full">
                <div className="w-full shadow-md h-max p-3 flex">
                        <h1 className="bg-[#CFD4ED] p-2 px-6 w-max">Logo</h1>
                        <div className="w-full ml-40 flex justify-between items-center">
                        <img src="hamburger-menu.png" alt="" onClick={handleToggleMenu} className={`w-[33px] h-[33px] mt-1 cursor-pointer ${toggleMenu ? 'rotate-90' : ''} transition transition-timing-function: ease-in-out transition-duration: 0.5s`}/>
                        <div className="flex">
                            <input type="text" className="border-[2px] bordder-[#999999] p-2 outline-none"
                            placeholder="Search"/>
                            <button className="border-[2px] border-[#0D28A6] text-[#0D28A6] font-medium p-2">Search</button>
                            <div className="flex items-center pl-5 gap-1 pr-5">
                                <img src="luffy.jpeg" alt="" className="w-[40px] h-[40px] rounded-full cursor-pointer"/>
                                <p className="text-sm">user 123</p>
                                <img src="fi_chevron-down.png" alt="" />
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="flex">
                    {
                            toggleMenu ? (
                                <div className=" w-[220px] h-screen">
                                    <div className="">{selectMenu === "Dashboard" ? <div className="flex flex-col gap-4 pt-4 ">
                                        <h1 className="font-medium text-[#999999] pl-4">Dashboard</h1>
                                        <h1 className="font-medium text-sm bg-[#CFD4ED] pl-4 p-2 py-3">Dashboard</h1>
                                    </div> : null}</div>
                                    <div className="">{selectMenu === "Cars" ? <div className="flex flex-col gap-4 pt-4 ">
                                        <h1 className="font-medium text-[#999999] pl-4">Cars</h1>
                                        <h1 className="font-medium text-sm bg-[#CFD4ED] pl-4 p-2 py-3">List Cars</h1>
                                    </div> : null}</div>
                                </div>
                            ) : null
                        }
                        <div className="w-full h-screen bg-[#f5f6ff]">
                            <div className="flex gap-2 items-center pl-8 pt-5">
                                <p className="font-medium text-lg">{selectMenu === "Dashboard" ? "Dashboard" : "Cars"}</p>
                                <p className="font-bold text-2xl ">&gt;</p>
                                <p onClick={handleBackToListCars}
                                className="tex-sm font-medium cursor-pointer">{selectMenu === "Dashboard" ? "Dashboard" : "List Cars"}</p>
                                <p className="font-bold text-2xl ">{selectMenu === "Dashboard" ? "" : ">"}</p>
                                <p className="tex-sm font-medium text-[#999999]">{selectMenu === "Dashboard" ? "" : "Add New Car"}</p>
                            </div>

                            {/* Coding disini */}

                            <div className="w-[94%] mx-auto pt-10 ">
                                {selectMenu === "Dashboard" ?
                                <div className="w-full flex flex-col">
                                    <div className="flex gap-2 items-center">
                                        <span className="bg-[#0D28A6] w-[7px] h-[25px]"></span>
                                        <h1 className="text-lg font-semibold">Rented Car Data Visualization</h1>
                                    </div>
                                    {/* // lanjutkan dari sini  */}

                                    <p>test</p>

                                </div>
                                : 
                                <div className="w-full flex justify-between items-center">
                                    <h1 className="text-xl font-semibold">Add New Car</h1>
                                </div>
                                }
                            </div>







                            {/* coding disini */}

                        </div>
                    </div>
            </div>



        </div>
    </div>
    )
}

export default AddCarPage