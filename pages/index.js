import Link from 'next/link';
import React from 'react';
import { AiOutlineArrowDown } from 'react-icons/ai';

const index = () => {
  return (
    <>
      <div className="flex flex-col items-center p-5 ">
        <h1 className="text-5xl font-bold">BookStore</h1>
        <p className="mt-5 text-lg font-bold">welcome name of logged in user</p>
        <Link href="/login">login</Link>
      </div>
      <div>
        <button className="flex bg-slate-800, hover: bg-gradient-to-r from-slate-700 to-slate-500 p-4 font-bold ">
          {' '}
          Updated Books
          <svg className="animate-bounce w-6 h-6 ...">
            <AiOutlineArrowDown />
          </svg>
        </button>
      </div>
    </>
  );
};

export default index;

function User() {}

function Guest() {}
