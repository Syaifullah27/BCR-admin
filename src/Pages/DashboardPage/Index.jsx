import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "chart.js/auto";
import Chart from "react-apexcharts";
import axios from "axios";
import "../Test/test.css";
import DataTable from "react-data-table-component";
import { useSelector } from "react-redux";
import { setSearchTerm } from "../../redux-toolkit/features/menuSlice";
import { useDispatch } from "react-redux";
import { formatDateID, formatRupiah } from "../../utils/formater";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const DashboardPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [toggleMenu, setToggleMenu] = useState(false);
  const [dropdownToggle, setDropdownToggle] = useState(false);
  const [listOrder, setListOrder] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalRows, setTotalRows] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const { searchTerm } = useSelector((state) => state.data);
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  // Handle Search Car
  const handleSearchChange = (e) => {
    setLocalSearchTerm(e.target.value);
  };

  const handleSearchSubmit = () => {
    navigate("/car");
    dispatch(setSearchTerm(localSearchTerm));
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearchSubmit();
    }
  };

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

 {/* nav */}
 <div className="flex gap-2 items-center pl-8 pt-5">
 <p className="font-medium text-lg">
   <p>Dashboard</p>
 </p>
 <p className="font-bold text-2xl ">&gt;</p>
 <p className="tex-sm font-medium text-[#999999]">
   <p>Dashboard</p>
 </p>
</div>
{/* Header */}
<div className="px-8 flex gap-2 items-center pt-14">
     <span className="bg-[#0D28A6] w-[7px] h-[25px]"></span>
     <h1 className="text-lg font-semibold ">Rented Car Data Visualization</h1>
