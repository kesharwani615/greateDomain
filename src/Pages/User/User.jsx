/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useState } from 'react'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { FaAngleDown, FaSearch } from 'react-icons/fa';
import { FcEditImage, FcEmptyTrash, FcSearch } from 'react-icons/fc';
import { useDispatch, useSelector } from 'react-redux'
import { AllUserSlice, DeleteUserSlice } from '../../redux/features/authSlice';
import Loading from '../../Loading';

const User = () => {
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [productList, setProductList] = useState([]);
  const [rowsLimit] = useState(11);
  const [rowsToShow, setRowsToShow] = useState();
  const [customPagination, setCustomPagination] = useState([]);  
  // const [forOnchange,setFormOnchange] = useState({})
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const headingField = ['Id','Name','Email','Phome Number','Role','Address','Country','Action']
  const [showUserData,setShowUserData] = useState([]);

  const [IdForDeletion,setIdForDeletion] = useState(null);

  const { AllUser:users,loading,deleteUser } = useSelector((state)=>state.auth);

  useEffect(()=>{
    dispatch(AllUserSlice());
  },[deleteUser]) 

  useEffect(()=>{
    console.log(users);
    users?.forEach((item)=>{
    const {user_id:Id,first_name:Name,email_id:Email,phone_number:Number,role_id:Role,street_address:Address,country:Country} = item;
    setShowUserData((prev)=>[...prev,{Id,Name,Email,Number,Role,Address,Country,}])
    })
  },[users])

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
   console.log("rowsToShow:",rowsToShow);
  },[rowsToShow])

  useEffect(()=>console.log("customPagination:",customPagination),[customPagination])
  
 
  const setUpdateValue = (id) =>{
   const [filteredData] = rowsToShow.filter((item)=>item.id === id);
   console.log(filteredData);
  //  setFormData(filteredData);
  }
  
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
    dispatch(DeleteUserSlice(id))
  }

  useEffect(()=>{
    // if(!rowsToShow) return;
    console.log("IdForDeletion:",IdForDeletion);
    const filteredData = rowsToShow?.filter((item)=>item.Id !== IdForDeletion);
    console.log("filteredData:",filteredData);
    setRowsToShow(filteredData);
  },[deleteUser])

  const tableSearch = (e) => {
  console.log("user searchL:",e.target.value);
  // if(!e.target.value.trim()?.length) return;  
  const filteredData = showUserData.filter((item)=>item.Name.toLowerCase().includes(e.target.value.toLowerCase()));
  setRowsToShow(filteredData);
  };

  if(loading) return <Loading/>;
  
  return (
    <>
    <div className='custom-scrollbar w-full h-[calc(100%)] bg-slate-100 flex flex-col overflow-auto'>

    <span className='text-black bg-white text-[40px] px-10'>Users</span>

    <div className=" px-8 text-black pt-10 pb-14 ">
    <div className="w-full p-4 rounded-md bg-white">
      <div>
        <h1 className="text-2xl font-medium text-[#212B36]">Playlist</h1>
      </div>
      <div className="flex justify-end bg-slate-100  px-2 mt-2 py-2 border-2 border-b-0">
        <div className="px-2 rounded-lg">
        <div className="flex items-center gap-2 border-gray-700">
          <FcSearch className='text-xl' />
          <input
              type="text"
              onChange={(e)=>tableSearch(e)}
              className=" h-11 rounded-[5px] pl-3 text-sm focus:ring-0 border-transparent bg-slate-200  outline-none placeholder:text-black text-black w-[85%]"
              placeholder="Keyword Search"
            />
          </div>  
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
          <tr className="border-b-2" key={index}>
            <td className="py-2 px-3 font-normal text-black text-base whitespace-nowrap">
              {data.Id}
            </td>
            <td className="py-2 px-3 font-normal text-black text-base whitespace-nowrap">
              {data.Name}
            </td>
            <td className="py-2 px-3 font-normal text-black text-base whitespace-nowrap">
              {data.Email}
            </td>
            <td className="py-2 px-3 font-normal text-black text-base whitespace-nowrap">
              {data.Number}
            </td>
            <td className="py-2 px-3 font-normal text-black text-base whitespace-nowrap">
              {data.Role}
            </td>
            <td className="py-2 px-3 font-normal text-black text-base whitespace-nowrap">
              {data.Address}
            </td>
            <td className="py-2 px-3 font-normal text-black text-base whitespace-nowrap">
              {data.Country}
            </td>
            <td className="py-2 px-3 flex justify-center gap-x-2 font-normal text-black text-base whitespace-nowrap">
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
    </div>
</div>
</>

  )
}

