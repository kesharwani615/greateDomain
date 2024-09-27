/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { IoLogoBitcoin } from 'react-icons/io5';
import { useMyContext } from '../Provider/ContextProvider';
import { FcAcceptDatabase, FcAddRow, FcCurrencyExchange, FcGenealogy, FcHome, FcPodiumWithSpeaker, FcPortraitMode } from 'react-icons/fc';
import { Link } from 'react-router-dom';

const Menubar = () => {
  const [count, setCount] = useState(Array.from(10));
  const [showText, setShowText] = useState(true);
  const { width, pageShow, setPageShow } = useMyContext();

  const showCollection = [
    { icon: <FcHome className='text-[30px] mr-2' />, link: '/', collection: 'Dashboard' },
    { icon: <FcPortraitMode className='text-[30px] mr-2' />, link: '/user', collection: 'User' },
    { icon: <FcAcceptDatabase className='text-[30px] mr-2' />, link: '/domain', collection: 'Domain' },
    { icon: <FcAddRow className='text-[30px] mr-2' />, link: '/extension', collection: 'Extension' },
    { icon: <FcGenealogy className='text-[30px] mr-2' />, link: '/category', collection: 'Category' },
    { icon: <FcCurrencyExchange className='text-[30px] mr-2' />, link: '/currency', collection: 'Currency' },
    { icon: <FcPodiumWithSpeaker className='text-[30px] mr-2' />, link: '/language', collection: 'Language' },
  ];

  useEffect(() => {
    setShowText(!width);
  }, [width]);

  return (
    <div className='w-full h-full flex flex-col gap-5'>
      {showCollection.map((item, index) => (
        <Link
          to={item.link}
          key={index}
          onClick={() => setPageShow(item?.collection)}
          className={`Menubar ${
            item.collection === pageShow ? 'bg-[#15283c]' : 'bg-white'
          } text-[#212B36] hover:bg-[#15283c] h-14 w-full flex items-center pl-3 rounded-tr-[35px] rounded-br-[35px] cursor-pointer text-[18px]`}
        >
          {item?.icon}
          <div
            className={`mr-2 ${
              item.collection === pageShow ? 'text-white' : 'text-[#212B36]'
            }`}
          >
            {showText && `${item?.collection}`}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Menubar;
