import { useContext } from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { SelectContext } from "../../context/selectMenu"
import { useNavigate } from "react-router-dom"

const DashboardPage = () => {
    const navigate = useNavigate()
    const [toggleMenu, setToggleMenu] = useState(false)

    const [dropdownToggle, setDropdownToggle] = useState(false)
    const [searchCar, setSearchCar] = useState("")


    const handleSearchCar = (e) => {
        setSearchCar(e.target.value)
    }

    const { selectMenu ,setSelectMenu } = useContext(SelectContext)


    const [selectCapacityCar, setSelectCapacityCar] = useState('All')
    const handleSelectCapacityCar = (e) => {
        setSelectCapacityCar(e.target.value)
    }

    const handleSelectMenu = (e) => {
        setSelectMenu(e.target.value)
    }

    const handleToggleMenu = () => {
        setToggleMenu(!toggleMenu)
    }

    const handdleDropdownToggle = () => {
        setDropdownToggle(!dropdownToggle)
    }

    const handleLogout = () => {
        localStorage.removeItem("token_admin_binar")
        navigate("/login")
    }


    const navigateToEditCar = () => {
        navigate("/edit-car")
    }



    return (
        <div className="flex flex-col overflow-hidden">
            <div className="w-screen h-full flex bg-[#0D28A6]">
                <div className="bg-[#0D28A6] h-full w-max flex flex-col gap-2">
                    <div className="p-2 flex flex-col justify-center items-center h-14 pt-6">
                        <h1 className="bg-[#CFD4ED] p-2 py-2">logo</h1>
                    </div>
                    <div
                    className={`p-2 flex flex-col  cursor-pointerjustify-center items-center h-14 ${selectMenu === "Dashboard" ? "bg-[#acb5df]" : ''}`}>
                        <img src="home-logo.png" alt="" />
                        <h1 className="text-white text-sm">Dashboard</h1>
                        <label className="bank-option text-[1px] text-[#0D28A6] h-[57px]  w-[82px] absolute top-[63px] left-0">
                            <input 
                            value={"Dashboard"}
                            type="radio" 
                            checked={selectMenu === "Dashboard"}
                            onChange={handleSelectMenu}/>
                        test</label>
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
                    <div className="w-full bg-[#ffffff] shadow-md h-max p-3 flex ">
                            <h1 className="bg-[#CFD4ED] p-2 px-6 w-max">Logo</h1>
                            <div className="w-full ml-40 flex justify-between items-center">
                            <img src="hamburger-menu.png" alt="" onClick={handleToggleMenu} className={`w-[33px] h-[33px] mt-1 cursor-pointer ${toggleMenu ? 'rotate-90' : ''} transition transition-timing-function: ease-in-out transition-duration: 0.5s`}/>
                            <div className="flex">
                                {
                                    selectMenu === "Dashboard" ? null : <>
                                        <div className="relative">
                                            <input 
                                            onChange={handleSearchCar}
                                            type="text" 
                                            className="border-[2px] bordder-[#999999] p-2 outline-none placeholder:pl-8"
                                            placeholder="Search"/>
                                            <img src="fi_search.png" alt="" className={`absolute top-3 left-3 ${searchCar ? 'hidden' : ''}`}/>
                                        </div>
                                        <button className="border-[2px] border-[#0D28A6] text-[#0D28A6] font-medium p-2">
                                            Search
                                        </button>
                                    </>
                                }
                                <div className="flex items-center pl-5 gap-1 pr-5">
                                    <img src="luffy.jpeg" alt="" className="w-[40px] h-[40px] rounded-full cursor-pointer"/>
                                    <p className="text-sm">user 123</p>
                                <img src="fi_chevron-down.png" alt="" onClick={handdleDropdownToggle} className={`${dropdownToggle ? 'rotate-180' : ''} transition transition-timing-function: ease-in-out transition-duration: 0.5s`}/>
                                {
                                    dropdownToggle ? (
                                        <div className="flex justify-center items-center w-[150px] h-[70px] rounded-sm bg-[#ffffff] absolute top-16 right-0 p-4">
                                            <button 
                                            onClick={handleLogout}
                                            className="text-[#ffffff] font-medium p-2 bg-[#FA2C5A] rounded-lg">Logout</button>
                                        </div>
                                    ) : null
                                }
                                </div>
                            </div>
                            </div>
                        </div>
                        <div className="flex">
                        {
                                toggleMenu ? (
                                    <div className=" w-[220px] h-screen bg-[#ffffff]">
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
                                    <p className="tex-sm font-medium text-[#999999]">{selectMenu === "Dashboard" ? "Dashboard" : "List Cars"}</p>
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
                                        <div className="">
                                            <div className="w-full flex justify-between items-center">
                                                <h1 className="text-xl font-semibold">List Cars</h1>
                                                <Link to={"/add-car"}>
                                                    <button className="bg-[#0D28A6] text-white p-2 font-medium">+{"  "} Add New Car</button>
                                                </Link>
                                            </div>

                                            <div className="flex gap-4">
                                                <label className={`bank-option cursor-pointer font-medium text-blue-700 ${selectCapacityCar === "All" ? "bg-[#CFD4ED] border-[1px] border-blue-900" : 'opacity-40'} border-[1px] border-blue-900 p-1 px-3 rounded-sm `}>
                                                    <input 
                                                    type="radio" 
                                                    value={"All"}
                                                    onChange={handleSelectCapacityCar}
                                                    checked={selectCapacityCar === "All"}/>
                                                All</label>
                                                <label className={`bank-option cursor-pointer font-medium text-blue-700 ${selectCapacityCar === "2-4" ? "bg-[#CFD4ED] border-[1px] border-blue-900" : 'opacity-40'} border-[1px] border-blue-900 p-1 px-3 rounded-sm `}>
                                                    <input 
                                                    type="radio" 
                                                    value={"2-4"}
                                                    onChange={handleSelectCapacityCar}
                                                    checked={selectCapacityCar === "2-4"}/>
                                                2-4 people</label>
                                                <label className={`bank-option cursor-pointer font-medium text-blue-700 ${selectCapacityCar === "4-6" ? "bg-[#CFD4ED] border-[1px] border-blue-900" : 'opacity-40'} border-[1px] border-blue-900 p-1 px-3 rounded-sm `}>
                                                    <input 
                                                    type="radio" 
                                                    value={"4-6"}
                                                    onChange={handleSelectCapacityCar}
                                                    checked={selectCapacityCar === "4-6"}/>
                                                4-6 people</label>
                                                <label className={`bank-option cursor-pointer font-medium text-blue-700 ${selectCapacityCar === "6-8" ? "bg-[#CFD4ED] border-[1px] border-blue-900" : 'opacity-40'} border-[1px] border-blue-900 p-1 px-3 rounded-sm `}>
                                                    <input 
                                                    type="radio" 
                                                    value={"6-8"}
                                                    onChange={handleSelectCapacityCar}
                                                    checked={selectCapacityCar === "6-8"}/>
                                                6-8 people</label>
                                            </div>
    {/* <p>{selectCapacityCar}</p> */}

                                            <div className="pt-5">
                                                <div className="w-[351px]  bg-[#ffffff] shadow-md border rounded-md flex flex-col p-4 gap-4">
                                                    <div className="w-full flex justify-center pt-6">
                                                        <img src="car.png" alt="" className="w-[270px] h-[160px]"/>
                                                    </div>
                                                    <div className="flex flex-col gap-3">
                                                        <h1>Nama/Tipe Mobil</h1>
                                                        <h1 className="text-lg font-semibold">Rp. 430.000 / hari</h1>
                                                        <div className="flex gap-2 items-center">
                                                            <img src="fi_key.png" alt="" />
                                                            <p className="text-sm">Start rent - Finish rent</p>
                                                        </div>
                                                        <div className="flex gap-2 items-center">
                                                            <img src="fi_clock.png" alt="" />
                                                            <p className="text-sm">Updated at 4 Apr 2022, 09.00</p>
                                                        </div>
                                                        <div className="flex gap-6 pt-4 pb-2">       
                                                                <button 
                                                                className="border-2 border-[#FA2C5A] w-1/2 p-2 rounded-sm text-[#FA2C5A] font-medium flex gap-2 items-center justify-center">
                                                                <img src="fi_trash-2.png" alt="" className=""/>
                                                                    Delete
                                                                </button>
                                                                <button
                                                                onClick={navigateToEditCar} 
                                                                className="border w-1/2 p-2 rounded-sm bg-[#5CB85F] text-[#ffffff] font-medium flex gap-2 items-center justify-center">
                                                                <img src="fi_edit.png" alt="" />
                                                                    Edit
                                                                </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

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

export default DashboardPage