export default User

// {showModal ? (
//   <>
//     <div
//       className="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
//     >
//       <div className=" relative my-6 mx-auto w-[70vw]">
//         {/*content*/}
//         <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
//           {/*header*/}
//           <div className="flex items-start justify-between p=2 border-b border-solid border-blueGray-200 rounded-t">
//           <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
//            Update Product
//           </h2>
//             <button
//               className="p-1 ml-auto  border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
//               onClick={() => setShowModal(false)}
//             >
//               <span className=" text-black h-6 w-6 text-3xl block ">
//                 x
//               </span>
//             </button>
//           </div>
//           {/*body*/}
//           <section className="bg-white dark:bg-gray-900">
//     <div className="px-4 py-3 mx-auto">
//       <form onSubmit={onSubmit}>
//         <div className="grid sm:grid-cols-2 sm:gap-2 sm:mb-2">
//           <div className="sm:col-span-2">
//             <label
//               htmlFor="Product"
//               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//             >
//               Product Name
//             </label>
//             <input
//               type="text"
//               id="Product"
//               // value={formData?.Product}
//               // onChange={(e)=>setFormData({...formData,'Product':e.target.value})}
//               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
//               placeholder="Type product name"
//             />
//           </div>

//           <div>
//             <label
//               htmlFor="id"
//               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//             >
//               ID
//             </label>
//             <input
//               type="number"
//               id="id"
//               // value={formData?.id}
//               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
//               placeholder="Ex. 12"
//             />
//           </div>

//           <div className="w-full">
//             <label
//               htmlFor="Company"
//               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//             >
//               Brand
//             </label>
//             <input
//               type="text"
//               id="Company"
//               // value={formData?.Company}
//               // onChange={(e)=>setFormData({...formData,'Company':e.target.value})}
//               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
//               placeholder="Product brand"
//             />
//           </div>

//           <div className="w-full">
//             <label
//               htmlFor="price"
//               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//             >
//               Category
//             </label>
//             <input
//               type="text"
//               id="category"
//               // value={formData?.Category}
//               // onChange={(e)=>setFormData({...formData,'Categroy':e.target.value})}
//               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
//               placeholder="$299"
//             />
//           </div>

//           <div className="w-full">
//             <label
//               htmlFor="price"
//               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//             >
//               Price
//             </label>
//             <input
//               type="number"
//               id="price"
//               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
//               placeholder="$299"
//             />
//           </div>

//           <div className="sm:col-span-2">
//             <label
//               htmlFor="description"
//               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//             >
//               Description
//             </label>
//             <textarea
//               id="description"
//               rows="8"
//               className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
//               placeholder="Write a product description here..."
//             ></textarea>
//           </div>

//           {/*footer*/}
//           <div className="flex items-center justify-start p-6 border-t border-solid border-blueGray-200 rounded-b">
//             <button
//               className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
//               type="button"
//               onClick={() => setShowModal(false)}
//             >
//               Close
//             </button>
//             <div className="sm:col-span-2 flex items-center justify-between">
//             <button
//               type="submit"
//               className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
//             >
//               Update product
//             </button>
//           </div>
//           </div>
//           </div>
//       </form>
//     </div>
//   </section>
//         </div>
//       </div>
//     </div>
//     <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
//   </>
// ) : null}
