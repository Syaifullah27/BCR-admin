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


const DashboardPage = () => {
  const dispatch = useDispatch()
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
    setToggleMenu(!toggleMenu);
  };

  const handdleDropdownToggle = () => {
    setDropdownToggle(!dropdownToggle);
  };

  const handleLogout = () => {
    localStorage.removeItem("token_admin_binar");
    navigate("/login");
  };


  // handle chart
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  useEffect(() => {
    const today = new Date();
    const currentMonth = (today.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based in JavaScript
    const currentYear = today.getFullYear().toString();
    setMonth(currentMonth);
    setYear(currentYear);
  }, []);

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const getDateRange = () => {
    const start_date = `${year}-${month.padStart(2, '0')}-01`;
    let end_date;

    if (month === '02') {
      end_date = `${year}-${month.padStart(2, '0')}-${year % 4 === 0 ? 29 : 28}`;
    } else if (['04', '06', '09', '11'].includes(month)) {
      end_date = `${year}-${month.padStart(2, '0')}-30`;
    } else {
      end_date = `${year}-${month.padStart(2, '0')}-31`;
    }

    setDateRange({ start: start_date, end: end_date });
  };

  const months = [
    { value: '01', label: 'January' },
    { value: '02', label: 'February' },
    { value: '03', label: 'March' },
    { value: '04', label: 'April' },
    { value: '05', label: 'May' },
    { value: '06', label: 'June' },
    { value: '07', label: 'July' },
    { value: '08', label: 'August' },
    { value: '09', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' },
  ];

  const years = Array.from(new Array(50), (val, index) => index + 2000); // 2000 to 2049





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
      setTotalRows(res.data.total);
      console.log(res.data);
    } catch (error) {
      console.log(error?.response);
    }
  };

  // const [sortFrom, setSortFrom] = useState("");
  const getListOrder = async (page, size = perPage) => {
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
      setLoading(false);
      console.log(res.data);
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
    setPerPage(newPerPage);
    getListOrder(page, newPerPage);
  };

  useEffect(() => {
    getReportData();
    getListOrder(currentPage);
  }, [currentPage, dateRange]);

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
      
      sortable: true,
    }
  ];


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
    let totalNilai = array.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    return { jumlahOrder, totalNilai };
}

// Contoh penggunaan
let arrayOrder = countOrder;
let hasil = hitungOrderDanJumlahkanNilai(arrayOrder);

  
// console.log(`Jumlah Order: ${hasil.jumlahOrder}`);
//   console.log(`Total Nilai: ${hasil.totalNilai}`);
  


function ambilTanggalDariArray(array) {
  return array.map(item => {
      let tanggalArray = item.split('-');
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
        text: `Hasil Rental Bulanan ${hasil.totalNilai === 0 ? '' :  `: ${hasil.totalNilai}`} `,
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
            className={`p-2 flex flex-col cursor-pointer justify-center items-center h-14 bg-[#acb5df]`}>
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
          <div className={`w-full  bg-[#f5f6ff]`}>
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

            <div className="w-full px-8">
              <div className=" overflow-hidden">
                <div className=" pt-10 gap-4 flex flex-col items-start w-11/12">
                  <p className=" font-medium">Month</p>

                  {/* Date Range Picker */}
                  <div className="flex border w-max rounded-l-sm">
                      <select value={month} onChange={handleMonthChange} className="appearance-none p-2 outline-none ">
                        <option value="" disabled>Select Month</option>
                        {months.map((month) => (
                          <option key={month.value} value={month.value}>
                            {month.label}
                          </option>
                        ))}
                      </select>
                      <select value={year} onChange={handleYearChange} className="appearance-none p-2 outline-none">
                        <option value="" disabled>Select Year</option>
                        {years.map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                    <button
                      className="bg-[#0D28A6] text-white p-2 font-medium rounded-r-sm px-5 active:bg-[#100e7c]"
                      onClick={getDateRange}>{" "}Go
                    </button>
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
                  <div className="flex flex-col gap-10 items-center pt-5">
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
  )
}



export default DashboardPage;