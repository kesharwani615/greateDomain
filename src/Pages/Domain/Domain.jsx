/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { FcEditImage, FcEmptyTrash, FcSearch } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../Loading";
import { domain_CreateSlice, domain_EditSlice, domainSlice } from "../../redux/features/domain";
import { extensionSlice } from "../../redux/features/extension";
import { CategorySlice } from "../../redux/features/category";
import { currencySlice } from "../../redux/features/currency";
import { useForm } from "react-hook-form";
import { languageSlice } from "../../redux/features/language";

const Domain = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const [productList, setProductList] = useState([]);
  const [rowsLimit] = useState(11);
  const [rowsToShow, setRowsToShow] = useState();
  const [customPagination, setCustomPagination] = useState([]);
  // const [forOnchange,setFormOnchange] = useState({})
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const headingField = [
    "Id",
    "Name",
    "categroy",
    "extension",
    "description",
    "price",
    "currency",
    "Action",
  ];
  //domain_id:Id,domain_name:Name,category_name:categroy,currency_name:currency,extension_name:extension,domain_price:price,domain_description:description
  const [showUserData, setShowUserData] = useState([]);

  const [IdForDeletion, setIdForDeletion] = useState(null);

  const [open, setOpen] = useState(false);

  const [Editopen, setEditOpen] = useState(false);

  const [domain_name, setdomainName] = useState();

  const [domain_Edit, setdomainEdit] = useState();

  const [editItemId, setEditItemId] = useState();

  const [fileData, setfileData] = useState();

  const [ExtensionCreation, setExtensionCreation] = useState([]);

  const [CategoryCreation, setCategoryCreation] = useState([]);

  const [CurrencyCreation, setCurrencyCreation] = useState([]);

  const [languageCreation, setLanguageCreation] = useState([]);

  const { domain_Data, loading } = useSelector((state) => state.domain);
  const { extension_Data } = useSelector((state) => state.extension);
  const { currency_Data } = useSelector((state) => state.currency);
  const { category_Data } = useSelector((state) => state.category);
  const { language_Data } = useSelector((state) => state.language);

  useEffect(() => {
    dispatch(domainSlice());
    dispatch(extensionSlice());
    dispatch(CategorySlice());
    dispatch(currencySlice());
  }, []);

  useEffect(() => {
    setExtensionCreation(extension_Data);
    setCategoryCreation(category_Data);
    setCurrencyCreation(currency_Data);
    setLanguageCreation(language_Data);
  }, [extension_Data, category_Data, currency_Data, language_Data]);

  useEffect(() => {
    console.log("domain_Data:", domain_Data);
    setShowUserData(domain_Data);
   
      // domain_Data?.forEach((item) => {
      //   const {
      //     domain_id,
      //     domain_name,
      //     category_name,
      //     currency_name,
      //     extension_name,
      //     domain_price,
      //     domain_description,
      //   } = item;
      //   setShowUserData((prev) => [
      //     ...prev,
      //     {
      //     domain_id,
      //     domain_name,
      //     category_name,
      //     currency_name,
      //     extension_name,
      //     domain_price,
      //     domain_description 
      //   }
      //   ]);
      // });
  }, [domain_Data]);

  useEffect(() => {
    console.log("showUserData:", showUserData);
    setProductList(showUserData);
    setRowsToShow(showUserData.slice(0, rowsLimit));
    setTotalPage(Math.ceil(showUserData?.length / rowsLimit));
  }, [showUserData]);

  useMemo(() => {
    setCustomPagination(
      Array(Math.ceil(productList?.length / rowsLimit)).fill(null)
    );
  }, [productList]);

  const nextPage = () => {
    const startIndex = rowsLimit * (currentPage + 1);
    const endIndex = startIndex + rowsLimit;
    const newArray = showUserData.slice(startIndex, endIndex);
    setRowsToShow(newArray);
    setCurrentPage(currentPage + 1);
  };
  const changePage = (value) => {
    const startIndex = value * rowsLimit;
    const endIndex = startIndex + rowsLimit;
    const newArray = productList.slice(startIndex, endIndex);
    setRowsToShow(newArray);
    setCurrentPage(value);
    console.log(value, totalPage);
  };
  const previousPage = () => {
    const startIndex = (currentPage - 1) * rowsLimit;
    const endIndex = startIndex + rowsLimit;
    const newArray = showUserData.slice(startIndex, endIndex);
    setRowsToShow(newArray);
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else {
      setCurrentPage(0);
    }
  };

  const deleteItem = (id) => {
    setIdForDeletion(id);
    console.log("id:", id, IdForDeletion);
    // dispatch(domain_DeleteSlice(id))
  };

  const tableSearch = (e) => {
    console.log("user searchL:", e.target.value);
    // if(!e.target.value.trim()?.length) return;
    const filteredData = showUserData.filter((item) =>
      item.domain_name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setRowsToShow(filteredData);
  };

  const EditItem = (itemId) => {
    setEditItemId(itemId);
    setEditOpen(!Editopen);
    const [filteredItem] = rowsToShow.filter((item) => item.domain_id === itemId);
    console.log(filteredItem);
    setdomainEdit(filteredItem);
  };

  const Editdomain = () => {
    if (!domain_Edit && !fileData) {
      alert("Please enter domain Name");
      return;
    }
    console.log(domain_Edit);
    // dispatch(domain_EditSlice({editItemId,fileData,domain_Edit}));
    setEditOpen(!Editopen);
    setdomainName("");
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  const EdithandleOpen = () => {
    setEditOpen(!Editopen);
  };

  const onSubmit = (data) => {
    const { user_id: owner_id } = JSON.parse(localStorage.getItem("user_info"));
    console.log(data);

    const createDomainData = {
      category_id: data.category_id,
      extension_id: data.extension_id,
      owner_id: owner_id,
      en: {
        language_code: "en",
        domain_name: data.domain_name,
        domain_description: data.description,
        domain_price: data.domain_price,
        currency_id: data.currency_id,
      },
      de: {
        language_code: "de",
        domain_name: data.domain_name,
        domain_description: data.description,
        domain_price: data.domain_price,
        currency_id: data.currency_id,
      },
      fr: {
        language_code: "fr",
        domain_name: data.domain_name,
        domain_description: data.description,
        domain_price: data.domain_price,
        currency_id: data.currency_id,
      },
    };
    dispatch(domain_CreateSlice(createDomainData));
    // createProduct logic here
  };

    const [formData, setFormData] = useState({
    domain_id: domain_Edit?.domain_id || "",
    domain_name: domain_Edit?.domain_name || "",
    extension_name: domain_Edit?.extension_name || "",
    category_name: domain_Edit?.category_name || "",
    currency_name: domain_Edit?.currency_name || "",
    domain_price: domain_Edit?.domain_price || "",
    description: domain_Edit?.description || ""
  });

// Prefill the form with the provided edit data when the component mounts
useEffect(() => {
  setFormData(domain_Edit);
}, [domain_Edit]);

useEffect(()=>console.log(formData),[formData]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
    
  const EdithandleSubmit = (e) => {
    e.preventDefault();
const { user_id: owner_id } = JSON.parse(localStorage.getItem("user_info"));
    console.log(formData);
    const id = formData?.domain_id;
    const EditDomainData = {
      category_id: formData.category_id,
      extension_id: formData.extension_id,
      owner_id: owner_id,
      en: {
        language_code: "en",
        domain_name: formData.domain_name,
        domain_description: formData.description,
        domain_price: formData.domain_price,
        currency_id: formData.currency_id,
      },
      de: {
        language_code: "de",
        domain_name: formData.domain_name,
        domain_description: formData.description,
        domain_price: formData.domain_price,
        currency_id: formData.currency_id,
      },
      fr: {
        language_code: "fr",
        domain_name: formData.domain_name,
        domain_description: formData.description,
        domain_price: formData.domain_price,
        currency_id: formData.currency_id,
      },
    };
    dispatch(domain_EditSlice({id,EditDomainData}));
    console.log(formData);
  };

  if (loading) return <Loading />;

  return (
    <div className="custom-scrollbar w-full  h-[calc(100%)] bg-slate-100 flex flex-col overflow-auto">
      <span className="text-black bg-white text-[40px] px-10">domains</span>

      <div className=" px-8 text-black pt-10 pb-14 ">
        <div className="w-full  p-4 rounded-md bg-white">
          <div>
            <h1 className="text-2xl font-medium text-[#212B36]">domain list</h1>
          </div>
          <div className="flex justify-end bg-slate-100 px-2 mt-2 py-2 border-2 border-b-0">
            <div className="flex gap-4 px-2 rounded-lg">
              <div className="flex items-center gap-2 border-gray-700">
                <FcSearch className="text-xl" />
                <input
                  type="text"
                  onChange={(e) => tableSearch(e)}
                  className=" h-11 rounded-[5px] pl-3 text-sm focus:ring-0 border-transparent bg-slate-200  outline-none placeholder:text-black text-black w-[85%]"
                  placeholder="Keyword Search"
                />
              </div>
              <button
                type="button"
                onClick={handleOpen}
                className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                ADD
              </button>
            </div>
          </div>
          <div className="w-full overflow-x-auto md:overflow-auto max-w-7xl 2xl:max-w-none">
            <table className="table-auto w-full text-left font-inter border border-collapse">
              <thead className="rounded-lg text-base text-white font-semibold w-full">
                <tr className="border-x-2 border-t-2">
                  {headingField.map((item, index) => (
                    <th
                      key={index}
                      className="py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap"
                    >
                      {item}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="border-x-2">
                {rowsToShow?.length > 0 &&
                  rowsToShow?.map((data, index) => (
                    <tr className="border bottom-2" key={index}>
                      <td className="py-2 px-3 font-normal text-black text-base whitespace-nowrap text-center">
                        {data.domain_id}
                      </td>
                      <td className="py-2 px-3 font-normal text-black text-base whitespace-nowrap text-center">
                        {data.domain_name}
                      </td>
                      <td className="py-2 px-3 font-normal text-black text-base whitespace-nowrap text-center">
                        {data.category_name}
                      </td>
                      <td className="py-2 px-3 font-normal text-black text-base whitespace-nowrap text-center">
                        {data.extension_name}
                      </td>
                      <td className="py-2 px-3 font-normal text-black text-base whitespace-nowrap text-center">
                        {data.domain_description}
                      </td>
                      <td className="py-2 px-3 font-normal text-black text-base whitespace-nowrap text-center">
                        {data.domain_price}
                      </td>
                      <td className="py-2 px-3 font-normal text-black text-base whitespace-nowrap text-center">
                        {data.currency_name}
                      </td>
                      <td className="py-2 px-3 font-normal text-black text-base whitespace-nowrap flex justify-center gap-2">
                        <FcEditImage
                          className="text-[30px] cursor-pointer"
                          onClick={() => EditItem(data.domain_id)}
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          <div
            className={`w-full justify-center sm:justify-between flex-col sm:flex-row gap-5 mt-2.5 px-1 items-center ${
              productList?.length > 0 ? "flex" : "hidden"
            }`}
          >
            <div className="text-lg text-black">
              Showing {currentPage == 0 ? 1 : currentPage * rowsLimit + 1} to{" "}
              {currentPage == totalPage - 1
                ? productList?.length
                : (currentPage + 1) * rowsLimit}{" "}
              of {productList?.length} entries
            </div>
            <div className="flex">
              <ul
                className="flex justify-center items-center gap-x-[10px] z-30"
                role="navigation"
                aria-label="Pagination"
              >
                <li
                  className={`prev-btn flex items-center justify-center w-[36px] rounded-[6px] h-[36px] border-[1px] border-solid border-[#E4E4EB] disabled ${
                    currentPage == 0
                      ? "bg-[#cccccc] pointer-events-none"
                      : " cursor-pointer bg-blue-500"
                  }`}
                  onClick={previousPage}
                >
                  <AiOutlineArrowLeft />
                </li>
                {customPagination?.map((data, index) => (
                  <li
                    className={`flex items-center justify-center w-[36px] rounded-[6px] h-[34px] border-[1px] border-solid border-[2px] bg-[#FFFFFF] text-black cursor-pointer ${
                      currentPage == index
                        ? "text-blue-600 border-sky-500"
                        : "border-[#E4E4EB] "
                    }`}
                    onClick={() => changePage(index)}
                    key={index}
                  >
                    {index + 1}
                  </li>
                ))}
                <li
                  className={`flex items-center justify-center w-[36px] rounded-[6px] h-[36px] border-[1px] border-solid border-[#E4E4EB] ${
                    currentPage == totalPage - 1
                      ? "bg-[#cccccc] pointer-events-none"
                      : " cursor-pointer bg-blue-500"
                  }`}
                  onClick={nextPage}
                >
                  <AiOutlineArrowRight />
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/*Add domain form*/}
        <div
          className={`mx-auto fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={handleOpen} // Close modal when clicking on the backdrop
        />

        {/* Modal */}

        <div
          className={`fixed inset-0 z-50 flex items-center justify-center transform transition-all duration-500 ${
            open
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-100 translate-y-4 pointer-events-none"
          }`}
        >
          <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
            <div className="border-b pb-3 flex items-center justify-between">
              <h3 className="text-lg text-black font-medium">
                Create New Domain
              </h3>
              <button
                type="button"
                onClick={handleOpen}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg w-8 h-8 flex items-center justify-center"
              >
                <svg
                  className="w-3 h-3"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="py-4">
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register("domain_name", { required: true })}
                    className="block w-full px-2.5 pb-2.5 pt-4 text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder="Type product name"
                    required
                  />
                  {errors.name && (
                    <span className="text-red-500">This field is required</span>
                  )}
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="extension"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Extension
                  </label>
                  <select
                    id="extension"
                    {...register("extension_id", { required: true })}
                    className="block w-full px-2.5 pb-2.5 pt-4 text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  >
                    <option className="text-black" value="">
                      Select extension
                    </option>
                    {ExtensionCreation.map((item) => (
                      <option
                        className="text-black"
                        key={item.extension_id}
                        value={item.extension_id}
                      >
                        {item.extension_name}
                      </option>
                    ))}
                  </select>
                  {errors.extension && (
                    <span className="text-red-500">This field is required</span>
                  )}
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="category"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    {...register("category_id", { required: true })}
                    className="block w-full px-2.5 pb-2.5 pt-4 text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  >
                    <option className="text-black" value="">
                      Select category
                    </option>
                    {CategoryCreation.map((item) => (
                      <option
                        className="text-black"
                        key={item.category_id}
                        value={item.category_id}
                      >
                        {item.category_name}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <span className="text-red-500">This field is required</span>
                  )}
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="currency"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Currency
                  </label>
                  <select
                    id="currency"
                    {...register("currency_id", { required: true })}
                    className="block w-full px-2.5 pb-2.5 pt-4 text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  >
                    <option className="text-black" value="">
                      Select currency
                    </option>
                    {CurrencyCreation.map((item) => (
                      <option
                        className="text-black"
                        key={item.currency_id}
                        value={item.currency_id}
                      >
                        {item.currency_name}
                      </option>
                    ))}
                  </select>
                  {errors.currency && (
                    <span className="text-red-500">This field is required</span>
                  )}
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="price"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    id="price"
                    {...register("domain_price", { required: true })}
                    className="block w-full px-2.5 pb-2.5 pt-4 text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder="$2999"
                    required
                  />
                  {errors.price && (
                    <span className="text-red-500">This field is required</span>
                  )}
                </div>

                <div className="col-span-2">
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Product Description
                  </label>
                  <textarea
                    id="description"
                    {...register("description", { required: true })}
                    rows="4"
                    className="block w-full p-2.5 text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600"
                    placeholder="Write product description here"
                  ></textarea>
                  {errors.description && (
                    <span className="text-red-500">This field is required</span>
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={handleOpen}
                  className="px-4 py-2 text-red-500 border border-red-500 rounded-md hover:bg-red-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-md"
                >
                  Add new product
                </button>
              </div>
            </form>
          </div>
        </div>

        {/*Edit domain form*/}
        <div
          className={`mx-auto fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity duration-300 ${
            Editopen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={EdithandleOpen} // Close modal when clicking on the backdrop
        />

        {/* Modal */}

        <div
          className={`fixed inset-0 z-50 flex items-center justify-center transform transition-all duration-500 ${
            Editopen
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-100 translate-y-4 pointer-events-none"
          }`}
        >
          <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
            <div className="border-b pb-3 flex items-center justify-between">
              <h3 className="text-lg text-black font-medium">Edit Domain</h3>
              <button
                type="button"
                onClick={EdithandleOpen}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg w-8 h-8 flex items-center justify-center"
              >
                <svg
                  className="w-3 h-3"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </button>
            </div>
              <form onSubmit={EdithandleSubmit} className="py-4">
      <div className="grid gap-4 mb-4 grid-cols-2">
        <div className="col-span-2">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="domain_name"
            value={formData?.domain_name}
            onChange={handleInputChange}
            className="block w-full px-2.5 pb-2.5 pt-4 text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder="Type product name"
          />
        </div>

        <div className="col-span-2 sm:col-span-1">
          <label htmlFor="extension" className="block mb-2 text-sm font-medium text-gray-900">
            Extension
          </label>
          <select
            id="extension"
            name="extension_id"
            value={formData?.extension_id}
            onChange={handleInputChange}
            className="block w-full px-2.5 pb-2.5 pt-4 text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          >
            <option className="text-black" value="">
              Select extension
            </option>
            {ExtensionCreation.map((item) => (
              <option className="text-black" key={item.extension_id} value={item.extension_id}>
                {item.extension_name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-span-2 sm:col-span-1">
          <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">
            Category
          </label>
          <select
            id="category"
            name="category_id"
            value={formData?.category_id}
            onChange={handleInputChange}
            className="block w-full px-2.5 pb-2.5 pt-4 text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          >
            <option className="text-black" value="">
              Select category
            </option>
            {CategoryCreation.map((item) => (
              <option className="text-black" key={item.category_id} value={item.category_id}>
                {item.category_name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-span-2 sm:col-span-1">
          <label htmlFor="currency" className="block mb-2 text-sm font-medium text-gray-900">
            Currency
          </label>
          <select
            id="currency"
            name="currency_id"
            value={formData?.currency_id}
            onChange={handleInputChange}
            className="block w-full px-2.5 pb-2.5 pt-4 text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          >
            <option className="text-black" value="">
              Select currency
            </option>
            {CurrencyCreation.map((item) => (
              <option className="text-black" key={item.currency_id} value={item.currency_id}>
                {item.currency_name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-span-2 sm:col-span-1">
          <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="domain_price"
            value={formData?.domain_price}
            onChange={handleInputChange}
            className="block w-full px-2.5 pb-2.5 pt-4 text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder="$2999"
          />
        </div>

        <div className="col-span-2">
          <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">
            Product Description
          </label>
          <textarea
            id="description"
            name="domain_description"
            value={formData?.domain_description}
            onChange={handleInputChange}
            rows="4"
            className="block w-full p-2.5 text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600"
            placeholder="Write product description here"
          ></textarea>
        </div>
      </div>

      <div className="flex justify-end space-x-2 pt-3 border-t">
        <button
          type="button"
          onClick={EdithandleOpen}
          className="px-4 py-2 text-red-500 border border-red-500 rounded-md hover:bg-red-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-md"
        >
          Save changes
        </button>
      </div>
    </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Domain;
