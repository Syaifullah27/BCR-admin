import { useContext } from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { SelectContext } from "../../context/selectMenu"
import { useNavigate } from "react-router-dom"
import { useRef } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { useEffect } from "react"
import { PopupContext } from "../../context/messagePopup"

const EditCarPage = () => {
    const navigate = useNavigate()
    const id = useParams().id
    const [car, setCar] = useState([])
    // console.log(id);
    const [searchCar, setSearchCar] = useState("")  
    const [toggleMenu, setToggleMenu] = useState(false)
    const inputRef = useRef(null)
    const [img, setImg] = useState(null)
    const [image, setImage] = useState("")
    
    const [form, setForm] = useState({
        name: "",
        category : "",
        price : "",
        status: false,
    });

    const { selectMenu, setSelectMenu } = useContext(SelectContext)
     // eslint-disable-next-line no-unused-vars
    const { popupMessage, showPopupMessage, showPopup } = useContext(PopupContext);

    const [dropdownToggle, setDropdownToggle] = useState(false)

    const handleSelectMenu = (e) => {
        setSelectMenu(e.target.value)
    }


    const handleSearchCar = (e) => {
        setSearchCar(e.target.value)
    }

    const handdleDropdownToggle = () => {
        setDropdownToggle(!dropdownToggle)
    }

    const handleLogout = () => {
        localStorage.removeItem("token_admin_binar")
        navigate("/login")
    }

    
    const handleForm = (e) => {  
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
}


    const getDataCar = async () => {
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "multipart/form-data",
                access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGJjci5pbyIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTY2NTI0MjUwOX0.ZTx8L1MqJ4Az8KzoeYU2S614EQPnqk6Owv03PUSnkzc"
            }
        }
        try {
            const res = await axios.get(`https://api-car-rental.binaracademy.org/admin/car/${id}`, config)
            setCar(res.data)
            setForm({
                name: res.data.name,
                category: res.data.category,
                price: res.data.price,
                status: res.data.status
            })
            setImg(res.data.image)
            setImage(res.data.image)
            // setImage(res.data.image)
            // console.log(image);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getDataCar()
    }, [])

    console.log(car);

    // console.log();


    const handdleEditCar = async () => {

        const formData = new FormData()
        formData.append("name", form.name)
        formData.append("category", form.category)
        formData.append("price", parseInt(form.price))
        formData.append("status", form.status)
        formData.append("image", img)

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "multipart/form-data",
                access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGJjci5pbyIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTY2NTI0MjUwOX0.ZTx8L1MqJ4Az8KzoeYU2S614EQPnqk6Owv03PUSnkzc"
            }
        }
        try {
            const res = await axios.put(`https://api-car-rental.binaracademy.org/admin/car/${id}`, formData, config)
            console.log(res);
            showPopupMessage('Data berhasil DiEdit');
                navigate("/")
        } catch (error) {
            console.log(error);
            showPopupMessage('Data gagal DiEdit');
        }
    }








    const handleToggleMenu = () => {
        setToggleMenu(!toggleMenu)
    }

    const handleBackToListCars = () => {
        setSelectMenu('Cars')
        navigate("/")
    }

    const handleImg = (e) => {
        const file = e.target.files[0]
        console.log(e.target.files[0]);
        setImg(e.target.files[0])
        setImage(URL.createObjectURL(file))
        console.log(file);
    }

    const handleImgClik = () => {
        inputRef.current.click()
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
                                    onChange={handleSelectMenu} />
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
                                onChange={handleSelectMenu} />
                            test</label>
                    </div>
                </div>

                <div className="flex flex-col w-full">
                    <div className="w-full shadow-md h-max p-3 flex">
                        <h1 className="bg-[#CFD4ED] p-2 px-6 w-max">Logo</h1>
                        <div className="w-full ml-40 flex justify-between items-center">
                            <img src="../../hamburger-menu.png" alt="" onClick={handleToggleMenu} className={`w-[33px] h-[33px] mt-1 cursor-pointer ${toggleMenu ? 'rotate-90' : ''} transition transition-timing-function: ease-in-out transition-duration: 0.5s`} />
                            <div className="flex">
                            <div className="relative">
                                    <input 
                                    onChange={handleSearchCar}
                                    type="text" 
                                    className="border-[2px] bordder-[#999999] p-2 outline-none placeholder:pl-8"
                                    placeholder="Search"/>
                                    <img src="fi_search.png" alt="" className={`absolute top-3 left-3 ${searchCar ? 'hidden' : ''}`}/>
                                </div>
                                <button className="border-[2px] border-[#0D28A6] text-[#0D28A6] font-medium p-2">Search</button>
                                <div className="flex items-center pl-5 gap-1 pr-5">
                                    <img src="../../luffy.jpeg" alt="" className="w-[40px] h-[40px] rounded-full cursor-pointer" />
                                    <p className="text-sm">user 123</p>
                                    <img src="../../fi_chevron-down.png" alt=""
                                        onClick={handdleDropdownToggle} className={`${dropdownToggle ? 'rotate-180' : ''} transition transition-timing-function: ease-in-out transition-duration: 0.5s`} />
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
                                <p className="tex-sm font-medium text-[#999999]">{selectMenu === "Dashboard" ? "" : "Edit Car"}</p>
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
                                    <div className="w-full flex flex-col justify-center">
                                        <h1 className="text-xl font-semibold">Add New Car</h1>
                                        <div className="w-full flex gap-20 bg-[#ffffff] mt-5 p-4">
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
                                                value={form.name}
                                                onChange={handleForm}
                                                placeholder="Input Nama / Tipe Mobil"
                                                className="outline-none border p-2 w-[380px] placeholder:text-sm placeholder:pl-2 text-sm  pl-2"/>
                                                <input 
                                                name="price"
                                                type="number" 
                                                value={form.price}
                                                onChange={handleForm}
                                                placeholder="Input Harga Sewa Mobil"
                                                className="outline-none border p-2 w-[380px] placeholder:text-sm placeholder:pl-2 text-sm  pl-2"/>
                                                <div className="relative border p-2 pl-4 w-[380px] h-14" onClick={handleImgClik}>
                                                    {image ? <img src={image} alt="" className="w-10 h-10 border rounded-md"/> : <p className="text-[#949494] text-sm  absolute top-3 mt-1">Upload Foto Mobil</p>}
                                                    {
                                                        img ? <p className="text-[#1d1d20] text-sm  absolute top-3 mt-2 left-16">{image.substring(0, 35)}...</p> : null
                                                    }
                                                    <input 
                                                    name="img"
                                                    ref={inputRef}
                                                    type="file" 
                                                    onChange={handleImg}
                                                    placeholder="Upload Foto Mobil" 
                                                    className="outline-none border p-2 w-[380px] placeholder:text-sm placeholder:pl-2 text-sm  pl-2 hidden" />
                                                    {/* <p className="text-[#999999] text-[10px] ml-2 absolute top-4">(masukan url)</p> */}
                                                    {
                                                        img ? null : <img src="../../fi_upload.png" alt="" className="absolute right-3 top-4 w-6 "/>
                                                    }
                                                </div>
                                                <select 
                                                defaultValue={""}
                                                name="category" 
                                                value={form.category}
                                                onChange={handleForm}
                                                className={`outline-none border p-2 w-[380px] ${form.category === "" ? "placeholder:text-sm placeholder:pl-2 text-sm text-gray-400" : ""}  ${form.category !== "" ? "appearance-none" : ""} text-sm  pl-3`}>
                                                    <option value="" className="text-white font-medium bg-blue-600" >Pilih Kategori Mobil</option>
                                                    <option value="small" className="text-slate-900 font-medium">2 - 4 orang</option>
                                                    <option value="medium" className="text-slate-900 font-medium">4 - 6 orang</option>
                                                    <option value="large" className="text-slate-900 font-medium">6 - 8 orang</option>
                                                </select>
                                                {/* <input 
                                                name="kategori"
                                                type="text" 
                                                placeholder="Input Kategori Mobil"
                                                className="border p-1 w-[350px] placeholder:text-sm placeholder:pl-2" /> */}
                                            </div>
                                        </div>
                                    </div>
                                }

                                <div className="flex gap-2 absolute bottom-10 left-30">
                                    <button
                                        onClick={handleBackToListCars}
                                        className="border-[1px] border-[#0D28A6] text-[#0D28A6] font-medium p-1 px-5">Cancel</button>
                                    <button 
                                    onClick={handdleEditCar}
                                    className="bg-[#0D28A6] text-white font-medium p-1 px-5">Save</button>

                                </div>
                            </div>







                            {/* coding disini */}

                        </div>
                    </div>
                </div>



            </div>
        </div>
    )
}

export default EditCarPage