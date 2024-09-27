/* eslint-disable no-unused-vars */
import React from "react";
import "./App.css";
import Navbar from "./Pages/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import NotFound from "./Not_Found";
import Sidebar from "./Pages/Sidebar";
import Dashboard from "./Pages/Dashboard";
import Role from "./Pages/Role/Role";
import { Login } from "./Pages/Login/Login";
import User from "./Pages/User/User";
import Domain from "./Pages/Domain/Domain";
import Extension from "./Pages/Domain/Extension";
import Category from "./Pages/Domain/Categroy";
import Currency from "./Pages/Domain/Currency";
import Protected from "./Protected";
import Language from "./Pages/Language/Language";

const App = () => {
  const location = useLocation();
  const isNotLoginPage = location.pathname !== "/Login";

  const token = JSON.parse(localStorage.getItem('token')) || false;

  return (
    <div className="flex">
      {(isNotLoginPage && token) && <Sidebar />}
      <div className="w-[100vw] h-[89vh]">
        {(isNotLoginPage && token) && <Navbar />}
        <Routes>
          {/* Public Route */}
          <Route path="/Login" element={<Login />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <Protected>
                <Dashboard />
              </Protected>
            }
          />
          <Route
            path="/role"
            element={
              <Protected>
                <Role />
              </Protected>
            }
          />
          <Route
            path="/user"
            element={
              <Protected>
                <User />
              </Protected>
            }
          />
          <Route
            path="/domain"
            element={
              <Protected>
                <Domain />
              </Protected>
            }
          />
          <Route
            path="/extension"
            element={
              <Protected>
                <Extension />
              </Protected>
            }
          />
          <Route
            path="/category"
            element={
              <Protected>
                <Category />
              </Protected>
            }
          />
          <Route
            path="/currency"
            element={
              <Protected>
                <Currency />
              </Protected>
            }
          />
          <Route
            path="/language"
            element={
              <Protected>
                <Language />
              </Protected>
            }
          />

          {/* Catch-all Route for Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
