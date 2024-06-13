import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Head from "next/head";
import Router from "next/router";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { signIn } from "next-auth/react"
import { useSession } from "next-auth/react"

/**
 * @description Login Modal used in Navbar.js
 */

export default function LoginModal({ closeModal, flipToRegisterModal }) {
  //React hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { data: session, status } = useSession()
  const [user, setUser] = useState(null);


  const [logged, setLogged] = useState(false);



  //login function that fetches the api, save them in localstorage then set global variable in store via authorizer



  const onSubmit = async (d) => {
    if (d) {
        let username = d.username
        let password = d.password
        const result = await signIn('credentials', { redirect: false, username, password });
        console.log(session, "SeSSION")
        setLogged(true);
    }
};

  useEffect(() => {
    //redirects
    if (logged) {
      
      // if the user is logged in then fetch userinfo
      if (status === "authenticated") {
        fetch("http://127.0.0.1:8000/api/user/", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        })
          .then((res) => res.json())
          .then((res) => localStorage.setItem("usertype", res.user_type));
        toast.success("Logged in successfully");
        setLogged(true);
        console.log(localStorage.getItem("usertype"));
      } else {
        toast.error("Please try again");
        setLogged(false);
      }
      Router.reload();
    }
  }, [status, session]);

  return (
    <div className="transition-all">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full h-full flex justify-center bg-opacity-90 bg-black fixed z-50 transition-all">
          <div className="w-[25rem] h-[28rem] mx-auto z-50 fixed mt-10 bg-white shadow-white border shadow-sm p-0 flex flex-col justify-items-start">
            {/* Cross button */}
            <button
              className="absolute top-0 right-0 h-8 w-8"
              onClick={closeModal}
            >
              <div className="absolute h-0.5 w-4 bg-gray-500 transform rotate-45 top-4"></div>
              <div className="absolute h-0.5 w-4 bg-gray-500 transform -rotate-45 bottom-4"></div>
            </button>

            <div className="w-2/3 h-[1px] mx-auto bg-slate-700 opacity-20 mb-4"></div>
            <label className="mx-auto text-lg mb-1 mt-8 font-pangram">
              Enter your username
            </label>
            <input
              name="username"
              autoFocus
              {...register("username", {
                required: "Please enter your username",
              })}
              className="border-2 border-neutral-700 border-opacity-60 bg-slate-300 bg-opacity-60 mx-10 my-1 p-2 hover::rounded-md"
            ></input>
            <label className="mx-auto text-lg mb-1 mt-2 font-pangram">
              Password
            </label>
            <input
              name="password"
              type="password"
              {...register("password")}
              className="border-2 border-neutral-700 border-opacity-60 bg-slate-300 bg-opacity-60 mx-10 my-1 p-2 hover::rounded-md"
            ></input>
            <button className="px-4 py-2 border-2 m-auto border-gray-900 font-pangram">
              Log in
            </button>
            <div
              className="m-auto font-pangram hover:cursor-pointer"
              onClick={flipToRegisterModal}
            >
              Don't have an account?{" "}
            </div>
          </div>
        </div>
      </form>
      <Toaster />
    </div>
  );
}
