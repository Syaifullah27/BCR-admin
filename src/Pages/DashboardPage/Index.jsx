import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "chart.js/auto";
import Chart from "react-apexcharts";
import axios from "axios";
import '../Test/test.css'

const DashboardPage = () => {
  const navigate = useNavigate();
  const [toggleMenu, setToggleMenu] = useState(false);
  const [dropdownToggle, setDropdownToggle] = useState(false);

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

  const [dateFrom, setDateFrom] = useState("");
  const [dateUntil, setDateUntil] = useState("");

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
        `https://api-car-rental.binaracademy.org/admin/order/reports?from=${dateFrom}&until=${dateUntil}`,
        config
      );
      setDataReports(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error?.response);
    }
  };

  useEffect(() => {
    getReportData();
  }, []);

  const [dataReports, setDataReports] = useState([]);

  const day = dataReports.map((d) => {
    return d.day;
  });

  const countOrder = dataReports.map((c) => {
    return c.orderCount;
  });

  // console.log(countOrder);
  // console.log(day)

  const OptionsColumChart = {
    series: [
      {
        name: "Count Order",
        data: countOrder,
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "bar",
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          dataLabels: {
            position: "top", // top, center, bottom
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val + "%";
        },
        offsetY: -30,
        style: {
          fontSize: "12px",
          colors: ["#304758"],
        },
      },

      xaxis: {
        categories: day,
        position: "top",
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
            return val + "%";
          },
        },
      },
      title: {
        text: "Hasil Rental Bulanan",
        floating: true,
        offsetY: 330,
        align: "center",
        style: {
          color: "#444",
        },
      },
    },
  };

  const handleGetDateFrom = (e) => {
    setDateFrom(e.target.value);
  };
  const handleGetDateUntil = (e) => {
    setDateUntil(e.target.value);
  };

  return (

    <div className="flex">
      {/* Navbar Left Side */}
      <div className="bg-[#0D28A6]">
        <div className="bg-[#0D28A6] h-[100%] w-max flex flex-col gap-2">
          <div className="p-2 flex flex-col justify-center items-center h-14 pt-6">
            <h1 className="bg-[#CFD4ED] p-2 py-2">logo</h1>
          </div>

          <div
            className={`p-2 flex flex-col cursor-pointer justify-center items-center h-14  bg-[#acb5df]`}>
            <img src="home-logo.png" alt="" />
            <h1 className="text-white text-sm">Dashboard</h1>
            <div className="bank-option text-[1px] text-[#0D28A6] cursor-pointer h-[57px]  w-[82px] absolute top-[63px] left-0">
              test
            </div>
          </div>

          <Link to="/car">
            <div className={`p-2 flex cursor-pointer flex-col justify-center items-center h-14`}>
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
              <div className="flex items-center pl-5 gap-1 pr-5">
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
                  <h1 className="font-medium text-[#999999] pl-4">Dashboard</h1>
                  <h1 className="font-medium text-sm bg-[#CFD4ED] pl-4 p-2 py-3">
                    Dashboard
                  </h1>
                </div>
              </div>
            </div>
          ) : null}

          {/* Main Content */}
          <div className="w-full h-[100%] bg-[#f5f6ff]">

            {/* nav */}
            <div className="flex gap-2 items-center pl-8 pt-5">
              <p className="font-medium text-lg">Dashboard</p>
              <p className="font-bold text-2xl ">&gt;</p>
              <p className="tex-lg font-medium ">Dashboard</p>
            </div>

            {/* Header */}
            <div className="w-[94%] mx-auto pt-10 ">
              <div className="w-full flex flex-col">
                <div className="flex gap-2 items-center">
                  <span className="bg-[#0D28A6] w-[7px] h-[25px]"></span>
                  <h1 className="text-lg font-semibold">
                    Rented Car Data Visualization
                  </h1>
                </div>

                {/* Chart */}
                <div className=" pt-10 gap-4 flex flex-col justify-center w-full">
                  <p className=" font-medium">Month</p>
                  <div className="flex gap-5">
                    <input
                      type="date"
                      value={dateFrom}
                      className="border px-2"
                      onChange={handleGetDateFrom}
                    />
                    <input
                      type="date"
                      value={dateUntil}
                      className="border px-2"
                      onChange={handleGetDateUntil}
                    />
                    <button
                      className="bg-[#0D28A6] text-white p-2 font-medium rounded-lg px-5"
                      onClick={getReportData}
                    >
                      {" "}
                      Go
                    </button>
                  </div>
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
                </div>
              </div>




            </div>
          </div>
        </div>
      </div>
    </div>

  )
};

export default DashboardPage;
