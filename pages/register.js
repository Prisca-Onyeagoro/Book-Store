import Registervalidate from '@/components/Register/Registervalidate';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const register = () => {
  const [show, setShow] = useState();
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      cpassword: '',
    },
    validate: Registervalidate,
    onSubmit,
  });
  async function onSubmit(values) {
    const data = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    };
    const res = fetch('http://localhost:3000/api/middleware/signup', data).then(
      (response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            const error = data.message;
            DisplayErrorMessage(error);
          });
        } else {
          router.push('/');
        }
      }
    );
  }
  function DisplayErrorMessage(error) {
    const errormessage = document.getElementById('err');
    errormessage.textContent = error;
  }
  return (
    <>
      <div>
        <div className="flex flex-col items-center p-12 ">
          <h1 className="text-4xl text font-bold ">Register</h1>
          <p className="text-xl font-extrabold">
            have an account?{' '}
            <Link href="/login" className="text-indigo-600">
              Signin
            </Link>
          </p>
        </div>
        <div className="flex flex-col justify-center">
          <div
            className="bg-rose-800 flex justify-center mx-96 mb-6 text-lg font-extrabold"
            id="err"
          ></div>
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col items-center gap-7 "
          >
            <input
              type="text"
              placeholder="Enter your name"
              className="w-80 p-4 outline-none text-black"
              {...formik.getFieldProps('name')}
            />
            {formik.errors.name && formik.touched.name ? (
              <span className="bg-rose-800 p-4 text-lg font-bold">
                {formik.errors.name}
              </span>
            ) : (
              <></>
            )}

            <input
              type="email"
              placeholder="Enter your email"
              className="w-80 p-4 outline-none text-black"
              {...formik.getFieldProps('email')}
            />
            {formik.errors.email && formik.touched.email ? (
              <span className="bg-rose-800 p-4 text-lg font-bold">
                {' '}
                {formik.errors.email}
              </span>
            ) : (
              <></>
            )}
            <input
              type="password"
              placeholder="Enter your password"
              className="w-80 p-4 outline-none text-black"
              {...formik.getFieldProps('password')}
            />
            {formik.errors.password && formik.touched.password ? (
              <span className="bg-rose-800 p-4 text-lg font-bold">
                {' '}
                {formik.errors.password}
              </span>
            ) : (
              <></>
            )}
            <input
              type="password"
              placeholder="Confirm password"
              className="w-80 p-4 outline-none text-black"
              {...formik.getFieldProps('cpassword')}
            />
            {formik.errors.cpassword && formik.touched.cpassword ? (
              <span className="bg-rose-800 p-4 text-lg font-bold">
                {' '}
                {formik.errors.cpassword}
              </span>
            ) : (
              <></>
            )}
            <div className=" flex items-center   bg-gradient-radial from-slate-800 to-slate-600 p-5  rounded-xl">
              <button type="submit" className="w-52 font-bold text-2xl ">
                Signup
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default register;