</div>
// handle chart
const [selectedDate, setSelectedDate] = useState(new Date());
const [dateRange, setDateRange] = useState({ start: "", end: "" });
useEffect(() => {
compareDates(selectedDate);
}, [selectedDate]);
const handleDateChange = (date) => {
setSelectedDate(date);
};
const compareDates = (date) => {
const year = date.getFullYear();
const month = date.getMonth();
// eslint-disable-next-line no-unused-vars
const startOfMonth = new Date(year, month, 1);
const endOfMonth = new Date(year, month + 1, 0);
const formattedStartDate = `${year}-${(month + 1).toString().padStart(2, '0')}-01`;
const formattedEndDate = `${year}-${(month + 1).toString().padStart(2, '0')}-${endOfMonth.getDate()}`;

setDateRange({ start: formattedStartDate, end: formattedEndDate });
};

  // const [dateFrom, setDateFrom] = useState("");
  // const [dateUntil, setDateUntil] = useState("");

  // console.log(dateFrom, dateUntil);

  const getReportData = async () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGJjci5pbyIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTcxODg5MDY2MH0.WLWnMOa5rwS7RVe1zdPMrSnn2-jbpRKjnoO-44YhIDw";
    const config = {
      headers: {
        access_token: `${token}`,
      },
    };
    try {
      const res = await axios.get(
        `https://api-car-rental.binaracademy.org/admin/order/reports?from=${dateRange.start}&until=${dateRange.end}`,
        config
      );
      setDataReports(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error?.response);
    }
  };

  // const [sortFrom, setSortFrom] = useState("");
  const getListOrder = async (page, size = perPage) => {
    setLoading(true);
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGJjci5pbyIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTcxODg5MDY2MH0.WLWnMOa5rwS7RVe1zdPMrSnn2-jbpRKjnoO-44YhIDw";
    const config = {
      headers: {
        access_token: `${token}`,
      },
    };
    try {
      const res = await axios.get(
        `https://api-car-rental.binaracademy.org/admin/v2/order?page=${page}&pageSize=${size}`,
        config
      );
      setListOrder(res.data.orders);
      setTotalRows(res.data.count);
      setLoading(false);
      console.log(res.data.count);
    } catch (error) {
      console.log(error?.response);
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    getListOrder(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    setLoading(true);

    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGJjci5pbyIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTcxODg5MDY2MH0.WLWnMOa5rwS7RVe1zdPMrSnn2-jbpRKjnoO-44YhIDw";
    const config = {
      headers: {
        access_token: `${token}`,
      },
    };
    try {
      const res = await axios.get(
        `https://api-car-rental.binaracademy.org/admin/v2/order?page=${page}&pageSize=${newPerPage}`,
        config
      );
      setListOrder(res.data.orders);
      setPerPage(newPerPage);
      getListOrder(page, newPerPage);
      setLoading(false);
      console.log(res.data);
    } catch (error) {
      console.log(error?.response);
      setLoading(false);
    }
  };

  

    // Fungsi untuk memperbarui status ke true
    const updateStatus = async (id) => {
      console.log(id)
      const config = {
        headers: {
          access_token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGJjci5pbyIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTY2NTI0MjUwOX0.ZTx8L1MqJ4Az8KzoeYU2S614EQPnqk6Owv03PUSnkzc`,
          }
      };
      const payload = {
        status: id,
      }
      try {
        const res = await axios.patch(`https://api-car-rental.binaracademy.org/admin/order/${id}`, payload, config);
        getListOrder(currentPage, perPage);
        handlePerRowsChange(perPage, currentPage);
        console.log(res.data);
      } catch (err) {
          console.error('Error updating status:', err);
      }
  };



  const columns = [
    {
      name: "No",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "User Email",
      selector: (row) => row.User.email,
      sortable: true,
    },
    {
      name: "Car",
      selector: (row) => row.CarId,
      sortable: true,
    },
    {
      name: "Start Rent",
      selector: (row) => formatDateID(row.start_rent_at),
      sortable: true,
    },
    {
      name: "Finish Rent",
      selector: (row) => formatDateID(row.finish_rent_at),
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => formatRupiah(row.total_price),
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => row.User.role,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => <btn onClick={() => updateStatus(row.id)}
                          className="border-2 border-gray-100 rounded-xl text-gray-800 bg-gray-100 p-2 py-4 font-medium text-sm cursor-pointer">{row.status === true ? "Done" : "Pending"}</btn>,
      sortable: true,
    },
  ];

  useEffect(() => {
    getReportData();
    getListOrder(currentPage);
    updateStatus();
    
  }, [currentPage, dateRange, perPage, ]);

  const [dataReports, setDataReports] = useState([]);

  const day = dataReports.map((d) => {
    return d.day;
  });

  const countOrder = dataReports.map((c) => {
    return c.orderCount;
  });

  // console.log(countOrder);
  // console.log(day)

  function hitungOrderDanJumlahkanNilai(array) {
    let jumlahOrder = array.length;
    let totalNilai = array.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    return { jumlahOrder, totalNilai };
  }

  // Contoh penggunaan
  let arrayOrder = countOrder;
  let hasil = hitungOrderDanJumlahkanNilai(arrayOrder);

  // console.log(`Jumlah Order: ${hasil.jumlahOrder}`);
  //   console.log(`Total Nilai: ${hasil.totalNilai}`);

  function ambilTanggalDariArray(array) {
    return array.map((item) => {
      let tanggalArray = item.split("-");
      return tanggalArray[2];
    });
  }

  // Contoh penggunaan
  let arrayTanggal = day;
  let tanggalArray = ambilTanggalDariArray(arrayTanggal);

  // console.log(tanggalArray); // Output: ["01", "15", "20"]

  const OptionsColumChart = {
    series: [
      {
        name: "Count Order",
        data: countOrder,
      },
    ],
    options: {
      chart: {
        height: 200,
        type: "bar",
      },
      plotOptions: {
        bar: {
          borderRadius: 6,
          colors: {
            ranges: [
              {
                from: 0,
                to: 50,
                color: "#0D28A6",
              },
              {
                from: 51,
                to: 100,
                color: "#0D28A6",
              },
            ],
          },
          dataLabels: {
            position: "top", // top, center, bottom
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val + "";
        },
        offsetY: -30,
        style: {
          fontSize: "14px",
          colors: ["#444"],
        },
      },

      xaxis: {
        categories: tanggalArray,
        position: "bottom",
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          fill: {
            type: "gradient",
            gradient: {
              colorFrom: "#D8E3F0",
              colorTo: "#BED1E6",
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            },
          },
        },
        tooltip: {
          enabled: true,
        },
      },
      yaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
          formatter: function (val) {
            return val + "";
          },
        },
      },
      title: {
        text: `Hasil Rental Bulanan ${
          hasil.totalNilai === 0 ? "" : `: ${hasil.totalNilai}`
        } `,
        floating: true,
        offsetY: 300,
        align: "center",
        style: {
          color: "#444",
        },
      },
    },
  };

  // const handleGetDateFrom = (e) => {
  //   setDateFrom(e.target.value);
  // };
  // const handleGetDateUntil = (e) => {
  //   setDateUntil(e.target.value);
  // };

  return (
    <div className="flex">
      {/* Navbar Left Side */}
      <div className="bg-[#0D28A6]">
        <div className="bg-[#0D28A6] h-[100%] w-max flex flex-col gap-2">
          <div className="p-2 flex flex-col justify-center items-center h-14 pt-6">
            <h1 className="bg-[#CFD4ED] p-2 py-2">logo</h1>
          </div>

          <div
            className={`p-2 flex flex-col cursor-pointer justify-center items-center h-14 bg-[#acb5df]`}
          >
            <img src="home-logo.png" alt="" />
            <h1 className="text-white text-sm">Dashboard</h1>
            <div className="bank-option text-[1px] text-[#0D28A6] cursor-pointer h-[57px]  w-[82px] absolute top-[63px] left-0">
              test
            </div>
          </div>

          <Link to="/car">
            <div
              className={`p-2 flex cursor-pointer flex-col justify-center items-center h-14 `}
            >
              <img src="truck-logo.png" alt="" />
              <h1 className="text-white text-sm">Cars</h1>
              <div className="bank-option  text-[1px] text-[#0D28A6] h-[57px]  w-[82px] absolute top-[126px] left-0">
                test
              </div>
            </div>
          </Link>
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
                  <img
                    src="fi_search.png"
                    alt=""
                    className={`absolute top-3 left-3 ${
                      localSearchTerm ? "hidden" : ""
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
                  className={`${
                    dropdownToggle ? "rotate-180" : ""
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
                  <h1 className="font-medium text-[#999999] pl-4">Dashboard</h1>
                  <h1 className="font-medium text-sm bg-[#CFD4ED] pl-4 p-2 py-3">
                    Dashboard
                  </h1>
                </div>
              </div>
            </div>
          ) : null}

          {/* Main Content */}
          <div className={`w-full  bg-[#f5f6ff]`}>
           {/* nav */}
           <div className="flex gap-2 items-center pl-8 pt-5">
              <p className="font-medium text-lg">
                <p>Dashboard</p>
              </p>
              <p className="font-bold text-2xl ">&gt;</p>
              <p className="tex-sm font-medium text-[#999999]">
                <p>Dashboard</p>
              </p>
            </div>
            {/* Header */}
            <div className="px-8 flex gap-2 items-center pt-14">
                  <span className="bg-[#0D28A6] w-[7px] h-[25px]"></span>
                  <h1 className="text-lg font-semibold ">Rented Car Data Visualization</h1>
            </div>

            <div className="w-full px-8">
              <div className=" overflow-hidden">
                <div className=" pt-10 gap-4 flex flex-col items-start w-11/12">
                  <p className=" font-medium">Month</p>

                   {/* Date Range Picker */}
                   <div className="flex">
                    <div className="relative w-max">
                      <DatePicker
                        className=" border-2 p-2 outline-none rounded-sm w-[150px]"
                        selected={selectedDate}
                        onChange={handleDateChange}
                        dateFormat="MM/yyyy"
                        showMonthYearPicker
                        showFullMonthYearPicker
                      />
                        <img src="chevron-down.png" alt="" className="absolute top-3 right-3" width={25} height={25}/>
                    </div>
                    
                    <button
                      className="relative bg-[#0D28A6] text-white p-2 font-medium px-4 rounded-r-sm">Go</button>
                  </div>

                  {/* Chart */}
                  <div id="chart" className="w-full">
                    <Chart
                      options={OptionsColumChart.options}
                      series={OptionsColumChart.series}
                      type="bar"
                    />
                  </div>
                  <div id="html-dist"></div>
                </div>

                {/* List Order */}
                <div className="pb-20">
                  <h1 className="text-xl font-bold">Dashboard</h1>
                  <div className="flex gap-2 items-center pt-5">
                    <span className="bg-[#0D28A6] w-[7px] h-[25px]"></span>
                    <h1 className="text-lg font-semibold ">List Order</h1>
                  </div>
                  <div id="table" className="flex flex-col gap-10 items-center pt-5">
                    <DataTable
                      columns={columns}
                      data={listOrder}
                      progressPending={loading}
                      pagination
                      paginationServer
                      paginationTotalRows={totalRows}
                      onChangeRowsPerPage={handlePerRowsChange}
                      onChangePage={handlePageChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;