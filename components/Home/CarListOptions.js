import React, { useState } from 'react';
import { CarListData } from '/utils/CarListData';
import CarListItem from './CarListItem';
import { useRouter } from 'next/router';

function CarListOptions({distance}) {
  const [activeIndex, setActiveIndex] = useState();
  const [selectedCar, setSelectedCar] = useState([]);
  return (
    <div className='mt-5 p-5 overflow-auto h-[250px]'>
      <h2 className='text-[20px] font-bold'>Recommended</h2>
      {CarListData.map((item, index) => (
        <div className={`cursor-pointer p-2 px-4 rounded-md border-black
        ${activeIndex == index ? 'border-[2px]' : null}`}
          onClick={() => {setActiveIndex(index);
          setSelectedCar(item)}}
        >
          <CarListItem car={item} distance={distance}/>
        </div>
      ))}
      <div className='
        p-3 bg-black text-white rounded-lg
        text-center'>
        <button className='p-3 bg-black text-white rounded-lg text-center'>Request{selectedCar.name}</button>
        onClick={()=>router.push('/payment?amount' + (selectedCar.amount * distance) ) }
        </div>
    </div>
  );
}

export default CarListOptions;