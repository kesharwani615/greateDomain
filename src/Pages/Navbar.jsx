/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useRef, useState } from "react";
import { IoReorderThreeOutline } from "react-icons/io5";
import { MdOutlineExpandMore } from "react-icons/md";
import { useMyContext } from "../Provider/ContextProvider";
import { logoutSlice } from "../redux/features/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { setWidth } = useMyContext();
  const [isOpenThreeDot, setIsOpenThreeDot] = useState(false);

  const dropdownRef = useRef(null);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const LogoutUser = () =>{
    // dispatch(logoutSlice());
    localStorage.removeItem('token');
    setIsOpenThreeDot(false)
    navigate('/login');
  }

  const toggleDropdown = useCallback((e) => {
    e.stopPropagation();
    setIsOpenThreeDot((prev) => !prev);
  }, []);

  const handleClickOutside = useCallback((e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpenThreeDot(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <>
      <div className="h-[11vh] pr-3 w-full bg-[#004aad] flex justify-between items-center ">
        <IoReorderThreeOutline
          onClick={() => setWidth((prev) => !prev)}
          className="text-[40px] cursor-pointer"
        />
        <div className="flex items-center font-semibold">
          <div className="">
            <div className="relative inline-block" ref={dropdownRef}>
              <div
                className="flex justify-center cursor-pointer"
                onClick={toggleDropdown}
              >
                Profile
                <MdOutlineExpandMore className="text-[23px]" />{" "}
              </div>
              {isOpenThreeDot && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 shadow-lg rounded-md z-10">
                  <ul className="list-none p-0 m-0">
                    <li
                      className="p-2 text-black cursor-pointer"
                      onClick={() =>{
                        LogoutUser()
                      }}
                    >
                      LogOut
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
