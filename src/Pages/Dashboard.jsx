/* eslint-disable no-unused-vars */
import React from 'react'
import { FcBusinessman, FcConferenceCall, FcPaid, FcPodiumWithAudience, FcTimeline, FcViewDetails, FcVoicePresentation } from 'react-icons/fc'
import { Link } from 'react-router-dom';


const dashboardIconStyle = {
    marginRight: "10px",
    fontSize: "50px",
  };

const Dashboard = () => {

  const data = [];

  const dashboardItems = [
    {
      link: "/",
      icon: <FcViewDetails style={dashboardIconStyle} />,
      count: 10,
      label: "Domain",
    },
    {
      link: "/",
      icon: <FcTimeline style={dashboardIconStyle} />,
      count: 10,
      label: "Category",
    },
    {
      link: "/",
      icon: <FcPaid style={dashboardIconStyle} />,
      count: 10,
      label: "Extension",
    },
    {
      link: "/",
      icon: <FcPodiumWithAudience style={dashboardIconStyle} />,
      count: 10,
      label: "Currency",
    },
    {
      link: "/",
      icon: <FcVoicePresentation style={dashboardIconStyle} />,
      count: 10,
      label: "Contacts",
    },
    {
      link: "/",
      icon: <FcConferenceCall style={dashboardIconStyle} />,
      count: 10,
      label: "Roles",
    },
    {
      link: "/",
      icon: <FcBusinessman style={dashboardIconStyle} />,
      count: 10,
      label: "User",
    },
  ];
  
  return (
    // <div className="">
      <div className="bg-slate-200 h-full overflow-auto flex justify-center flex-wrap gap-3 py-2 ">
        {dashboardItems.map((item, index) => (
          <div key={index} className=" w-full md:w-1/2 lg:w-1/4">
            <Link to={item.link}>
              <div className="dashboardCard h-36 flex flex-col justify-center  hover:bg-[#15283c] bg-white shadow-lg rounded-lg">
                <div className="px-5">
                  {item.icon}
                </div>
                <div className="flex justify-center">
                  <div>
                    <p className="total_no text-3xl text-black font-bold">{item.count}</p>
                    <p className="head_couter">{item.label}</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    // </div>
  );
  
}

export default Dashboard
