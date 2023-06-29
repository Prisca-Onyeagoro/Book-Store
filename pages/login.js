import Loginvalidate from '@/components/Login/Loginvalidate';
import Loading from '@/components/loading';
import { useFormik } from 'formik';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FaGooglePlusG, FaAccessibleIcon } from 'react-icons/fa';

const login = () => {
  const [loading, isLoading] = useState(false);
  const Router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate: Loginvalidate,
    onSubmit,
  });
  async function onSubmit(values) {
    const status = await signIn('credentials', {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl: '/',
    });
    if (status.error !== null) {
      const ErrorMessage = status.error;
      DisplayError(ErrorMessage);
    }
    // checking if the user encoutered an error while logging in
    if (status.ok) {
      Router.push(status.url);
    }
  }
  function DisplayError(ErrorMessage) {
    const error = document.getElementById('error');
    error.textContent = ErrorMessage;
  }

  const Github = async () => {
    signIn('github', { callbackUrl: 'http://localhost:3000' });
  };
  const Google = async () => {
    signIn('google', { callbackUrl: 'http://localhost:3000' });
  };

  useEffect(() => {
    const HandleChangeStart = () => {
      isLoading(true);
    };
    const HandleChangeEnd = () => {
      isLoading(false);
    };

    Router.events.on('routeChangeStart', HandleChangeStart);
    Router.events.on('routeChangeComplete', HandleChangeEnd);

    return () => {
      Router.events.off('routeChangeStart', HandleChangeStart);
      Router.events.off('routeChangeComplete', HandleChangeEnd);
    };
  });

  if (loading === true) {
    return (
      <>
        <div className="    flex justify-center items-center mt-36 mb-36">
          <Image
            src="/assets/spinner1.svg"
            alt="spiner"
            width={500}
            height={500}
          />
        </div>
      </>
    );
  }

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
        <div
          id="error"
          className="text-red-900 text-center font-extrabold text-lg p-5"
        ></div>
        <div className="flex flex-col justify-center">
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col items-center gap-7 "
          >
            {formik.errors.email && formik.touched.email ? (
              <span className="bg-red-800 text-slate-100 font-extrabold text-lg p-5">
                {formik.errors.email}
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

            {formik.errors.password && formik.touched.password ? (
              <span className="bg-red-800 text-slate-100 font-extrabold text-lg p-5">
                {formik.errors.password}
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

            <div className=" flex items-center   bg-gradient-radial from-slate-800 to-slate-600 p-5  rounded-xl">
              <button type="submit" className="w-52 font-bold text-2xl ">
                Signin
              </button>
            </div>
          </form>
          <div className=" flex flex-col justify-center items-center ">
            <div
              className="font-bold flex items-center space-x-4 justify-center  text-2xl p-5 cursor-pointer "
              onClick={Google}
            >
              <h1>Sigin with Google </h1>{' '}
              <Image src="/assets/google.svg" width={27} height={27} />
            </div>
            <div
              className="font-bold flex text-2xl cursor-pointer"
              onClick={Github}
            >
              Signin with Github
              <Image src="/assets/github.svg" width={27} height={27} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default login;
