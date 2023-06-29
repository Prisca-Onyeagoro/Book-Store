import { getSession, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { AiOutlineArrowDown } from 'react-icons/ai';

const index = () => {
  const [loading, isLoading] = useState(false);
  const Router = useRouter();
  const { data: session } = useSession();
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
      <div className="flex flex-col items-center p-5 ">
        <h1 className="text-5xl font-bold">BookStore</h1>
        <p className="mt-5 text-lg font-bold">
          Welcome Esteemed Customer{' '}
          {session ? <>{session.user.name}</> : <>kindly log in</>}
        </p>
        <h1
          onClick={() => signOut()}
          className="font-extrabold text-xl text-indigo-600 cursor-pointer "
        >
          Sign Out
        </h1>
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

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
    };
  }
  return {
    props: { session },
  };
}
