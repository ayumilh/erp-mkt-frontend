import { useState } from 'react';
const BtnGroupChart = () => {
  const [selectedButton, setSelectedButton] = useState('1D');

  const handleClick = (button) => {
    setSelectedButton(button);
  };

  const getButtonClass = (button) => {
    return button === selectedButton
      ? 'bg-segundaria-900 hover:bg-gray-200 rounded-lg p-2 font-medium text-gray-200 dark:text-white hover:text-neutral-800 dark:hover:text-gray-800 transition duration-300 ease-out'
      : 'hover:bg-gray-200 dark:hover:bg-neutral-800 rounded-lg p-2 text-sm font-medium text-neutral-800 dark:hover:text-gray-300 dark:text-gray-200 transition duration-300 ease-out';
  };
  return (
    <div className='flex mt-6 justify-around items-center' >
      <button className={getButtonClass('1D')} onClick={() => handleClick('1D')}>1D</button>
      <button className={getButtonClass('1M')} onClick={() => handleClick('1M')}>1M</button>
      <button className={getButtonClass('3M')} onClick={() => handleClick('3M')}>3M</button>
      <button className={getButtonClass('6M')} onClick={() => handleClick('6M')}>6M</button>
      <button className={getButtonClass('12M')} onClick={() => handleClick('12M')}>12M</button>
    </div>
  );
}

export default BtnGroupChart;