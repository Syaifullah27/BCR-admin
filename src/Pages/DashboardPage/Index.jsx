import { useContext } from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { SelectContext } from "../../context/selectMenu"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getMenu } from "../../redux-toolkit/features/menuSlice"
import { formatKategoryCars, formatRupiah, formatTanggalIndo } from "../../utils/formater"
import { Searchcars } from "../../context/searchCars"
import "chart.js/auto"
import Chart from 'react-apexcharts'
import axios from "axios"
import { FormatMessage, PopupContext } from "../../context/messagePopup"

const DashboardPage = () => {



    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [toggleMenu, setToggleMenu] = useState(false)

    const [dropdownToggle, setDropdownToggle] = useState(false)
    const [page, setPage] = useState(1)
    // const [searchCar, setSearchCar] = useState("")
    const { search, setSearch } = useContext(Searchcars)
    // console.log(search);

    


    const handleSearchCar = (e) => {
        setSearch(e.target.value)
        // console.log(searchCar);
    }

    const { selectMenu, setSelectMenu } = useContext(SelectContext)
    const { popupMessage, showPopup, showPopupMessage } = useContext(PopupContext);


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

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(page - 1)
        } else {
            setPage(1)
        }
    }

    const handleNextPage = () => {
        setPage(page + 1)
    }

    // const navigateToEditCar = (id) => {
    //     console.log(id);
    //     navigate(`/edit-car/${id}`)
    // }


    const { menuReducer } = useSelector(state => state)


    console.log(menuReducer.menu);

    useEffect(() => {
        dispatch(getMenu(search))
    }, [])

    const handleSearch = (e) => {
        e.preventDefault()
        dispatch(getMenu(search))
    }



    const handleDeleteCar = async (id) => {
        // console.log(id);
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "multipart/form-data",
                access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGJjci5pbyIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTY2NTI0MjUwOX0.ZTx8L1MqJ4Az8KzoeYU2S614EQPnqk6Owv03PUSnkzc"
            }
        }
        try {
            const res = await axios.delete(`https://api-car-rental.binaracademy.org/admin/car/${id}`, config)
            console.log(res);
            showPopupMessage('Data Berhasil Dihapus');
            getMenu()
        } catch (error) {
            console.log(error);
            showPopupMessage('Terjadi kesalahan saat menghapus data mobil')
        }
    }









    const [dateFrom, setDateFrom] = useState('')
    const [dateUntil, setDateUntil] = useState('')


    const getReportData = async () => {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGJjci5pbyIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTcxODg5MDY2MH0.WLWnMOa5rwS7RVe1zdPMrSnn2-jbpRKjnoO-44YhIDw'
        const config = {
            headers: {
                access_token: `${token}`,
            },
        }
        try {
            const res = await axios.get(`https://api-car-rental.binaracademy.org/admin/order/reports?from=${dateFrom}&until=${dateUntil}`, config)
            setDataReports(res.data)
            console.log(res.data);
        } catch (error) {
            console.log(error?.response);
        }
    }


    useEffect(() => {
        getReportData()
    }, [])


    const [dataReports, setDataReports] = useState([])

    const day = dataReports.map((d) => {
        return d.day
    })

    const countOrder = dataReports.map((c) => {
        return c.orderCount
    })

    // console.log(countOrder);
    // console.log(day)





    const OptionsColumChart = {
        series: [{
            name: 'Count Order',
            data: countOrder,
        }],
        options: {
            chart: {
                height: 350,
                type: 'bar',
            },
            plotOptions: {
                bar: {
                    borderRadius: 10,
                    dataLabels: {
                        position: 'top', // top, center, bottom
                    },
                }
            },
            dataLabels: {
                enabled: true,
                formatter: function (val) {
                    return val + "%";
                },
                offsetY: -30,
                style: {
                    fontSize: '12px',
                    colors: ["#304758"]
                }
            },

            xaxis: {
                categories: day,
                position: 'top',
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false
                },
                crosshairs: {
                    fill: {
                        type: 'gradient',
                        gradient: {
                            colorFrom: '#D8E3F0',
                            colorTo: '#BED1E6',
                            stops: [0, 100],
                            opacityFrom: 0.4,
                            opacityTo: 0.5,
                        }
                    }
                },
                tooltip: {
                    enabled: true,
                }
            },
            yaxis: {
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false,
                },
                labels: {
                    show: false,
                    formatter: function (val) {
                        return val + "%";
                    }
                }

            },
            title: {
                text: 'Hasil Rental Bulanan',
                floating: true,
                offsetY: 330,
                align: 'center',
                style: {
                    color: '#444'
                }
            }
        },

    }


    

    const handleGetDateFrom = (e) => {
        setDateFrom(e.target.value)
    }
    const handleGetDateUntil = (e) => {
        setDateUntil(e.target.value)
    }









    return (
        <div className="flex flex-col  overflow-x-hidden">
            <div className="w-screen  flex bg-[#0D28A6]">
                <div className="bg-[#0D28A6] h-[100%] w-max flex flex-col gap-2">
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
                                onChange={handleSelectMenu} />
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
                                onChange={handleSelectMenu} />
                            test</label>
                    </div>
                </div>

                <div className="flex flex-col w-full">
                    <div className="w-full bg-[#ffffff] shadow-md h-max p-3 flex ">
                        <h1 className="bg-[#CFD4ED] p-2 px-6 w-max">Logo</h1>
                        <div className="w-full ml-40 flex justify-between items-center">
                            <img src="hamburger-menu.png" alt="" onClick={handleToggleMenu} className={`w-[33px] h-[33px] mt-1 cursor-pointer ${toggleMenu ? 'rotate-90' : ''} transition transition-timing-function: ease-in-out transition-duration: 0.5s`} />
                            <div className="flex">
                                {
                                    selectMenu === "Dashboard" ? null : <>
                                        <div className="relative">
                                            <input
                                                onChange={handleSearchCar}
                                                type="text"
                                                value={search}
                                                className="border-[2px] bordder-[#999999] p-2 outline-none placeholder:pl-8"
                                                placeholder="Search" />
                                            <img src="fi_search.png" alt="" className={`absolute top-3 left-3 ${search ? 'hidden' : ''}`} />
                                        </div>
                                        <button 
                                        onClick={handleSearch}
                                        className="border-[2px] border-[#0D28A6] text-[#0D28A6] font-medium p-2">
                                            Search
                                        </button>
                                    </>
                                }
                                <div className="flex items-center pl-5 gap-1 pr-5">
                                    <img src="luffy.jpeg" alt="" className="w-[40px] h-[40px] rounded-full cursor-pointer" />
                                    <p className="text-sm">user 123</p>
                                    <img src="fi_chevron-down.png" alt="" onClick={handdleDropdownToggle} className={`${dropdownToggle ? 'rotate-180' : ''} transition transition-timing-function: ease-in-out transition-duration: 0.5s`} />
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
                                <div className=" w-[220px] h-[100%] bg-[#ffffff]">
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
                        <div className={`w-full bg-[#f5f6ff] ${menuReducer.menu.length === 0 ? 'h-screen' : 'h-[100%]'}`}>
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

                                        {/* <p>test</p> */}
                                        <div className=" pt-10 gap-4 flex flex-col justify-center w-full">
                                        <p className=" font-medium">Month</p>
                                        <div className="flex gap-5">
                                            <input type="date" 
                                            value={dateFrom}
                                            className="border px-2" 
                                            onChange={handleGetDateFrom}/>
                                            <input type="date" 
                                            value={dateUntil} 
                                            className="border px-2"
                                            onChange={handleGetDateUntil}/>
                                            <button className="bg-[#0D28A6] text-white p-2 font-medium rounded-lg px-5"
                                            onClick={getReportData}> Go</button>
                                        </div>
                                        <div id="chart" className="w-full">
                                            <Chart options={OptionsColumChart.options} series={OptionsColumChart.series} type="bar"  />
                                        </div>
                                        <div id="html-dist"></div>
                                    </div>

                                    <div className="pb-20">
                                        <h1 className="text-xl font-bold">Dashboard</h1>
                                        <div className="flex gap-2 items-center pt-5">
                                            <span className="bg-[#0D28A6] w-[7px] h-[25px]"></span>
                                            <h1 className="text-lg font-semibold ">List Order</h1>
                                        </div>
                                    </div>

                                    </div>
                                    :
                                    <div className="">
                                        <div className="w-full flex justify-between items-center">
                                            <h1 className="text-xl font-semibold">List Cars</h1>
                                            {/* {showPopup && <div className={`fixed translate-x-[325px] top-20 flex justify-center items-center ${popupMessage === "Data Berhasil Disimpan" ? 'bg-[#73CA5C]' : 'bg-[#f3ca44]'} p-2 rounded-sm w-[500px] font-medium text-lg text-[#ffffff]`}>
                                                {popupMessage}
                                            </div>} */}
                                            { 
                                                showPopup && FormatMessage(popupMessage)
                                            }
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
                                                    checked={selectCapacityCar === "All"} />
                                                All</label>
                                            <label className={`bank-option cursor-pointer font-medium text-blue-700 ${selectCapacityCar === "2-4" ? "bg-[#CFD4ED] border-[1px] border-blue-900" : 'opacity-40'} border-[1px] border-blue-900 p-1 px-3 rounded-sm `}>
                                                <input
                                                    type="radio"
                                                    value={"2-4"}
                                                    onChange={handleSelectCapacityCar}
                                                    checked={selectCapacityCar === "2-4"} />
                                                2-4 people</label>
                                            <label className={`bank-option cursor-pointer font-medium text-blue-700 ${selectCapacityCar === "4-6" ? "bg-[#CFD4ED] border-[1px] border-blue-900" : 'opacity-40'} border-[1px] border-blue-900 p-1 px-3 rounded-sm `}>
                                                <input
                                                    type="radio"
                                                    value={"4-6"}
                                                    onChange={handleSelectCapacityCar}
                                                    checked={selectCapacityCar === "4-6"} />
                                                4-6 people</label>
                                            <label className={`bank-option cursor-pointer font-medium text-blue-700 ${selectCapacityCar === "6-8" ? "bg-[#CFD4ED] border-[1px] border-blue-900" : 'opacity-40'} border-[1px] border-blue-900 p-1 px-3 rounded-sm `}>
                                                <input
                                                    type="radio"
                                                    value={"6-8"}
                                                    onChange={handleSelectCapacityCar}
                                                    checked={selectCapacityCar === "6-8"} />
                                                6-8 people</label>
                                        </div>
                                        {/* <p>{selectCapacityCar}</p> */}

                                        <div className="pt-5 flex gap-10 flex-wrap">
                                        {
                                            menuReducer.menu === null ? <p className="text-center font-medium text-2xl ">Loading</p> : menuReducer.menu.length === 0 ? <p className="text-center font-medium text-2xl ">No Data</p> : menuReducer.menu.map((item, index) => {
                                                return (
                                                    <div key={index} className="w-[351px]  bg-[#ffffff] shadow-md border rounded-md flex flex-col p-4 gap-4">
                                                        <div className="w-full flex justify-center pt-6">
                                                            <img src={item.image === null ? "noImage.jpg" : item.image}
                                                            className="w-[270px] h-[160px] rounded-lg" />
                                                        </div>
                                                        <div className="flex flex-col gap-3">
                                                            <h1 className="text-lg font-medium">{item.name}</h1>
                                                            <h1 className="text-lg font-semibold">{formatRupiah(item.price)} / hari</h1>
                                                            <div className="flex gap-2 items-center">
                                                                <img src="fi_users.png" alt="" />
                                                                <p className="text-sm">{formatKategoryCars(item.category)}</p>
                                                            </div>
                                                            <div className="flex gap-2 items-center">
                                                                <img src="fi_clock.png" alt="" />
                                                                <p className="text-sm">Update at {formatTanggalIndo(item.updatedAt)}</p>
                                                            </div>
                                                            <div className="flex gap-6 pt-4 pb-2">
                                                                    <button
                                                                        onClick={() => handleDeleteCar(item.id)}
                                                                        className="border-2 border-[#FA2C5A] w-1/2 p-2 rounded-sm text-[#FA2C5A] font-medium flex gap-2 items-center justify-center">
                                                                        <img src="fi_trash-2.png" alt="" className="" />
                                                                        Delete
                                                                    </button>
                                                                    <button
                                                                        onClick={() => navigate(`/edit-car/${item.id}`)}    
                                                                        className="border w-1/2 p-2 rounded-sm bg-[#5CB85F] text-[#ffffff] font-medium flex gap-2 items-center justify-center">
                                                                        <img src="fi_edit.png" alt="" />
                                                                        Edit
                                                                    </button>
                                                                </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                            
                                        </div>
                                        {
                                            menuReducer.menu.length === 0 ? null : 
                                            <div className="flex gap-6 pt-20 pb-16 justify-center items-center">
                                                <button 
                                                onClick={handlePreviousPage}
                                                className="border bg-white p-2 px-7 text-slate-900 font-medium rounded-lg shadow-md ">Prev</button>
                                                <h1 className="text-slate-900 text-2xl font-medium">{page}</h1>
                                                <button 
                                                onClick={handleNextPage}
                                                className="border bg-white p-2 px-7 text-slate-900 font-medium rounded-lg shadow-md ">Next</button>
                                        </div>
                                        }
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

