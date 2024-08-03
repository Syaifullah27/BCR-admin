import { useContext } from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useRef } from "react"
import { PopupContext } from "../../context/messagePopup"
import { useDispatch } from "react-redux"
import {  setSearchTerm } from "../../redux-toolkit/features/menuSlice"
import { useSelector } from "react-redux"


const AddCarPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [toggleMenu, setToggleMenu] = useState(false)
    const inputRef = useRef(null)
    const [img, setImg] = useState(null)
    const [image, setImage] = useState("")
    const [images, setImages] = useState(null)
    const [dropdownToggle, setDropdownToggle] = useState(false)
    const { showPopupMessage } = useContext(PopupContext);
    const [form, setForm] = useState({
        name: "",
        category: "",
        price: "",
        status: false,
    });
    const { searchTerm } = useSelector((state) => state.data);
    const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);







    const handdleDropdownToggle = () => {
        setDropdownToggle(!dropdownToggle)
    }

    const handleLogout = () => {
        localStorage.removeItem("token_admin_binar")
        navigate("/login")
    }


    const handleImg = (e) => {
        const file = e.target.files[0]
        setImg(e.target.files[0].name)
        // console.log(e.target.files[0].name);
        setImage(URL.createObjectURL(file))
        setImages(e.target.files[0])
    }

    const handleImgClik = () => {
        inputRef.current.click()
    }

    const handleToggleMenu = () => {
        setToggleMenu(!toggleMenu)
    }

    const handleBackToListCars = () => {
        navigate("/car")
    }


    const handleForm = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
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




    const handleAddCar = async () => {

        const formData = new FormData()
        formData.append("name", form.name)
        formData.append("category", form.category)
        formData.append("price", parseInt(form.price))
        formData.append("status", form.status)
        formData.append("image", images)

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "multipart/form-data",
                access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGJjci5pbyIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTY2NTI0MjUwOX0.ZTx8L1MqJ4Az8KzoeYU2S614EQPnqk6Owv03PUSnkzc"
            }
        }


        try {
            // eslint-disable-next-line no-unused-vars
            const res = await axios.post("https://api-car-rental.binaracademy.org/admin/car", formData, config)
            // console.log(res);
            showPopupMessage('Data Berhasil Disimpan');
            navigate("/car")
        } catch (error) {
            console.log(error);
            showPopupMessage('Terjadi kesalahan saat menambahkan data mobil');
        }
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
                            <div className="flex items-center pl-5 gap-5 pr-5">
                                <div className="flex items-center">
                                    <div className="relative">
                                        <input
                                            onChange={handleSearchChange}
                                            type="text"
                                            value={localSearchTerm}
                                            onKeyDown={handleSearchKeyPress}
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
                            <p className="tex-sm font-medium text-[#999999]">Add Car</p>
                        </div>

                        {/* FORM Add car */}
                        <div className="px-8 pt-6 w-full flex flex-col justify-center">
                            <h1 className="text-xl font-semibold">Add New Car</h1>
                            <div className=" flex gap-20 bg-[#ffffff] mt-5 p-4 w-full ">
                                <div className="flex flex-col gap-7 pt-1">
                                    <p>Nama / Tipe Mobil</p>
                                    <p>Harga</p>
                                    <p className="mt-3">Foto</p>
                                    <p className="mt-5">Kategori</p>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <input
                                        name="name"
                                        type="text"
                                        onChange={handleForm}
                                        placeholder="Input Nama / Tipe Mobil"
                                        className="outline-none border p-2 w-[380px] placeholder:text-sm placeholder:pl-2 text-sm  pl-2" />
                                    <input
                                        name="price"
                                        type="number"
                                        onChange={handleForm}
                                        placeholder="Input Harga Sewa Mobil"
                                        className="outline-none border p-2 w-[380px] placeholder:text-sm placeholder:pl-2 text-sm  pl-2" />
                                    <div className="relative border p-2 pl-4 w-[380px] h-14" onClick={handleImgClik}>
                                        {image ? <img src={image} alt="" className="w-10 h-10 border rounded-md" /> : <p className="text-[#949494] text-sm  absolute top-3 mt-1">Upload Foto Mobil</p>}
                                        {
                                            image ? <p className="text-[#1d1d20] text-sm  absolute top-3 mt-2 left-16">{img.substring(0, 40)}</p> : null
                                        }
                                        <input
                                            name="img"
                                            ref={inputRef}
                                            type="file"
                                            onChange={handleImg}
                                            placeholder="Upload Foto Mobil"
                                            className="outline-none border p-2 w-[380px] placeholder:text-sm placeholder:pl-2 text-sm  pl-2 hidden" />
                                        {
                                            img ? null : <img src="../../fi_upload.png" alt="" className="absolute right-3 top-4 w-6 " />
                                        }
                                    </div>
                                    <select
                                        defaultValue={""}
                                        name="category"
                                        onChange={handleForm}
                                        className={`outline-none border p-2 w-[380px] ${form.category === "" ? "placeholder:text-sm placeholder:pl-2 text-sm text-gray-400" : ""}  ${form.category !== "" ? "appearance-none" : ""} text-sm  pl-3`}>
                                        <option value="" className="text-white font-medium bg-blue-600" >Pilih Kategori Mobil</option>
                                        <option value="small" className="text-slate-900 font-medium">2 - 4 orang</option>
                                        <option value="medium" className="text-slate-900 font-medium">4 - 6 orang</option>
                                        <option value="large" className="text-slate-900 font-medium">6 - 8 orang</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Button */}
                        <div className="pl-8 flex gap-2 absolute bottom-10 left-30">
                            <button
                                onClick={handleBackToListCars}
                                className="border-[1px] border-[#0D28A6] text-[#0D28A6] font-medium p-1 px-5">Cancel</button>
                            <button
                                disabled={form.name === "" || form.price === "" || img === "" || form.category === "" ? true : false}
                                onClick={handleAddCar}
                                className="bg-[#0D28A6] text-white font-medium p-1 px-5">Save</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>



    )
}

export default AddCarPage