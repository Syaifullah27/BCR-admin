import { useContext } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchData, setCapacity, setPage, setSearchTerm } from "../../redux-toolkit/features/menuSlice";
import { FormatMessage, PopupContext } from "../../context/messagePopup";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { formatKategoryCars, formatRupiah, formatTanggalIndo } from "../../utils/formater";
import Skeleton from "../../Components/skeleton";
import Pagination from "../../Components/pagination";

const CarPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [toggleMenu, setToggleMenu] = useState(false);
    const [dropdownToggle, setDropdownToggle] = useState(false);
    const { popupMessage, showPopup, showPopupMessage } = useContext(PopupContext);


    const handleToggleMenu = () => {
        setToggleMenu(!toggleMenu);
    };

    const handdleDropdownToggle = () => {
        setDropdownToggle(!dropdownToggle);
    };

    const handleLogout = () => {
        localStorage.removeItem("token_admin_binar");
        navigate("/login");
    };



    // Get List car
    const { data, status, currentPage, totalPages, searchTerm, capacity } = useSelector((state) => state.data);
    const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
    const [localCapacity, setLocalCapacity] = useState(capacity);
    console.log(data);

    useEffect(() => {
        dispatch(fetchData({ page: currentPage, searchTerm, capacity }));
    }, [dispatch, currentPage, searchTerm, capacity]);


    const handlePageChange = (page) => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        dispatch(setPage(page));
    };

    const dataNotFound = data?.cars && data?.cars?.length > 0 ? 'data-container' : 'empty-container' && status === "loading" ? 'data-container' : 'empty-container';



    // Handle Search Car
    const handleSearchChange = (e) => {
        setLocalSearchTerm(e.target.value);
    };

    const handleClearSearch = () => {
        setLocalSearchTerm('');
        dispatch(setSearchTerm(''));
        dispatch(setPage(1)); // Reset to the first page on new search
    };

    const handleSearchSubmit = () => {
        dispatch(setSearchTerm(localSearchTerm));
        dispatch(setPage(1)); // Reset to the first page on new search
    };

    const handleSearchKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSearchSubmit();
        }
    };


    // handle select capacity
    const handleCapacityChange = (e) => {
        setLocalCapacity(e.target.value);
        dispatch(setCapacity(e.target.value));
        dispatch(setPage(1)); // Reset to the first page on capacity change
    };




    // Delete Car
    const [showPopupDelete, setShowPopupDelete] = useState(false);
    const [carId, setCarId] = useState();
    console.log(carId);

    const handleConfirmDelete = (id) => {
        setCarId(id);
        setShowPopupDelete(true);
    };


    const handleDeleteCar = async (id) => {
        // console.log(id);
        // Handle show delete popup



        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "multipart/form-data",
                access_token:
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGJjci5pbyIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTY2NTI0MjUwOX0.ZTx8L1MqJ4Az8KzoeYU2S614EQPnqk6Owv03PUSnkzc",
            },
        };

        try {
            const res = await axios.delete(
                `https://api-car-rental.binaracademy.org/admin/car/${id}`,
                config
            );
            setShowPopupDelete(false);
            console.log(res);
            showPopupMessage("Data Berhasil Dihapus");
            dispatch(fetchData({ page: currentPage, searchTerm, capacity }));
        } catch (error) {
            console.log(error);
            showPopupMessage("Terjadi kesalahan saat menghapus data mobil");
        }
    };






    return (
        <div className="flex">
            {/* Navbar Left Side */}
            <div className="bg-[#0D28A6]">
                <div className="bg-[#0D28A6] h-[100%] w-max flex flex-col gap-2">
                    <div className="p-2 flex flex-col justify-center items-center h-14 pt-6">
                        <h1 className="bg-[#CFD4ED] p-2 py-2">logo</h1>
                    </div>
                    <Link to="/">
                        <div
                            className={`p-2 flex flex-col cursor-pointer justify-center items-center h-14 `}>
                            <img src="home-logo.png" alt="" />
                            <h1 className="text-white text-sm">Dashboard</h1>
                            <div className="bank-option text-[1px] text-[#0D28A6] cursor-pointer h-[57px]  w-[82px] absolute top-[63px] left-0">
                                test
                            </div>
                        </div>
                    </Link>
                    <div
                        className={`p-2 flex cursor-pointer flex-col justify-center items-center h-14 bg-[#acb5df]`}
                    >
                        <img src="truck-logo.png" alt="" />
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
                            <>
                                <div className="relative">
                                    <input
                                        onChange={handleSearchChange}
                                        type="text"
                                        value={localSearchTerm}
                                        onKeyPress={handleSearchKeyPress}
                                        className="border-[2px] bordder-[#999999] p-2 outline-none placeholder:pl-8"
                                        placeholder="Search"
                                    /> 
                                     {
                                        localSearchTerm ? (
                                            <button
                                            onClick={handleClearSearch}
                                            className="absolute top-3 right-3 border bg-[#ffffff] flex justify-center items-center text-center  text-slate-400  rounded-full p-1 h-6 w-6">X</button>
                                        ) : null
                                    }
                                    <img
                                        src="fi_search.png"
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
                            </>
                            <div className="flex items-center pl-5 gap-2 pr-5">
                                <img
                                    src="luffy.jpeg"
                                    alt=""
                                    className="w-[40px] h-[40px] rounded-full cursor-pointer"
                                />
                                <p className="text-sm">user 123</p>
                                <img
                                    src="fi_chevron-down.png"
                                    alt=""
                                    onClick={handdleDropdownToggle}
                                    className={`${dropdownToggle ? "rotate-180" : ""
                                        } transition transition-timing-function: ease-in-out transition-duration: 0.5s`}
                                />
                                {dropdownToggle ? (
                                    <div className="flex justify-center items-center w-[150px] h-[70px] rounded-sm bg-[#ffffff] absolute top-16 right-0 p-4">
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

                {/* Wrapper Content */}
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

                    {/* Main Content */}
                    <div className={`w-full ${dataNotFound} bg-[#f5f6ff]`}>
                        {/* nav */}
                        <div className="flex gap-2 items-center pl-8 pt-5">
                            <p className="font-medium text-lg">
                                <p>Cars</p>
                            </p>
                            <p className="font-bold text-2xl ">&gt;</p>
                            <p className="tex-sm font-medium text-[#999999]">
                                <p>List Cars</p>
                            </p>
                        </div>

                        {/* Message alert add,edit,delete */}
                        {showPopup && FormatMessage(popupMessage)}

                        {/* Delete Popup */}
                        {showPopupDelete && (
                            <div className="popup-overlay">
                                <div className="fixed left-[38%] top-[26%] flex justify-center items-center flex-col gap-4 p-4  w-80 bg-[#ffffff] z-50 rounded-sm">
                                    <img src="img-BeepBeep.png" alt="" />
                                    <h1 className="text-center font-medium text-lg">Menghapus Data Mobil</h1>
                                    <p className="text-center text-sm text-[]">Setelah dihapus, data mobil tidak dapat dikembalikan. Yakin ingin menghapus?</p>
                                    <div className="flex gap-4 pb-2">
                                        <button
                                            onClick={() => handleDeleteCar(carId)}
                                            className="bg-[#0D28A6] text-white p-2 font-medium rounded-sm w-24">Ya</button>
                                        <button
                                            onClick={() => setShowPopupDelete(false)}
                                            className="border-[2px] border-[#0D28A6] text-[#0D28A6] p-2 font-medium rounded-sm w-24">Tidak</button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Header */}
                        <div className="w-full px-8 py-6">
                            <div className="w-full flex justify-between items-center">
                                <h1 className="text-xl font-semibold">List Cars</h1>
                                <Link to={"/add-car"}>
                                    <button className="bg-[#0D28A6] text-white p-2 font-medium">
                                        +{"  "} Add New Car
                                    </button>
                                </Link>
                            </div>
                        </div>

                        {/* select capacity car */}
                        <div className="flex gap-4 pl-8">
                            <label
                                className={`bank-option cursor-pointer font-medium text-blue-700 ${localCapacity === ""
                                    ? "bg-[#CFD4ED] border-[1px] border-blue-900"
                                    : "opacity-40"
                                    } border-[1px] border-blue-900 p-1 px-3 rounded-sm `}
                            >
                                <input
                                    type="radio"
                                    value={""}
                                    onChange={handleCapacityChange}
                                    checked={localCapacity === ""}
                                />
                                All
                            </label>
                            <label
                                className={`bank-option cursor-pointer font-medium text-blue-700 ${localCapacity === "small"
                                    ? "bg-[#CFD4ED] border-[1px] border-blue-900"
                                    : "opacity-40"
                                    } border-[1px] border-blue-900 p-1 px-3 rounded-sm `}
                            >
                                <input
                                    type="radio"
                                    value={"small"}
                                    onChange={handleCapacityChange}
                                    checked={localCapacity === "small"}
                                />
                                2-4 people
                            </label>
                            <label
                                className={`bank-option cursor-pointer font-medium text-blue-700 ${localCapacity === "medium"
                                    ? "bg-[#CFD4ED] border-[1px] border-blue-900"
                                    : "opacity-40"
                                    } border-[1px] border-blue-900 p-1 px-3 rounded-sm `}
                            >
                                <input
                                    type="radio"
                                    value={"medium"}
                                    onChange={handleCapacityChange}
                                    checked={localCapacity === "medium"}
                                />
                                4-6 people
                            </label>
                            <label
                                className={`bank-option cursor-pointer font-medium text-blue-700 ${localCapacity === "large"
                                    ? "bg-[#CFD4ED] border-[1px] border-blue-900"
                                    : "opacity-40"
                                    } border-[1px] border-blue-900 p-1 px-3 rounded-sm `}
                            >
                                <input
                                    type="radio"
                                    value={"large"}
                                    onChange={handleCapacityChange}
                                    checked={localCapacity === "large"}
                                />
                                6-8 people
                            </label>
                        </div>

                        {/* List Car */}
                        <div className="px-8 pt-6 flex flex-wrap gap-10">
                            {status === 'loading' && <div className="flex flex-wrap gap-10">
                                <Skeleton />
                                <Skeleton />
                                <Skeleton />
                                <Skeleton />
                                <Skeleton />
                                <Skeleton />
                            </div>}
                            {status === 'failed' && <p>Eror fetching data</p>}
                            {status === 'succeeded' && <div className="flex flex-wrap gap-10">
                                {data?.cars?.length === 0 && <p>No data</p>}
                                {
                                    data?.cars?.map((item, index) => {
                                        return (
                                            <div key={index} className={`  bg-[#ffffff] shadow-md border rounded-md flex flex-col p-4 gap-8 ${toggleMenu ? "w-[310px]" : "w-[351px]"}`}>
                                                <div className="w-full flex justify-center pt-2">
                                                    <img src={item.image ? item.image : "noImage.jpg"} alt="" className="w-[310px] h-[160px] rounded-lg" />
                                                </div>
                                                <div className="flex flex-col gap-3">
                                                    <h1 className="font-medium">{item.name} / {item.category}</h1>
                                                    <h1 className="text-lg font-semibold">{formatRupiah(item.price)} / hari</h1>
                                                    <div className="flex gap-2 items-center">
                                                        <img src="fi_users.png" alt="" />
                                                        <p className="text-sm">{formatKategoryCars(item.category)}</p>
                                                    </div>
                                                    <div className="flex gap-2 items-center">
                                                        <img src="fi_clock.png" alt="" />
                                                        <p className="text-sm">{formatTanggalIndo(item.updatedAt)}</p>
                                                    </div>
                                                    <div className="flex gap-6 pt-4 pb-2">
                                                        <button
                                                            onClick={() => handleConfirmDelete(item.id)}
                                                            className="border-2 border-[#FA2C5A] w-1/2 p-2 rounded-sm text-[#FA2C5A] font-medium flex gap-2 items-center justify-center">
                                                            <img src="fi_trash-2.png" alt="" className="" />
                                                            Delete
                                                        </button>
                                                        <Link
                                                            className="w-1/2"
                                                            to={`/edit-car/${item.id}`}>
                                                            <button
                                                                className="border w-full p-2 rounded-sm bg-[#5CB85F] text-[#ffffff] font-medium flex gap-2 items-center justify-center">
                                                                <img src="fi_edit.png" alt="" />
                                                                Edit
                                                            </button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            }
                        </div>

                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />


                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarPage;
