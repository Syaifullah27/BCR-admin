import { useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import {  setSearchTerm } from "../../redux-toolkit/features/menuSlice"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import EditContent from "../../Components/EditTable"

const EditCarPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [toggleMenu, setToggleMenu] = useState(false)
    const [dropdownToggle, setDropdownToggle] = useState(false)
    const { searchTerm } = useSelector((state) => state.data);
    const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);





    const handdleDropdownToggle = () => {
        setDropdownToggle(!dropdownToggle)
    }

    const handleLogout = () => {
        localStorage.removeItem("token_admin_binar")
        navigate("/login")
    }






    // Handle Search Car
    const handleSearchChange = (e) => {
        setLocalSearchTerm(e.target.value);
    };

    const handleSearchSubmit = () => {
        navigate('/car')
        dispatch(setSearchTerm(localSearchTerm));
    }

    const handleSearchKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSearchSubmit();
        }
    };



    const handleToggleMenu = () => {
        setToggleMenu(!toggleMenu)
    }






    return (
        <div className="flex ">
            {/* Navbar Left Side */}
            <div className="bg-[#0D28A6]">
                <div className="bg-[#0D28A6] h-[100%] w-max flex flex-col gap-2">
                    <div className="p-2 flex flex-col justify-center items-center h-14 pt-6">
                        <h1 className="bg-[#CFD4ED] p-2 py-2">logo</h1>
                    </div>
                    <Link to="/">
                        <div
                            className={`p-2 flex flex-col cursor-pointer justify-center items-center h-14 `}>
                            <img src="../../home-logo.png" alt="" />
                            <h1 className="text-white text-sm">Dashboard</h1>
                            <div className="bank-option text-[1px] text-[#0D28A6] cursor-pointer h-[57px]  w-[82px] absolute top-[63px] left-0">
                                test
                            </div>
                        </div>
                    </Link>
                    <div
                        className={`p-2 flex cursor-pointer flex-col justify-center items-center h-14 bg-[#acb5df]`}
                    >
                        <img src="../../truck-logo.png" alt="" />
                        <h1 className="text-white text-sm">Cars</h1>
                        <div className="bank-option  text-[1px] text-[#0D28A6] h-[57px]  w-[82px] absolute top-[126px] left-0">
                            test
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col w-full">

                {/* bar search */}
                <div className="w-full bg-[#ffffff] shadow-md h-max p-3 flex ">
                    <h1 className="bg-[#CFD4ED] p-2 px-6 w-max">Logo</h1>
                    <div className="w-full ml-40 flex justify-between items-center">
                        {/* Hamburger menu Toggle */}
                        <div className=" ">
                            <div className="menu-toggle" onClick={handleToggleMenu}>
                                <input type="checkbox" />
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                        <div className="flex">
                            <div className="flex items-center pl-5 gap-5 pr-5">
                                <div className="flex items-center">
                                    <div className="relative">
                                        <input
                                            onChange={handleSearchChange}
                                            type="text"
                                            value={localSearchTerm}
                                            onKeyPress={handleSearchKeyPress}
                                            className="border-[2px] bordder-[#999999] p-2 outline-none placeholder:pl-8"
                                            placeholder="Search"
                                        />
                                        <img
                                            src="../../fi_search.png"
                                            alt=""
                                            className={`absolute top-3 left-3 ${localSearchTerm ? "hidden" : ""
                                                }`}
                                        />
                                    </div>
                                    <button
                                        onClick={handleSearchSubmit}
                                        className="border-[2px] border-[#0D28A6] text-[#0D28A6] font-medium p-2"
                                    >
                                        Search
                                    </button>
                                </div>

                                <div className="flex items-center gap-2">
                                    <img
                                        src="../../luffy.jpeg"
                                        alt=""
                                        className="w-[40px] h-[40px] rounded-full cursor-pointer"
                                    />
                                    <p className="text-sm">user 123</p>
                                    <img
                                        src="../../fi_chevron-down.png"
                                        alt=""
                                        onClick={handdleDropdownToggle}
                                        className={`${dropdownToggle ? "rotate-180" : ""
                                            } transition transition-timing-function: ease-in-out transition-duration: 0.5s`}
                                    />
                                </div>
                                {dropdownToggle ? (
                                    <div className="flex justify-center items-center w-[150px] h-[70px] rounded-sm bg-[#ffffff] absolute top-16 right-0 p-4 z-50">
                                        <button
                                            onClick={handleLogout}
                                            className="text-[#ffffff] font-medium p-2 bg-[#FA2C5A] rounded-lg"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>

                {/* wrapper content */}
                <div className="w-full flex">
                    {/* Toggle Sidebar */}
                    {toggleMenu ? (
                        <div className=" w-[220px] h-[100%] bg-[#ffffff]">
                            <div className="">
                                <div className="flex flex-col gap-4 pt-4 ">
                                    <h1 className="font-medium text-[#999999] pl-4">Car</h1>
                                    <h1 className="font-medium text-sm bg-[#CFD4ED] pl-4 p-2 py-3">
                                        List Car
                                    </h1>
                                </div>
                            </div>
                        </div>
                    ) : null}

                    {/* Main content */}
                    <div className="relative w-full h-screen bg-[#f5f6ff]">

                        {/* nav */}
                        <div className="flex gap-2 items-center pl-8 pt-5">
                            <p className="font-medium text-lg">Cars</p>
                            <p className="font-bold text-2xl ">&gt;</p>
                            <p className="tex-lg font-medium ">List Cars</p>
                            <p className="font-bold text-2xl ">&gt;</p>
                            <p className="tex-sm font-medium text-[#999999]">Edit Car</p>
                        </div>

                        {/* FORM Edit car */}
                        <EditContent />


                        {/* <div className="pl-8 flex gap-2 absolute bottom-10 left-30">
                            <button
                                onClick={handleBackToListCars}
                                className="border-[1px] border-[#0D28A6] text-[#0D28A6] font-medium p-1 px-5">Cancel</button>
                            <button
                                onClick={handdleEditCar}
                                className="bg-[#0D28A6] text-white font-medium p-1 px-5">Save</button>
                        </div> */}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default EditCarPage









