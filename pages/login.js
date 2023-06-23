import Link from 'next/link';
import React from 'react';

const login = () => {
  return (
    <>
      <div>
        <div className="flex flex-col items-center p-12 ">
          <h1 className="text-4xl text font-bold ">Login</h1>
          <p className="text-xl font-extrabold">
            Dont have an account?{' '}
            <Link href="/register" className="text-indigo-600">
              Signup
            </Link>
          </p>
        </div>
        <div className="flex flex-col justify-center">
          <form className="flex flex-col items-center gap-7 ">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-80 p-4 outline-none text-black"
            />
            <input
              type="password"
              placeholder="Enter your password"
              className="w-80 p-4 outline-none text-black"
            />

            <div className=" flex items-center   bg-gradient-radial from-slate-800 to-slate-600 p-5  rounded-xl">
              <button type="submit" className="w-52 font-bold text-2xl ">
                Signin
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default login;
