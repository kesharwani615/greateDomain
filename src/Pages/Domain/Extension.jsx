/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useState } from 'react'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { FcEditImage, FcEmptyTrash, FcSearch } from 'react-icons/fc';
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../../Loading';
import { extension_CreateSlice, extension_DeleteSlice, extension_EditSlice, extensionSlice } from '../../redux/features/extension';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";


const Extension = () => {
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [productList, setProductList] = useState([]);
  const [rowsLimit] = useState(11);
  const [rowsToShow, setRowsToShow] = useState();
  const [customPagination, setCustomPagination] = useState([]);  
  // const [forOnchange,setFormOnchange] = useState({})
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const headingField = ['Id','Name','Action']
  const [showUserData,setShowUserData] = useState([]);

  const [IdForDeletion,setIdForDeletion] = useState(null);

  const [open, setOpen] = useState(false);
  
  const [Editopen, setEditOpen] = useState(false);

  const [extension_name,setExtensionName] = useState();
  
  const [extension_Edit,setExtensionEdit] = useState();

  const [editItemId,setEditItemId] = useState();

  const { extension_Data,loading,extension_delete } = useSelector((state)=>state.extension);

  useEffect(()=>{
    dispatch(extensionSlice());
  },[]) 

  useEffect(()=>{
    console.log(extension_Data);
    extension_Data?.forEach((item)=>{
    const {extension_id:Id,extension_name:Name} = item;
    setShowUserData((prev)=>[...prev,{Id,Name}])
    })
  },[extension_Data])

  useEffect(()=>{
  setProductList(showUserData);
  setRowsToShow(showUserData.slice(0, rowsLimit));
  setTotalPage(Math.ceil(showUserData?.length / rowsLimit));
   console.log("showUserData:",showUserData);
  },[showUserData]);

  useMemo(() => {
    setCustomPagination(
      Array(Math.ceil(productList?.length / rowsLimit)).fill(null)
    );
  }, [productList]);

  useEffect(()=>{
   console.log("extension:",extension_Data);
  },[extension_Data])

  useEffect(()=>console.log("customPagination:",customPagination),[customPagination])
  

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
    console.log(value,totalPage);
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


  const deleteItem = (id) =>{
    setIdForDeletion(id);
    console.log("id:",id,IdForDeletion)
    dispatch(extension_DeleteSlice(id))
  }

  useEffect(()=>{
    console.log("extension_delete:",extension_delete);
    // if(!rowsToShow) return;
    console.log("IdForDeletion:",IdForDeletion);
    const filteredData = rowsToShow?.filter((item)=>item.Id !== IdForDeletion);
    console.log("filteredData:",filteredData);
    setRowsToShow(filteredData);
  },[extension_delete])

  const tableSearch = (e) => {
  console.log("user searchL:",e.target.value);
  // if(!e.target.value.trim()?.length) return;  
  const filteredData = showUserData.filter((item)=>item.Name.toLowerCase().includes(e.target.value.toLowerCase()));
  setRowsToShow(filteredData);
  };

  const createExtension = () =>{

    if(!extension_name){
      alert('Please enter Extension Name')
      return;
    }

    dispatch(extension_CreateSlice(extension_name));
    setOpen(!open)
    setExtensionName('')
  }

  const EditItem = (itemId) =>{
   setEditItemId(itemId)
   setEditOpen(!Editopen);
   const [filteredItem] = rowsToShow.filter((item)=>item.Id === itemId);
   setExtensionEdit(filteredItem.Name);
  }
  
  const EditExtension = () =>{
    if(!extension_Edit){
      alert('Please enter Extension Name')
      return;
    }
    console.log(extension_Edit);
    dispatch(extension_EditSlice({editItemId,extension_Edit}));
    setEditOpen(!Editopen)
    setExtensionName('')
  }
 
  const handleOpen = () => {
    setOpen(!open)
  };

  const EdithandleOpen = () => {
    setEditOpen(!Editopen)
  };

  if(loading) return <Loading/>;
  
  return (
    <div className='custom-scrollbar w-full h-[calc(100%)] bg-slate-100 flex flex-col overflow-auto'>

    <span className='text-black bg-white text-[40px] px-10'>Extensions</span>

    <div className=" px-8 text-black pt-10 pb-14 ">
    <div className="w-full p-4 rounded-md bg-white">
      <div>
        <h1 className="text-2xl font-medium text-[#212B36]">Extension list</h1>
      </div>
      <div className="flex justify-end bg-slate-100 px-2 mt-2 py-2 border-2 border-b-0">
        <div className="flex gap-4 px-2 rounded-lg">
          <div className="flex items-center gap-2 border-gray-700">
          <FcSearch className='text-xl' />
          <input
              type="text"
              onChange={(e)=>tableSearch(e)}
              className=" h-11 rounded-[5px] pl-3 text-sm focus:ring-0 border-transparent bg-slate-200  outline-none placeholder:text-black text-black w-[85%]"
              placeholder="Keyword Search"
            />
          </div>  
          <button type="button"  onClick={handleOpen} className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">ADD</button>
        </div>
      </div>
      <div className="w-full overflow-x-auto md:overflow-auto 2xl:max-w-none">
  <table className="w-full table-auto border border-collapse table-fixed">
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
          <tr className="border-b-2" key={index}>
            <td className="py-2 px-3 font-normal text-black text-base whitespace-nowrap text-center">
              {data.Id}
            </td>
            <td className="py-2 px-3 font-normal text-black text-base whitespace-nowrap text-center">
              {data.Name}
            </td>
            <td className="py-2 px-3 font-normal text-black text-base whitespace-nowrap flex justify-center gap-3">
              <FcEditImage
                className="text-[30px] cursor-pointer"
                onClick={() => EditItem(data.Id)}
              />
              <FcEmptyTrash
                className="text-[30px] cursor-pointer"
                onClick={() => deleteItem(data.Id)}
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
    {/*Add extension form*/}
       <div className={`mx-auto fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={handleOpen} // Close modal when clicking on the backdrop
      />

      {/* Modal */}
  
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center transform transition-all duration-500 ${
          open ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-100 translate-y-4 pointer-events-none"
        }`}
      >
        <div className="w-[500px] bg-white rounded-lg shadow-lg p-6">
          <div className="border-b pb-3">
            <h3 className="text-lg text-black font-medium">Create extension</h3>
          </div>
          <div className="py-4">
          <div className="w-72">
      <div className="relative">
        <input
          type="text"
          id="username"
          placeholder=" "
          value={extension_name}
          onChange={(e)=>setExtensionName(e.target.value)}
          className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        />
        <label
          htmlFor="username"
          className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
        >
          Extension Name
        </label>
      </div>
    </div>
          </div>
          <div className="flex justify-end space-x-2 pt-3 border-t">
            <button
              onClick={handleOpen}
              className="px-4 py-2 text-red-500 border border-red-500 rounded-md hover:bg-red-50"
            >
              Cancel
            </button>
            <button
              onClick={createExtension}
              className="px-4 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-md"
            >
              Create
            </button>
          </div>
        </div>
      </div>

      {/*Edit extension form*/}
      <div className={`mx-auto fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity duration-300 ${
          Editopen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={EdithandleOpen} // Close modal when clicking on the backdrop
      />

      {/* Modal */}
  
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center transform transition-all duration-500 ${
          Editopen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-100 translate-y-4 pointer-events-none"
        }`}
      >
        <div className="w-[500px] bg-white rounded-lg shadow-lg p-6">
          <div className="border-b pb-3">
            <h3 className="text-lg text-black font-medium">Edit extension</h3>
          </div>
          <div className="py-4">
          <div className="w-72">
      <div className="relative">
        <input
          type="text"
          id="username"
          placeholder=" "
          value={extension_Edit}
          onChange={(e)=>setExtensionEdit(e.target.value)}
          className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        />
        <label
          htmlFor="username"
          className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
        >
          Edit Extension
        </label>
      </div>
    </div>
          </div>
          <div className="flex justify-end space-x-2 pt-3 border-t">
            <button
              onClick={EdithandleOpen}
              className="px-4 py-2 text-red-500 border border-red-500 rounded-md hover:bg-red-50"
            >
              Cancel
            </button>
            <button
              onClick={EditExtension}
              className="px-4 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-md"
            >
              Edit
            </button>
          </div>
        </div>
      </div>


    </div>
   
</div>
  )
}

export default Extension
